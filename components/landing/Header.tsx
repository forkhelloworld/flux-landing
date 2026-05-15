'use client';

import { ArrowRight, Menu, X, Zap } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

export function Header() {
  const t = useTranslations('Header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const navItems = [
    { id: 'vision', label: t('problem'), href: `/${locale}#vision` },
    { id: 'how-it-works', label: t('howItWorks'), href: `/${locale}#how-it-works` },
    { id: 'features', label: t('features'), href: `/${locale}#features` },
    { id: 'faq', label: t('faq'), href: `/${locale}#faq` },
    { id: 'blog', label: t('blog'), href: `/${locale}/blog` },
  ];

  return (
    <>
      <div className="bg-accent group fixed inset-x-0 top-0 z-[60] flex h-10 items-center justify-center overflow-hidden px-4">
        <m.a
          href="https://app.flux-os.xyz"
          className="text-accent-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase md:text-xs"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Zap className="fill-accent-foreground h-3 w-3" />
          {t('announcement')}
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </m.a>
        <div className="bg-foreground/10 pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <header className="border-border bg-background/80 md:bg-background/40 fixed inset-x-0 top-10 z-50 flex h-20 items-center border-b px-6 backdrop-blur-lg md:px-12 md:backdrop-blur-2xl">
        <div className="flex items-center gap-3 text-xl font-bold tracking-tighter">
          <Image
            src="/logo.png"
            alt="FluxOS Logo"
            loading="eager"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="relative">FluxOS</span>
        </div>
        <nav
          aria-label="Main navigation"
          className="text-foreground-muted ml-auto hidden items-center gap-8 text-sm font-medium md:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group relative transition-colors hover:text-white"
            >
              {item.label}
              <span className="bg-accent absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://app.flux-os.xyz"
            className="group bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 rounded-full px-6 py-2.5 font-semibold shadow-[0_0_15px_rgba(var(--accent-raw),0.15)] transition-all hover:shadow-[0_0_30px_rgba(var(--accent-raw),0.25)]"
          >
            {t('joinWaitlist')}{' '}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-foreground-muted hover:text-foreground z-[60] ml-auto p-2 transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <m.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-background/95 fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 backdrop-blur-3xl md:hidden"
            >
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col items-center gap-8 text-2xl font-semibold tracking-tighter"
              >
                {navItems.map((item) => (
                  <m.a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ scale: 1.1, color: 'var(--accent)' }}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </m.a>
                ))}
                <m.a
                  href="https://app.flux-os.xyz"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-accent text-accent-foreground mt-4 flex items-center gap-3 rounded-full px-10 py-4 font-bold shadow-[0_0_30px_rgba(var(--accent-raw),0.3)]"
                >
                  {t('joinWaitlist')} <ArrowRight className="h-5 w-5" />
                </m.a>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
