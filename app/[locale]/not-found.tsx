import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { VisualEffects } from '@/components/landing/VisualEffects';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params?.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'NotFound' });
  return {
    title: t('title'),
  };
}

export default async function NotFound(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params?.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'NotFound' });

  return (
    <div className="grain-overlay flex min-h-screen flex-col overflow-x-hidden bg-black text-white selection:bg-teal-500/30">
      <VisualEffects />
      <Header />
      <main className="relative z-[3] flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="max-w-2xl space-y-6 py-20">
          <div className="mb-4 inline-block rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-teal-400 uppercase">
            404 Error
          </div>
          <h1 className="bg-gradient-to-b from-white via-white to-white/20 bg-clip-text pb-2 text-5xl font-bold tracking-tight text-transparent md:text-8xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed text-white/50 md:text-xl">
            {t('description')}
          </p>
          <div className="pt-8">
            <Link
              href={`/${locale}`}
              className="rounded-full bg-white px-8 py-4 font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:bg-white/90"
            >
              {t('backHome')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
