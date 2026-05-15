import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import { locales } from "@/i18n";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { uk, enUS } from "date-fns/locale";

import Image from "next/image";

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

export default async function BlogPostPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = await props.params;
  const { locale, slug } = params;
  const post = await getPostData(locale, slug);

  if (!post) {
    notFound();
  }

  const dateLocale = locale === "ua" ? uk : enUS;

  return (
    <div className="grain-overlay flex flex-col min-h-screen text-white bg-black overflow-x-hidden selection:bg-teal-500/30 font-manrope">
      <Header />
      
      <main className="flex-1 flex flex-col items-center relative z-[3] pt-32 pb-20 px-6">
        <article className="max-w-3xl w-full">
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {locale === "ua" ? "Назад до блогу" : "Back to blog"}
          </Link>

          <header className="mb-12 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-muted">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.date), "MMMM d, yyyy", { locale: dateLocale })}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {Math.ceil((post.contentHtml?.length || 0) / 1000)} min read
              </span>
            </div>
          </header>

          <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 bg-white/5 border border-white/10">
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
             <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-6xl italic select-none">
                FLUX OS
             </div>
            )}
          </div>

          <div 
            className="prose prose-invert prose-teal max-w-none 
              prose-headings:tracking-tight prose-headings:font-bold
              prose-p:text-foreground-muted prose-p:leading-relaxed prose-p:text-lg
              prose-li:text-foreground-muted prose-li:text-lg
              prose-strong:text-white
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}
