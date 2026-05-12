import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://flux-os.xyz';
  const lastModified = new Date().toISOString();

  // Map locale codes to proper hreflang codes
  const hreflangMap: Record<string, string> = {
    en: 'en-US',
    ua: 'uk-UA',
  };

  // Create common alternates object for root and home pages
  const languages = {
    ...Object.fromEntries(
      locales.map((l) => [hreflangMap[l] || l, `${baseUrl}/${l}`])
    ),
    'x-default': baseUrl,
  };

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: { languages },
    },
    ...locales.flatMap((locale) => [
      {
        url: `${baseUrl}/${locale}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 1,
        alternates: { languages },
      },
      {
        url: `${baseUrl}/${locale}/privacy`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [hreflangMap[l] || l, `${baseUrl}/${l}/privacy`])
          ),
        },
      },
      {
        url: `${baseUrl}/${locale}/terms`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.3,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [hreflangMap[l] || l, `${baseUrl}/${l}/terms`])
          ),
        },
      },
    ]),
  ];
}
