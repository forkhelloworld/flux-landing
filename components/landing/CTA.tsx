'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function CTA() {
  const t = useTranslations('CTA');

  return (
    <section
      id="waitlist"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center md:py-40"
    >
      <div className="animate-gradient-shift pointer-events-none absolute inset-0 bg-[linear-gradient(-45deg,rgba(45,212,191,0.08),rgba(6,182,212,0.05),black,rgba(45,212,191,0.03),black)] bg-[length:400%_400%]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        <h2 className="animate-text-glow mb-6 text-4xl font-bold tracking-tight text-white md:mb-8 md:text-6xl">
          {t('title')}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed font-light text-white/40">
          {t('subtitle')}
        </p>
        <m.a
          href="https://app.flux-os.xyz"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-accent text-accent-foreground inline-flex h-14 items-center justify-center gap-3 rounded-full px-10 font-bold shadow-[0_0_50px_rgba(var(--accent-raw),0.3)] transition-shadow duration-300 hover:shadow-[0_0_80px_rgba(var(--accent-raw),0.5)]"
        >
          {t('button')}
        </m.a>
      </m.div>
    </section>
  );
}
