import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "uk"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // Get locale from request if not provided
  const resolvedLocale = locale || (await requestLocale);

  // Validate that the incoming `locale` parameter is valid
  if (!resolvedLocale || !locales.includes(resolvedLocale as Locale))
    notFound();

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
