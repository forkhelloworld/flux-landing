import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { getSortedPostsData } from "@/lib/blog";
import { locales } from "@/i18n";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { uk, enUS } from "date-fns/locale";

import Image from "next/image";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params?.locale || "en";
  const posts = await getSortedPostsData(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const dateLocale = locale === "ua" ? uk : enUS;

  return (
    <div className="grain-overlay flex flex-col min-h-screen text-white bg-black overflow-x-hidden selection:bg-teal-500/30 font-manrope">
      <Header />
      
      <main className="flex-1 flex flex-col items-center relative z-[3] pt-32 pb-20 px-6">
        <div className="max-w-4xl w-full">
          <header className="mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              {t("blogTitle")}
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl">
              {t("blogDescription")}
            </p>
          </header>

          <div className="grid gap-12">
            {posts.map((post) => (
              <article key={post.slug} className="group relative grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  {post.coverImage ? (
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-4xl italic select-none">
                      FLUX
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent pointer-events-none" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-foreground-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(post.date), "MMMM d, yyyy", { locale: dateLocale })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-foreground-muted leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Link 
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-accent font-semibold group/link"
                  >
                    {locale === "ua" ? "Читати далі" : "Read more"}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}

            {posts.length === 0 && (
              <div className="py-20 text-center space-y-4 border border-dashed border-white/10 rounded-3xl">
                <p className="text-xl text-foreground-muted">
                  {locale === "ua" ? "Поки що немає публікацій." : "No posts yet."}
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
