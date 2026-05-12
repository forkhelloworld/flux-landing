import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.flux-os.xyz';
  const lastModified = new Date();

  const routes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/privacy`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/${locale}/terms`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]);

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...routes,
  ];
}
