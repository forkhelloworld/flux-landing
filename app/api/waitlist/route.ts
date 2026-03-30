import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import { createHmac } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// Кешуємо audience ID щоб не створювати кожного разу
let cachedAudienceId: string | null = null;

const JWT_SECRET = process.env.JWT_SECRET || process.env.RESEND_API_KEY || "fallback_secret_for_development";

function signToken(email: string, expiresInMs: number): string {
  const payload = { email, exp: Date.now() + expiresInMs };
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", JWT_SECRET).update(base64Payload).digest("base64url");
  return `${base64Payload}.${signature}`;
}

function verifyToken(token: string): { email: string; expired: boolean } | null {
  try {
    const [base64Payload, signature] = token.split(".");
    if (!base64Payload || !signature) return null;

    const expectedSignature = createHmac("sha256", JWT_SECRET).update(base64Payload).digest("base64url");
    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(base64Payload, "base64url").toString("utf-8"));
    if (!payload.email || !payload.exp) return null;

    return { email: payload.email, expired: Date.now() > payload.exp };
  } catch (error) {
    return null;
  }
}

// Rate limiter: максимум 2 запити в секунду (Resend limit)
// Використовуємо чергу для синхронізації запитів та мінімальний інтервал між запитами
const requestTimestamps: number[] = [];
const RATE_LIMIT_REQUESTS = 2;
const RATE_LIMIT_WINDOW = 1000; // 1 секунда
const MIN_REQUEST_INTERVAL = 600; // Мінімальний інтервал між запитами (600ms для безпеки)

// Черга для синхронізації запитів
let requestQueue: Promise<void> = Promise.resolve();

// Функція для очікування перед наступним запитом
async function waitForRateLimit(): Promise<void> {
  // Додаємо запит до черги для послідовної обробки
  const previousRequest = requestQueue;
  let resolveNext: () => void;
  requestQueue = new Promise((resolve) => {
    resolveNext = resolve;
  });
  
  await previousRequest;
  
  // Використовуємо цикл замість рекурсії для кращої обробки
  while (true) {
    const now = Date.now();
    
    // Видаляємо старі запити (старіше за 1 секунду)
    while (requestTimestamps.length > 0 && requestTimestamps[0] < now - RATE_LIMIT_WINDOW) {
      requestTimestamps.shift();
    }
    
    // Якщо досягли ліміту, чекаємо поки не звільниться місце
    if (requestTimestamps.length >= RATE_LIMIT_REQUESTS) {
      const oldestRequest = requestTimestamps[0];
      const waitTime = RATE_LIMIT_WINDOW - (now - oldestRequest) + 150; // +150ms для безпеки
      if (waitTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue; // Перевіряємо знову після очікування
      }
    }
    
    // Перевіряємо мінімальний інтервал від останнього запиту
    if (requestTimestamps.length > 0) {
      const lastRequest = requestTimestamps[requestTimestamps.length - 1];
      const timeSinceLastRequest = now - lastRequest;
      if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest + 100; // +100ms для безпеки
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue; // Перевіряємо знову після очікування
      }
    }
    
    // Додаємо поточний запит
    requestTimestamps.push(Date.now());
    
    // Дозволяємо наступному запиту продовжити
    resolveNext!();
    break;
  }
}

