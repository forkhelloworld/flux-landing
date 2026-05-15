'use client';

import { m } from 'framer-motion';
import { Brain, Layers, Activity, Workflow, ListChecks, SlidersHorizontal } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/constants';
import { useTranslations } from 'next-intl';

export function Problem() {
  const t = useTranslations('Problem');

  return (
    <section
      id="vision"
      aria-labelledby="problem-title"
      className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-12 text-center md:py-20 lg:pb-32 2xl:max-w-7xl"
    >
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="w-full"
      >
        <m.div variants={staggerItem}>
          <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-[10px] font-bold tracking-widest text-teal-400 uppercase">
            {t('badge')}
          </span>
        </m.div>
        <m.h2
          id="problem-title"
          variants={staggerItem}
          className="mb-6 text-3xl font-medium text-white/90 md:text-5xl"
        >
          {t('title')}
        </m.h2>
        <m.p
          variants={staggerItem}
          className="mx-auto mb-16 max-w-3xl px-4 text-lg leading-relaxed font-light text-white/50 md:text-xl"
        >
          {t('subtitle')}
        </m.p>

        <m.div variants={staggerItem} className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          <m.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="glow-card group relative overflow-hidden rounded-[2rem] border border-red-500/10 bg-gradient-to-br from-red-500/5 to-transparent p-8 transition-colors hover:from-red-500/10"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity group-hover:opacity-20">
              <Brain className="h-20 w-20 text-red-500" />
            </div>
            <h3 className="mb-3 flex items-center gap-3 text-xl font-medium text-red-300">
              <Activity className="h-5 w-5" /> {t('friction.title')}
            </h3>
            <p className="relative z-10 leading-relaxed font-light text-white/50">
              {t('friction.desc')}
            </p>
          </m.div>

          <m.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="glow-card group relative overflow-hidden rounded-[2rem] border border-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent p-8 transition-colors hover:from-blue-500/10"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity group-hover:opacity-20">
              <Layers className="h-20 w-20 text-blue-500" />
            </div>
            <h3 className="mb-3 flex items-center gap-3 text-xl font-medium text-blue-300">
              <Workflow className="h-5 w-5" /> {t('abstraction.title')}
            </h3>
            <p className="relative z-10 leading-relaxed font-light text-white/50">
              {t('abstraction.desc')}
            </p>
          </m.div>

          <m.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="glow-card group relative overflow-hidden rounded-[2rem] border border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-transparent p-8 transition-colors hover:from-amber-500/10"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity group-hover:opacity-20">
              <ListChecks className="h-20 w-20 text-amber-500" />
            </div>
            <h3 className="mb-3 flex items-center gap-3 text-xl font-medium text-amber-300">
              <SlidersHorizontal className="h-5 w-5" /> {t('paralysis.title')}
            </h3>
            <p className="relative z-10 leading-relaxed font-light text-white/50">
              {t('paralysis.desc')}
            </p>
          </m.div>
        </m.div>
      </m.div>
    </section>
  );
}
