"use client";

import { motion } from "framer-motion";
import { Rocket, GraduationCap, Brain, Briefcase } from "lucide-react";
import { staggerContainer, staggerItem, colorMap } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function Audience() {
  const t = useTranslations("Audience");

  const personas = [
    { icon: <Rocket className="w-6 h-6" />, title: t("personas.builders.title"), color: "teal", desc: t("personas.builders.desc") },
    { icon: <GraduationCap className="w-6 h-6" />, title: t("personas.students.title"), color: "cyan", desc: t("personas.students.desc") },
    { icon: <Brain className="w-6 h-6" />, title: t("personas.adhd.title"), color: "violet", desc: t("personas.adhd.desc") },
    { icon: <Briefcase className="w-6 h-6" />, title: t("personas.freelancers.title"), color: "amber", desc: t("personas.freelancers.desc") },
  ];

  return (
    <section className="w-full max-w-6xl py-32 px-6 flex flex-col items-center mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16 max-w-3xl">
        <motion.div variants={staggerItem}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-bold text-teal-400 tracking-widest uppercase mb-6">
            {t("badge")}
          </span>
        </motion.div>
        <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-medium mb-6 text-white/90">
          {t("title")}
        </motion.h2>
        <motion.p variants={staggerItem} className="text-lg text-white/50 font-light leading-relaxed">
          {t("subtitle")}
        </motion.p>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {personas.map((persona, i) => (
          <motion.div
            key={persona.title}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="glow-card p-7 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:bg-white/[0.04] transition-colors"
          >
            <div className={`w-12 h-12 rounded-xl ${colorMap[persona.color as keyof typeof colorMap]?.bg || 'bg-white/10'} border ${colorMap[persona.color as keyof typeof colorMap]?.border || 'border-white/20'} flex items-center justify-center ${colorMap[persona.color as keyof typeof colorMap]?.text || 'text-white'} mb-5 group-hover:scale-110 transition-transform`}>
              {persona.icon}
            </div>
            <h3 className="text-base font-semibold text-white/90 mb-2">{persona.title}</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">{persona.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
