import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { getSortedPostsData } from '@/lib/blog';
import { locales } from '@/i18n';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';

import Image from 'next/image';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params?.locale || 'en';
  const posts = await getSortedPostsData(locale);
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const dateLocale = locale === 'ua' ? uk : enUS;

  return (
    <div className="grain-overlay font-manrope flex min-h-screen flex-col overflow-x-hidden bg-black text-white selection:bg-teal-500/30">
      <Header />

      <main className="relative z-[3] flex flex-1 flex-col items-center px-6 pt-32 pb-20">
        <div className="w-full max-w-4xl">
          <header className="mb-16 space-y-4">
            <h1 className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
              {t('blogTitle')}
            </h1>
            <p className="text-foreground-muted max-w-2xl text-xl">{t('blogDescription')}</p>
          </header>

          <div className="grid gap-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative grid items-center gap-8 md:grid-cols-2"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white/20 italic select-none">
                      FLUX
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent" />
                </div>

                <div className="space-y-4">
                  <div className="text-foreground-muted flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.date), 'MMMM d, yyyy', { locale: dateLocale })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                  </div>

                  <h2 className="group-hover:text-accent text-2xl font-bold transition-colors md:text-3xl">
                    <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-foreground-muted leading-relaxed">{post.excerpt}</p>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="text-accent group/link inline-flex items-center gap-2 font-semibold"
                  >
                    {locale === 'ua' ? 'Читати далі' : 'Read more'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}

            {posts.length === 0 && (
              <div className="space-y-4 rounded-3xl border border-dashed border-white/10 py-20 text-center">
                <p className="text-foreground-muted text-xl">
                  {locale === 'ua' ? 'Поки що немає публікацій.' : 'No posts yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
