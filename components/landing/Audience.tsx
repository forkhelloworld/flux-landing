'use client';

import { m } from 'framer-motion';
import { Rocket, GraduationCap, Brain, Briefcase } from 'lucide-react';
import { staggerContainer, staggerItem, colorMap } from '@/lib/constants';
import { useTranslations } from 'next-intl';

export function Audience() {
  const t = useTranslations('Audience');

  const personas = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: t('personas.builders.title'),
      color: 'teal',
      desc: t('personas.builders.desc'),
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: t('personas.students.title'),
      color: 'cyan',
      desc: t('personas.students.desc'),
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: t('personas.adhd.title'),
      color: 'violet',
      desc: t('personas.adhd.desc'),
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: t('personas.freelancers.title'),
      color: 'amber',
      desc: t('personas.freelancers.desc'),
    },
  ];

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-32 2xl:max-w-7xl">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="mb-16 max-w-3xl text-center"
      >
        <m.div variants={staggerItem}>
          <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-[10px] font-bold tracking-widest text-teal-400 uppercase">
            {t('badge')}
          </span>
        </m.div>
        <m.h2
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
        className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {personas.map((persona) => (
          <m.div
            key={persona.title}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="glow-card group rounded-2xl border border-white/5 bg-white/[0.02] p-7 backdrop-blur-xl transition-colors hover:bg-white/[0.04]"
          >
            <div
              className={`h-12 w-12 rounded-xl ${colorMap[persona.color as keyof typeof colorMap]?.bg || 'bg-white/10'} border ${colorMap[persona.color as keyof typeof colorMap]?.border || 'border-white/20'} flex items-center justify-center ${colorMap[persona.color as keyof typeof colorMap]?.text || 'text-white'} mb-5 transition-transform group-hover:scale-110`}
            >
              {persona.icon}
            </div>
            <h3 className="mb-2 text-base font-semibold text-white/90">{persona.title}</h3>
            <p className="text-sm leading-relaxed font-light text-white/40">{persona.desc}</p>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
