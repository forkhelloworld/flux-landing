import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://flux-os.xyz';

  // Map locale codes to proper hreflang codes
  const hreflangMap: Record<string, string> = {
    en: 'en-US',
    ua: 'uk-UA',
  };

  const routes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [hreflangMap[l] || l, `${baseUrl}/${l}`])
        ),
      },
    },
    {
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/${locale}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]);

  // Add root URL that redirects to default locale
  routes.unshift({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l] || l, `${baseUrl}/${l}`])
      ),
    },
  });

  return routes;
}
