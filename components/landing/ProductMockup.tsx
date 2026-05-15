'use client';

import { m } from 'framer-motion';
import { Sparkles, Zap, Target, ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function ProductMockup() {
  const t = useTranslations('ProductMockup');

  return (
    <section
      id="experience"
      className="relative flex w-full flex-col items-center overflow-hidden px-6 py-24"
    >
      {/* Background Ambient Glows (RedditGrow style) */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[100px]" />

      {/* Background Ambient Glows (Enhanced Bloom) */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/15 blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[140px]" />

      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="relative z-10 mb-16 max-w-3xl text-center"
      >
        <m.div variants={staggerItem}>
          <span className="mb-6 inline-block rounded-full bg-teal-500/5 px-4 py-1.5 text-[10px] font-bold tracking-widest text-teal-400 uppercase">
            {t('badge')}
          </span>
        </m.div>
        <m.h2
          variants={staggerItem}
          className="mb-4 text-3xl font-medium tracking-tight text-white/90 md:text-5xl"
        >
          {t.rich('title', {
            span: (chunks) => <span className="text-teal-400">{chunks}</span>,
          })}
        </m.h2>
        <m.p
          variants={staggerItem}
          className="mx-auto max-w-2xl text-xl leading-relaxed font-light text-white/40"
        >
          {t('subtitle')}
        </m.p>
      </m.div>

      {/* Main Mockup Container (Ultra-Subtle) */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-4 md:px-0 2xl:max-w-[1400px]">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="group relative"
        >
          {/* Subtle Outer Border / Glow Frame - Restored Glass & Fixed Radius */}
          <div className="relative isolate overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-1 shadow-2xl backdrop-blur-md md:rounded-[2rem]">
            {/* Inner Screenshot Container with perfectly matched radius */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[calc(1.5rem-4px)] bg-black/20 md:rounded-[calc(2rem-4px)]">
              <Image
                src="/image.png"
                alt="FluxOS MVP Dashboard"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
                className="object-cover object-top opacity-90 transition-all duration-700 group-hover:opacity-100"
                draggable={false}
              />{' '}
              {/* Subtle Shadow Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Centered CTA Button (Floating Style) */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <Link
              href="https://app.flux-os.xyz"
              target="_blank"
              className="group/btn flex items-center gap-2 rounded-full bg-teal-400 px-5 py-3 text-sm font-bold whitespace-nowrap text-black shadow-[0_15px_40px_-10px_rgba(45,212,191,0.5)] transition-all duration-300 hover:scale-105 md:gap-3 md:px-8 md:py-4 md:text-base md:shadow-[0_20px_50px_-10px_rgba(45,212,191,0.6)]"
            >
              <span>{t('joinWaitlist') || 'Open App'}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1 md:h-4 md:w-4" />
            </Link>
          </m.div>
        </m.div>
      </div>

      {/* Feature Labels below mockup */}
      <div className="relative z-10 mt-32 grid w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-3 2xl:max-w-7xl">
        {[
          { icon: Sparkles, title: t('features.capture.title'), desc: t('features.capture.desc') },
          {
            icon: Target,
            title: t('features.decompose.title'),
            desc: t('features.decompose.desc'),
          },
          { icon: Zap, title: t('features.energy.title'), desc: t('features.energy.desc') },
        ].map((feature, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * i }}
            className="group flex flex-col items-center text-center"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 group-hover:bg-teal-400/10">
              <feature.icon className="h-6 w-6 text-teal-400" />
            </div>
            <h4 className="mb-3 text-lg font-medium text-white/90">{feature.title}</h4>
            <p className="text-sm leading-relaxed text-white/30">{feature.desc}</p>
          </m.div>
        ))}
      </div>
    </section>
  );
}
