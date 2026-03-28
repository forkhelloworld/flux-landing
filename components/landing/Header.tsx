"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="fixed top-0 inset-x-0 h-20 z-50 flex items-center px-4 md:px-8 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
      <div className="flex items-center gap-3 font-bold text-xl tracking-tighter">
        <Image src="/logo.png" alt="FluxOS Logo" width={32} height={32} className="w-8 h-8 object-contain" />
        <span className="relative">FluxOS</span>
      </div>
      <div className="ml-auto hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        {[
          { id: "vision", label: t("problem") },
          { id: "how-it-works", label: t("howItWorks") },
          { id: "features", label: t("features") },
          { id: "faq", label: t("faq") }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} className="hover:text-white transition-colors relative group">
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
        <a
          href="#waitlist"
          className="group px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-all font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
        >
          {t("joinWaitlist")} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </header>
  );
}
