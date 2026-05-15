'use client';

import { m } from 'framer-motion';
import { Inbox, Sparkles, Workflow, Target, Trophy, ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem, colorMap } from '@/lib/constants';
import { useTranslations } from 'next-intl';

export function Process() {
  const t = useTranslations('Process');

  const steps = [
    {
      num: '01',
      title: t('steps.capture.title'),
      subtitle: t('steps.capture.subtitle'),
      desc: t('steps.capture.desc'),
      icon: <Inbox className="h-5 w-5" />,
      color: 'teal',
    },
    {
      num: '02',
      title: t('steps.triage.title'),
      subtitle: t('steps.triage.subtitle'),
      desc: t('steps.triage.desc'),
      icon: <Sparkles className="h-5 w-5" />,
      color: 'cyan',
    },
    {
      num: '03',
      title: t('steps.decompose.title'),
      subtitle: t('steps.decompose.subtitle'),
      desc: t('steps.decompose.desc'),
      icon: <Workflow className="h-5 w-5" />,
      color: 'blue',
    },
    {
      num: '04',
      title: t('steps.focus.title'),
      subtitle: t('steps.focus.subtitle'),
      desc: t('steps.focus.desc'),
      icon: <Target className="h-5 w-5" />,
      color: 'violet',
    },
    {
      num: '05',
      title: t('steps.reward.title'),
      subtitle: t('steps.reward.subtitle'),
      desc: t('steps.reward.desc'),
      icon: <Trophy className="h-5 w-5" />,
      color: 'amber',
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="process-title"
      className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-32 2xl:max-w-7xl"
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
          id="process-title"
          variants={staggerItem}
          className="mb-6 text-3xl font-medium text-white/90 md:text-5xl"
        >
          {t('title')}
        </m.h2>
        <m.p variants={staggerItem} className="text-lg leading-relaxed font-light text-white/50">
          {t('subtitle')}
        </m.p>
      </m.div>

      <div className="w-full space-y-6">
        {steps.map((step, i) => (
          <m.div
            key={step.num}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 8 }}
            className="glow-card group flex items-start gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-7 backdrop-blur-xl transition-colors hover:bg-white/[0.04]"
          >
            <div
              className={`h-14 w-14 flex-shrink-0 rounded-2xl ${colorMap[step.color as keyof typeof colorMap]?.bg || 'bg-white/10'} border ${colorMap[step.color as keyof typeof colorMap]?.border || 'border-white/20'} flex items-center justify-center ${colorMap[step.color as keyof typeof colorMap]?.text || 'text-white'}`}
            >
              {step.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-3">
                <span className="font-mono text-[10px] text-white/20">{step.num}</span>
                <h3 className="text-lg font-semibold text-white/90">{step.title}</h3>
                <span
                  className={`text-[10px] font-bold ${colorMap[step.color as keyof typeof colorMap]?.text || 'text-white'} hidden tracking-widest uppercase sm:inline`}
                >
                  {step.subtitle}
                </span>
              </div>
              <p className="text-sm leading-relaxed font-light text-white/40">{step.desc}</p>
            </div>
            <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-white/10 transition-colors group-hover:text-white/30" />
          </m.div>
        ))}
      </div>
    </section>
  );
}
