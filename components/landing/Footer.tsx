import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-black/40 px-6 py-12 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-10 text-center md:flex-row md:text-left 2xl:max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-base font-bold tracking-tighter text-white/40 md:flex-row md:gap-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="FluxOS Logo"
              width={20}
              height={20}
              className="h-5 w-5 opacity-30 grayscale"
            />
            <span>FluxOS</span>
          </div>
          <span className="font-mono text-[10px] font-normal tracking-wider text-white/10 uppercase opacity-60">
            {t('copyright', { year: new Date().getFullYear() })}
          </span>
          <div className="flex items-center gap-6 font-mono text-[10px] font-normal tracking-wider text-white/20 uppercase">
            <a href={`/${locale}/privacy`} className="transition-colors hover:text-white">
              {t('privacy')}
            </a>
            <a href={`/${locale}/terms`} className="transition-colors hover:text-white">
              {t('terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
