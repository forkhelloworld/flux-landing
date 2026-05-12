import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Audience } from "@/components/landing/Audience";
import { Process } from "@/components/landing/Process";
import { ProductMockup } from "@/components/landing/ProductMockup";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { VisualEffects } from "@/components/landing/VisualEffects";
import { JsonLd } from "@/components/landing/JsonLd";
import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <div className="grain-overlay flex flex-col min-h-screen text-white bg-black overflow-x-hidden selection:bg-teal-500/30">
      <JsonLd />
      <VisualEffects />
      <Header />
      <main className="flex-1 flex flex-col items-center relative z-[3]">
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
