"use client";

import { motion } from "framer-motion";
import { Inbox, Sparkles, Workflow, Target, Trophy, ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem, colorMap } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function Process() {
  const t = useTranslations("Process");

  const steps = [
    { num: "01", title: t("steps.capture.title"), subtitle: t("steps.capture.subtitle"), desc: t("steps.capture.desc"), icon: <Inbox className="w-5 h-5" />, color: "teal" },
    { num: "02", title: t("steps.triage.title"), subtitle: t("steps.triage.subtitle"), desc: t("steps.triage.desc"), icon: <Sparkles className="w-5 h-5" />, color: "cyan" },
    { num: "03", title: t("steps.decompose.title"), subtitle: t("steps.decompose.subtitle"), desc: t("steps.decompose.desc"), icon: <Workflow className="w-5 h-5" />, color: "blue" },
    { num: "04", title: t("steps.focus.title"), subtitle: t("steps.focus.subtitle"), desc: t("steps.focus.desc"), icon: <Target className="w-5 h-5" />, color: "violet" },
    { num: "05", title: t("steps.reward.title"), subtitle: t("steps.reward.subtitle"), desc: t("steps.reward.desc"), icon: <Trophy className="w-5 h-5" />, color: "amber" },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-5xl 2xl:max-w-7xl py-32 px-6 flex flex-col items-center mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-20 max-w-3xl">
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

      <div className="w-full space-y-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 8 }}
            className="glow-card flex items-start gap-6 p-7 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:bg-white/[0.04] transition-colors"
          >
            <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${colorMap[step.color as keyof typeof colorMap]?.bg || 'bg-white/10'} border ${colorMap[step.color as keyof typeof colorMap]?.border || 'border-white/20'} flex items-center justify-center ${colorMap[step.color as keyof typeof colorMap]?.text || 'text-white'}`}>
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-mono text-white/20">{step.num}</span>
                <h3 className="text-lg font-semibold text-white/90">{step.title}</h3>
                <span className={`text-[10px] font-bold ${colorMap[step.color as keyof typeof colorMap]?.text || 'text-white'} uppercase tracking-widest hidden sm:inline`}>{step.subtitle}</span>
              </div>
              <p className="text-sm text-white/40 font-light leading-relaxed">{step.desc}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/10 flex-shrink-0 mt-1 group-hover:text-white/30 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
