"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { useTranslations } from "next-intl";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <m.div
      variants={staggerItem}
      className="border border-white/10 rounded-2xl bg-white/[0.01] overflow-hidden transition-colors hover:bg-white/[0.02] hover:border-white/15"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 text-left flex items-center justify-between focus:outline-none group"
      >
        <span className="font-medium text-lg text-white/90 group-hover:text-white transition-colors">{question}</span>
        <m.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-teal-400" />
        </m.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-8 pt-0 text-white/50 text-base leading-relaxed font-light border-t border-white/5 mt-2">
              {answer}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

export function FAQ() {
  const t = useTranslations("FAQ");

  const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const;

  return (
    <section id="faq" aria-labelledby="faq-title" className="w-full max-w-4xl py-32 px-6 mx-auto">
      <m.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer} className="text-center mb-16"
      >
        <m.div variants={staggerItem}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-bold text-teal-400 tracking-widest uppercase mb-6">{t("badge")}</span>
        </m.div>
        <m.h2 id="faq-title" variants={staggerItem} className="text-3xl md:text-5xl font-medium mb-6 text-white/90">{t("title")}</m.h2>
        <m.p variants={staggerItem} className="text-white/40 text-lg max-w-2xl mx-auto">{t("subtitle")}</m.p>
      </m.div>
      <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
        {questions.map((q) => (
          <FAQItem key={q} question={t(`questions.${q}.q`)} answer={t(`questions.${q}.a`)} />
        ))}
      </m.div>
    </section>
  );
}
