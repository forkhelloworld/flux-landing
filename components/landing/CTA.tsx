"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { WaitlistForm } from "./WaitlistForm";

export function CTA() {
  const t = useTranslations("CTA");

  return (
    <section id="waitlist" className="w-full py-40 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(-45deg,rgba(45,212,191,0.08),rgba(6,182,212,0.05),black,rgba(45,212,191,0.03),black)] bg-[length:400%_400%] animate-gradient-shift pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10 w-full max-w-lg"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight animate-text-glow text-white">
          {t("title")}
        </h2>
        <p className="text-xl text-white/40 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          {t("subtitle")}
        </p>
        <WaitlistForm variant="cta" />
      </motion.div>
    </section>
  );
}
