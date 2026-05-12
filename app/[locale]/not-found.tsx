import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { VisualEffects } from "@/components/landing/VisualEffects";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NotFound" });
  return {
    title: t("title"),
  };
}

export default async function NotFound({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <div className="grain-overlay flex flex-col min-h-screen text-white bg-black overflow-x-hidden selection:bg-teal-500/30">
      <VisualEffects />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-[3] px-6 text-center">
        <div className="space-y-6 max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-4">
            404 Error
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            {t("title")}
          </h1>
          <p className="text-xl text-foreground-muted max-w-md mx-auto">
            {t("description")}
          </p>
          <div className="pt-8">
            <Link
              href={`/${locale}`}
              className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {t("backHome")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
