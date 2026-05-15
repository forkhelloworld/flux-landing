import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/i18n";
import { Manrope, Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";
import { FramerProvider } from "@/lib/framer-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params?.locale || "en";
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.flux-os.xyz';

  const keywordsMap: Record<string, string[]> = {
    en: [
      "productivity app", "AI task manager", "execution gap", "focus session",
      "energy management", "AI decomposition", "task planner", "ADHD productivity",
      "offline task manager", "voice capture", "smart triage", "FluxOS",
      "AI productivity tool", "goal tracking", "habit building",
    ],
    ua: [
      "застосунок продуктивності", "ШІ менеджер завдань", "розрив виконання",
      "сесія фокусу", "управління енергією", "ШІ декомпозиція", "планувальник завдань",
      "продуктивність РДУГ", "офлайн менеджер завдань", "голосова фіксація",
      "смарт-сортування", "FluxOS", "ШІ інструмент продуктивності",
      "відстеження цілей", "формування звичок",
    ],
  };

  return {
    title: {
      default: t("title"),
      template: "%s | FluxOS",
    },
    description: t("description"),
    keywords: keywordsMap[locale] || keywordsMap.en,
    authors: [{ name: "FluxOS", url: baseUrl }],
    creator: "FluxOS",
    publisher: "FluxOS",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en-US": "/en",
        "uk-UA": "/ua",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${baseUrl}/${locale}`,
      siteName: "FluxOS",
      images: [
        {
          url: `/og-${locale}.png`,
          width: 1200,
          height: 630,
          alt: t("ogTitle"),
        },
      ],
      locale: locale === "ua" ? "uk_UA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      creator: t("twitterHandle"),
      images: [`/og-${locale}.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add your Google Search Console verification here
      // google: "your-verification-code",
    },
    category: "productivity",
  };
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const { children } = props;
  const params = await props.params;
  const locale = params?.locale || "en";

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale === "ua" ? "uk" : locale}
      className={`${manrope.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col scroll-smooth">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <FramerProvider>
            {children}
          </FramerProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
