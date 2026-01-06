import { Resend } from "resend";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// Кешуємо audience ID щоб не створювати кожного разу
let cachedAudienceId: string | null = null;

// Тимчасове зберігання токенів підтвердження (в продакшені використовуйте БД)
const pendingConfirmations = new Map<
  string,
  { email: string; expiresAt: number }
>();

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
  const { data: audiences } = await resend.audiences.list();

  if (audiences?.data && audiences.data.length > 0) {
    cachedAudienceId = audiences.data[0].id;
    return cachedAudienceId;
  }

  // Якщо немає, створюємо новий
  const { data: newAudience, error } = await resend.audiences.create({
    name: "Flux OS Waitlist",
  });

  if (error || !newAudience?.id) {
    throw new Error("Не вдалося створити audience");
  }

  cachedAudienceId = newAudience.id;
  return cachedAudienceId;
}

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();

    // Якщо є token - це підтвердження
    if (token) {
      const confirmationToken = token;
      const confirmation = pendingConfirmations.get(confirmationToken);

      if (!confirmation) {
        return NextResponse.json(
          { error: "Невірний або застарілий токен" },
          { status: 400 }
        );
      }

      if (Date.now() > confirmation.expiresAt) {
        pendingConfirmations.delete(confirmationToken);
        return NextResponse.json(
          { error: "Токен застарів. Зареєструйтесь знову." },
          { status: 400 }
        );
      }

      // Додаємо email в audience після підтвердження
      const audienceId = await getOrCreateAudience();
      const { error } = await resend.contacts.create({
        email: confirmation.email,
        audienceId,
      });

      pendingConfirmations.delete(confirmationToken);

      if (error) {
        if (
          error.statusCode === 409 ||
          error.message?.includes("already exists")
        ) {
          return NextResponse.json(
            { success: true, message: "Email вже підтверджено" },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { error: error.message || "Помилка збереження" },
          { status: error.statusCode || 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: "Email підтверджено та додано до списку" },
        { status: 200 }
      );
    }

    // Новий запит - валідація та відправка підтвердження
    if (!email) {
      return NextResponse.json(
        { error: "Email обов'язковий" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Невірний формат email" },
        { status: 400 }
      );
    }

    // Генеруємо токен підтвердження
    const confirmationToken = randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 години

    pendingConfirmations.set(confirmationToken, { email, expiresAt });

    // Відправляємо email з посиланням для підтвердження
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const confirmUrl = `${baseUrl}/api/waitlist?token=${confirmationToken}`;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    console.log("Attempting to send confirmation email:", {
      from: fromEmail,
      to: email,
      baseUrl,
    });

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Підтвердіть підписку на Flux OS",
      html: `
        <h1>Підтвердіть вашу підписку</h1>
        <p>Натисніть на посилання нижче, щоб підтвердити ваш email та додатись до списку очікування Flux OS:</p>
        <p><a href="${confirmUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Підтвердити підписку</a></p>
        <p>Або скопіюйте це посилання: ${confirmUrl}</p>
        <p>Посилання дійсне 24 години.</p>
      `,
    });

    if (emailError) {
      console.error("Email sending error details:", {
        error: emailError,
        statusCode: emailError.statusCode,
        message: emailError.message,
        name: emailError.name,
      });

      pendingConfirmations.delete(confirmationToken);

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
        message: "Лист з підтвердженням відправлено на ваш email",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}

// GET для підтвердження через посилання
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const confirmationToken = searchParams.get("token");

  if (!confirmationToken) {
    return NextResponse.json({ error: "Токен відсутній" }, { status: 400 });
  }

  // Використовуємо той самий код що і POST з token
  const confirmation = pendingConfirmations.get(confirmationToken);

  if (!confirmation) {
    return NextResponse.redirect(new URL("/?error=invalid_token", request.url));
  }

  if (Date.now() > confirmation.expiresAt) {
    pendingConfirmations.delete(confirmationToken);
    return NextResponse.redirect(new URL("/?error=expired_token", request.url));
  }

  // Додаємо email в audience
  try {
    const audienceId = await getOrCreateAudience();
    const { error } = await resend.contacts.create({
      email: confirmation.email,
      audienceId,
    });

    pendingConfirmations.delete(confirmationToken);

    if (error && error.statusCode !== 409) {
      return NextResponse.redirect(
        new URL("/?error=confirmation_failed", request.url)
      );
    }

    return NextResponse.redirect(new URL("/?success=confirmed", request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/?error=server_error", request.url));
  }
}
