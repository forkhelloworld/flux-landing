import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';

import Image from 'next/image';

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    const posts = await getSortedPostsData(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export default async function BlogPostPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;
  const { locale, slug } = params;
  const post = await getPostData(locale, slug);

  if (!post) {
    notFound();
  }

  const dateLocale = locale === 'ua' ? uk : enUS;

  return (
    <div className="grain-overlay font-manrope flex min-h-screen flex-col overflow-x-hidden bg-black text-white selection:bg-teal-500/30">
      <Header />

      <main className="relative z-[3] flex flex-1 flex-col items-center px-6 pt-32 pb-20">
        <article className="w-full max-w-3xl">
          <Link
            href={`/${locale}/blog`}
            className="text-foreground-muted group mb-8 inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {locale === 'ua' ? 'Назад до блогу' : 'Back to blog'}
          </Link>

          <header className="mb-12 space-y-6">
            <h1 className="text-4xl leading-tight font-bold tracking-tighter md:text-5xl">
              {post.title}
            </h1>

            <div className="text-foreground-muted flex flex-wrap items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.date), 'MMMM d, yyyy', { locale: dateLocale })}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {Math.ceil((post.contentHtml?.length || 0) / 1000)} min read
              </span>
            </div>
          </header>

          <div className="relative mb-12 aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/10 italic select-none">
                FLUX OS
              </div>
            )}
          </div>

          <div
            className="prose prose-invert prose-teal prose-headings:tracking-tight prose-headings:font-bold prose-p:text-foreground-muted prose-p:leading-relaxed prose-p:text-lg prose-li:text-foreground-muted prose-li:text-lg prose-strong:text-white prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}
