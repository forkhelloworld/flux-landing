import dynamic from 'next/dynamic';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { JsonLd } from '@/components/landing/JsonLd';
import { locales } from '@/i18n';

const VisualEffects = dynamic(() =>
  import('@/components/landing/VisualEffects').then((mod) => mod.VisualEffects)
);
const Problem = dynamic(() => import('@/components/landing/Problem').then((mod) => mod.Problem));
const Audience = dynamic(() => import('@/components/landing/Audience').then((mod) => mod.Audience));
const Process = dynamic(() => import('@/components/landing/Process').then((mod) => mod.Process));
const ProductMockup = dynamic(() =>
  import('@/components/landing/ProductMockup').then((mod) => mod.ProductMockup)
);
const Features = dynamic(() => import('@/components/landing/Features').then((mod) => mod.Features));
const FAQ = dynamic(() => import('@/components/landing/FAQ').then((mod) => mod.FAQ));
const CTA = dynamic(() => import('@/components/landing/CTA').then((mod) => mod.CTA));
const Footer = dynamic(() => import('@/components/landing/Footer').then((mod) => mod.Footer));

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  await props.params;
  return (
    <div className="grain-overlay flex min-h-screen flex-col overflow-x-hidden bg-black text-white selection:bg-teal-500/30">
      <JsonLd />
      <VisualEffects />
      <Header />
      <main className="relative z-[3] flex flex-1 flex-col items-center">
        <Hero />
        <Problem />
        <Audience />
        <Process />
        <ProductMockup />
        <Features />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
