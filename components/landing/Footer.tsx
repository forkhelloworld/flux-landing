import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-xl relative z-10 w-full px-6">
      <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 font-bold text-base tracking-tighter text-white/40">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="FluxOS Logo" width={20} height={20} className="w-5 h-5 grayscale opacity-30" />
            <span>FluxOS</span>
          </div>
          <span className="text-[10px] font-mono text-white/10 font-normal tracking-wider opacity-60 uppercase">
            {t("copyright", { year: new Date().getFullYear() })}
          </span>
          <div className="flex items-center gap-6 text-[10px] font-mono text-white/20 font-normal tracking-wider uppercase">
            <a href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t("privacy")}</a>
            <a href={`/${locale}/terms`} className="hover:text-white transition-colors">{t("terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
