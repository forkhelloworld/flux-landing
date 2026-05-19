import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { getSortedPostsData } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.flux-os.xyz';
  const lastModified = new Date();

  // Static routes for each locale
  const staticRoutes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.8,
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

  // Dynamic blog post routes for each locale
  const blogPosts = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getSortedPostsData(locale);
      return posts.map((post) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    })
  );

  return [...staticRoutes, ...blogPosts.flat()];
}
