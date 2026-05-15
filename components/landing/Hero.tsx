'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import { HeartPulse, CheckCircle2, Target, Sparkles, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('Hero');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 150, 500], [1, 1, 0]);
  const heroScale = useTransform(scrollY, [0, 150, 500], [1, 1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section
      id="hero"
      aria-label="Hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-visible px-6 pt-24 pb-12 md:pb-20"
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsla(var(--accent-raw)/0.07)_0%,hsla(var(--accent-raw)/0.03)_30%,transparent_60%)] md:h-[800px] md:w-[800px]" />

      {/* Left floating cards */}
      <m.div
        animate={{ y: [-15, 10, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-[5%] z-10 hidden flex-col gap-6 opacity-60 lg:flex xl:left-[10%] 2xl:left-[15%]"
      >
        <m.div
          whileHover={{ scale: 1.05, opacity: 1 }}
          className="glow-card bg-background/60 border-border flex min-w-[13rem] items-center gap-4 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl"
        >
          <div className="relative flex h-12 w-12 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full origin-center -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-accent/10"
              />
              <m.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-accent"
                strokeLinecap="round"
                initial={{ strokeDasharray: '125.6', strokeDashoffset: '125.6' }}
                animate={{ strokeDashoffset: '31.4' }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>
            <HeartPulse className="text-accent relative z-10 h-5 w-5" />
          </div>
          <div>
            <div className="text-foreground-muted text-[10px] font-medium tracking-wide uppercase">
              {t('energyLevel')}
            </div>
            <div className="text-foreground/90 text-xs font-semibold">{t('optimalFocus')}</div>
          </div>
        </m.div>

        <m.div
          whileHover={{ scale: 1.05, opacity: 1 }}
          className="glow-card bg-background/60 border-border flex min-w-[13rem] flex-col gap-4 rounded-2xl border p-5 shadow-2xl backdrop-blur-xl"
        >
          <div className="text-accent flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
            <m.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-accent h-1.5 w-1.5 rounded-full"
            />
            {t('aiDecomposing')}
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-accent/20 flex h-4 w-4 items-center justify-center rounded-full">
              <CheckCircle2 className="text-accent h-3 w-3" />
            </div>
            <m.div
              className="bg-foreground/20 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '7rem' }}
              transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-foreground/5 h-4 w-4 rounded-full" />
            <m.div
              className="bg-foreground/10 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '4rem' }}
              transition={{ duration: 1.2, delay: 1.8, ease: 'easeOut' }}
            />
          </div>
        </m.div>
      </m.div>

      {/* Right floating cards */}
      <m.div
        animate={{ y: [15, -10, 15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[5%] z-10 hidden flex-col items-end gap-8 opacity-60 lg:flex xl:right-[10%] 2xl:right-[15%]"
      >
        <m.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="from-accent/10 to-accent-muted/5 border-accent/20 flex h-16 w-16 items-center justify-center rounded-2xl border bg-gradient-to-br shadow-[0_0_40px_rgba(var(--accent-raw),0.15)] backdrop-blur-2xl"
        >
          <Sparkles className="text-accent h-8 w-8" />
        </m.div>

        <m.div
          whileHover={{ scale: 1.05, opacity: 1 }}
          className="glow-card bg-background/60 border-border flex min-w-[12rem] flex-col gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-foreground-muted text-[10px] font-bold uppercase">
              {t('focusSession')}
            </span>
            <m.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-red-500"
            />
          </div>
          <div className="bg-foreground/5 border-border flex h-10 w-full items-center gap-2 rounded-xl border px-3">
            <Target className="text-accent h-4 w-4" />
            <div className="bg-foreground/20 h-1.5 w-24 rounded-full" />
          </div>
        </m.div>
      </m.div>

      {/* Hero content */}
      <m.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-20 mx-auto flex max-w-5xl flex-col items-center text-center 2xl:max-w-7xl"
      >
        {/* Title with shimmer */}
        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 mb-6 font-serif text-4xl leading-[1.1] font-bold tracking-tight italic sm:text-5xl md:mb-10 md:text-6xl md:leading-[0.95] md:tracking-tight lg:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7.5rem]"
        >
          <span className="text-foreground drop-shadow-sm">{t('title1')}</span>
          <br />
          <span className="md:animate-shimmer inline-block bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent-muted)_25%,var(--foreground)_50%,var(--accent-muted)_75%,var(--accent)_100%)] bg-[length:200%_100%] bg-clip-text pb-3 text-transparent">
            {t('title2')}
          </span>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-foreground-muted mx-auto mb-8 max-w-2xl px-4 text-base leading-relaxed font-light sm:text-lg md:mb-14 md:text-xl 2xl:max-w-4xl 2xl:text-2xl"
        >
          {t('subtitle')}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <m.a
            href="https://app.flux-os.xyz"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-accent text-accent-foreground flex h-14 items-center justify-center gap-3 rounded-full px-8 text-base font-bold shadow-[0_0_50px_rgba(var(--accent-raw),0.3)] transition-shadow duration-300 hover:shadow-[0_0_80px_rgba(var(--accent-raw),0.5)] md:h-16 md:px-10 md:text-xl"
          >
            {t('cta')} <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
          </m.a>
        </m.div>
      </m.div>
    </section>
  );
}
