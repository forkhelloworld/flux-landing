import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Header");

  return (
    <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-xl relative z-10 w-full">
      <div className="w-full max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3 font-bold text-base tracking-tighter text-white/40">
          <Image src="/logo.png" alt="FluxOS Logo" width={20} height={20} className="w-5 h-5 grayscale opacity-30" />
          <span>FluxOS</span>
          <span className="hidden md:block text-[10px] font-mono text-white/10 ml-4 font-normal tracking-wider opacity-60 uppercase">
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
          <a href="#vision" className="hover:text-white transition-colors">{tNav("problem")}</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">{tNav("howItWorks")}</a>
          <a href="#features" className="hover:text-white transition-colors">{tNav("features")}</a>
          <a href="#faq" className="hover:text-white transition-colors">{tNav("faq")}</a>
        </div>
      </div>
    </footer>
  );
}