// Функція для повторної спроби з експоненційним backoff
// Resend повертає помилки в об'єкті { data, error }, а не як exceptions
async function retryWithBackoff<T extends { error?: any }>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastResult: T;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    await waitForRateLimit();
    lastResult = await fn();
    
    // Якщо немає помилки, повертаємо результат
    if (!lastResult.error) {
      if (attempt > 0) {
        console.log(`Request succeeded after ${attempt} retries`);
      }
      return lastResult;
    }
    
    const error = lastResult.error;
    
    // Якщо це rate limit помилка (429), робимо retry
    if (error?.statusCode === 429 && attempt < maxRetries) {
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`Rate limit hit (429), retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }
    
    // Для інших помилок або якщо вичерпано спроби, повертаємо результат з помилкою
    if (error?.statusCode === 429) {
      console.error(`Rate limit error (429) after ${attempt + 1} attempts`);
    }
    return lastResult;
  }
  
  return lastResult!;
}

// Валідація email формату
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

async function getOrCreateAudience(): Promise<string> {
  if (cachedAudienceId) {
    return cachedAudienceId;
  }

  // Спочатку перевіряємо чи є існуючі audiences
  const { data: audiences, error: listError } = await retryWithBackoff(async () => {
    return await resend.audiences.list();
  });

  // Якщо немає помилки і є audiences, використовуємо перший
  if (!listError && audiences?.data && audiences.data.length > 0) {
    cachedAudienceId = audiences.data[0].id;
    return cachedAudienceId;
  }

  // Якщо немає, створюємо новий
  const { data: newAudience, error: createError } = await retryWithBackoff(async () => {
    return await resend.audiences.create({
      name: "Flux OS Waitlist",
    });
  });

  if (createError || !newAudience?.id) {
    throw new Error(`Не вдалося створити audience: ${createError?.message || "Unknown error"}`);
  }

  cachedAudienceId = newAudience.id;
  return cachedAudienceId;
}

// Перевіряє чи контакт вже існує в audience
async function contactExists(email: string, audienceId: string): Promise<boolean> {
  try {
    const { data: contacts, error } = await retryWithBackoff(async () => {
      return await resend.contacts.list({
        audienceId,
      });
    });

    if (error) {
      console.error("Error checking contact existence:", error);
      // Якщо помилка, припускаємо що контакту немає і продовжуємо
      return false;
    }

    // Перевіряємо чи є контакт з таким email
    const exists = contacts?.data?.some(
      (contact) => contact.email.toLowerCase() === email.toLowerCase()
    );

    return exists || false;
  } catch (error) {
    console.error("Exception checking contact existence:", error);
    return false;
  }
}

export async function POST(request: Request) {
  let locale = "en";
  try {
    const body = await request.json();
    const email = body.email;
    const token = body.token;
    locale = body.locale || "en";
    
    const t = await getTranslations({ locale, namespace: "Waitlist" });

    // Якщо є token - це підтвердження
    if (token) {
      const confirmation = verifyToken(token);

      if (!confirmation) {
        return NextResponse.json(
          { error: t("invalidToken") },
          { status: 400 }
        );
      }

      if (confirmation.expired) {
        return NextResponse.json(
          { error: t("expiredToken") },
          { status: 400 }
        );
      }

      // Додаємо email в audience після підтвердження
      const audienceId = await getOrCreateAudience();
      const { error } = await retryWithBackoff(async () => {
        return await resend.contacts.create({
          email: confirmation.email,
          audienceId,
        });
      });

      if (error) {
        if (
          error.statusCode === 409 ||
          error.message?.includes("already exists")
        ) {
          return NextResponse.json(
            { success: true, message: t("alreadyConfirmed") },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { error: error.message || t("error") },
          { status: error.statusCode || 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: t("confirmed") },
        { status: 200 }
      );
    }

    // Новий запит - валідація та відправка підтвердження
    if (!email) {
      return NextResponse.json(
        { error: t("emailRequired") },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: t("invalidEmail") },
        { status: 400 }
      );
    }

    // Перевіряємо чи користувач вже доданий до Resend
    const audienceId = await getOrCreateAudience();
    const alreadyExists = await contactExists(email, audienceId);

    if (alreadyExists) {
      return NextResponse.json(
        {
          success: true,
          message: t("alreadySubscribed"),
        },
        { status: 200 }
      );
    }

    // Генеруємо токен підтвердження
    const expirationTime = 24 * 60 * 60 * 1000; // 24 години
    const confirmationToken = signToken(email, expirationTime);

    // Відправляємо email з посиланням для підтвердження
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const confirmUrl = `${baseUrl}/api/waitlist?token=${confirmationToken}&locale=${locale}`;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    console.log("Attempting to send confirmation email:", {
      from: fromEmail,
      to: email,
      baseUrl,
    });

    const { data: emailData, error: emailError } = await retryWithBackoff(async () => {
      return await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: t("emailSubject"),
        html: `
          <h1>${t("emailTitle")}</h1>
          <p>${t("emailBody")}</p>
          <p><a href="${confirmUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">${t("emailButton")}</a></p>
          <p>${t("emailOrCopy")} ${confirmUrl}</p>
          <p>${t("emailValid24h")}</p>
        `,
      });
    });

    if (emailError) {
      console.error("Email sending error details:", {
        error: emailError,
        statusCode: emailError.statusCode,
        message: emailError.message,
        name: emailError.name,
      });

      // Більш детальні повідомлення про помилки
      let errorMessage = "Не вдалося відправити email.";

      if (
        emailError.statusCode === 422 ||
        emailError.message?.includes("domain")
      ) {
        errorMessage =
          "Помилка налаштування домену. Перевірте RESEND_FROM_EMAIL.";
      } else if (emailError.statusCode === 403) {
        errorMessage =
          "Немає доступу до відправки email. Перевірте RESEND_API_KEY.";
      } else if (emailError.statusCode === 429) {
        errorMessage =
          "Занадто багато запитів. Будь ласка, спробуйте через кілька секунд.";
      } else if (emailError.message) {
        errorMessage = `Помилка: ${emailError.message}`;
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: emailError.statusCode || 500 }
      );
    }

    console.log("Email sent successfully:", emailData);

    return NextResponse.json(
      {
        success: true,
        message: t("success"),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    const t = await getTranslations({ locale, namespace: "Waitlist" });
    return NextResponse.json(
      { error: t("serverError") },
      { status: 500 }
    );
  }
}

// GET для підтвердження через посилання
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const confirmationToken = searchParams.get("token");
  const locale = searchParams.get("locale") || "en";
  const t = await getTranslations({ locale, namespace: "Waitlist" });

  if (!confirmationToken) {
    return NextResponse.json({ error: t("tokenMissing") }, { status: 400 });
  }

  // Використовуємо той самий код що і POST з token
  const confirmation = verifyToken(confirmationToken);

  if (!confirmation) {
    return NextResponse.redirect(new URL(`/${locale}/?error=invalid_token`, request.url));
  }

  if (confirmation.expired) {
    return NextResponse.redirect(new URL(`/${locale}/?error=expired_token`, request.url));
  }

  // Додаємо email в audience
  try {
    const audienceId = await getOrCreateAudience();
    const { error } = await retryWithBackoff(async () => {
      return await resend.contacts.create({
        email: confirmation.email,
        audienceId,
      });
    });

    if (error && error.statusCode !== 409) {
      return NextResponse.redirect(
        new URL(`/${locale}/?error=confirmation_failed`, request.url)
      );
    }

    return NextResponse.redirect(new URL(`/${locale}/?success=confirmed`, request.url));
  } catch (error) {
    return NextResponse.redirect(new URL(`/${locale}/?error=server_error`, request.url));
  }
}
