'use client';

import { m } from 'framer-motion';
import { Sparkles, Workflow, Target, HeartPulse, WifiOff, Mic } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/constants';
import { useTranslations } from 'next-intl';

export function Features() {
  const t = useTranslations('Features');

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: t('list.triage.title'),
      desc: t('list.triage.desc'),
      gradient: 'from-cyan-500/10 to-teal-500/5',
      border: 'border-cyan-500/15',
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: t('list.decompose.title'),
      desc: t('list.decompose.desc'),
      gradient: 'from-blue-500/10 to-indigo-500/5',
      border: 'border-blue-500/15',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('list.focus.title'),
      desc: t('list.focus.desc'),
      gradient: 'from-violet-500/10 to-purple-500/5',
      border: 'border-violet-500/15',
    },
    {
      icon: <HeartPulse className="h-6 w-6" />,
      title: t('list.energy.title'),
      desc: t('list.energy.desc'),
      gradient: 'from-rose-500/10 to-pink-500/5',
      border: 'border-rose-500/15',
    },
    {
      icon: <WifiOff className="h-6 w-6" />,
      title: t('list.offline.title'),
      desc: t('list.offline.desc'),
      gradient: 'from-emerald-500/10 to-green-500/5',
      border: 'border-emerald-500/15',
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: t('list.voice.title'),
      desc: t('list.voice.desc'),
      gradient: 'from-amber-500/10 to-orange-500/5',
      border: 'border-amber-500/15',
    },
  ];

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-12 md:py-32 2xl:max-w-7xl"
    >
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="mb-20 max-w-3xl text-center"
      >
        <m.div variants={staggerItem}>
          <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-[10px] font-bold tracking-widest text-teal-400 uppercase">
            {t('badge')}
          </span>
        </m.div>
        <m.h2
          id="features-title"
          variants={staggerItem}
          className="mb-6 text-3xl font-medium text-white/90 md:text-5xl"
        >
          {t('title')}
        </m.h2>
        <m.p variants={staggerItem} className="text-lg leading-relaxed font-light text-white/50">
          {t('subtitle')}
        </m.p>
      </m.div>

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <m.div
            key={feature.title}
            variants={staggerItem}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`glow-card rounded-[2rem] bg-gradient-to-br p-8 ${feature.gradient} border ${feature.border} group relative overflow-hidden transition-colors`}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-transform group-hover:scale-110">
              {feature.icon}
            </div>
            <h3 className="mb-3 text-lg font-semibold text-white/90">{feature.title}</h3>
            <p className="text-sm leading-relaxed font-light text-white/40">{feature.desc}</p>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
