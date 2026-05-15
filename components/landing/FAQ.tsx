'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/constants';
import { useTranslations } from 'next-intl';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <m.div
      variants={staggerItem}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01] transition-colors hover:border-white/15 hover:bg-white/[0.02]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between p-8 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-white/90 transition-colors group-hover:text-white">
          {question}
        </span>
        <m.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-teal-400" />
        </m.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 border-t border-white/5 p-8 pt-0 text-base leading-relaxed font-light text-white/50">
              {answer}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

export function FAQ() {
  const t = useTranslations('FAQ');

  const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto w-full max-w-4xl px-6 py-32">
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="mb-16 text-center"
      >
        <m.div variants={staggerItem}>
          <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-[10px] font-bold tracking-widest text-teal-400 uppercase">
            {t('badge')}
          </span>
        </m.div>
        <m.h2
          id="faq-title"
          variants={staggerItem}
          className="mb-6 text-3xl font-medium text-white/90 md:text-5xl"
        >
          {t('title')}
        </m.h2>
        <m.p variants={staggerItem} className="mx-auto max-w-2xl text-lg text-white/40">
          {t('subtitle')}
        </m.p>
      </m.div>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-4"
      >
        {questions.map((q) => (
          <FAQItem key={q} question={t(`questions.${q}.q`)} answer={t(`questions.${q}.a`)} />
        ))}
      </m.div>
    </section>
  );
}
