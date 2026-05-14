import dynamic from "next/dynamic";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { JsonLd } from "@/components/landing/JsonLd";
import { locales } from "@/i18n";

const VisualEffects = dynamic(() => import("@/components/landing/VisualEffects").then((mod) => mod.VisualEffects));
const Problem = dynamic(() => import("@/components/landing/Problem").then((mod) => mod.Problem));
const Audience = dynamic(() => import("@/components/landing/Audience").then((mod) => mod.Audience));
const Process = dynamic(() => import("@/components/landing/Process").then((mod) => mod.Process));
const ProductMockup = dynamic(() => import("@/components/landing/ProductMockup").then((mod) => mod.ProductMockup));
const Features = dynamic(() => import("@/components/landing/Features").then((mod) => mod.Features));
const FAQ = dynamic(() => import("@/components/landing/FAQ").then((mod) => mod.FAQ));
const CTA = dynamic(() => import("@/components/landing/CTA").then((mod) => mod.CTA));
const Footer = dynamic(() => import("@/components/landing/Footer").then((mod) => mod.Footer));

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params?.locale || "en";
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
