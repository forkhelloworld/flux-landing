"use client";

import { motion } from "framer-motion";
import { Sparkles, Workflow, Target, HeartPulse, WifiOff, Mic } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function Features() {
  const t = useTranslations("Features");

  const features = [
    { icon: <Sparkles className="w-6 h-6" />, title: t("list.triage.title"), desc: t("list.triage.desc"), gradient: "from-cyan-500/10 to-teal-500/5", border: "border-cyan-500/15" },
    { icon: <Workflow className="w-6 h-6" />, title: t("list.decompose.title"), desc: t("list.decompose.desc"), gradient: "from-blue-500/10 to-indigo-500/5", border: "border-blue-500/15" },
    { icon: <Target className="w-6 h-6" />, title: t("list.focus.title"), desc: t("list.focus.desc"), gradient: "from-violet-500/10 to-purple-500/5", border: "border-violet-500/15" },
    { icon: <HeartPulse className="w-6 h-6" />, title: t("list.energy.title"), desc: t("list.energy.desc"), gradient: "from-rose-500/10 to-pink-500/5", border: "border-rose-500/15" },
    { icon: <WifiOff className="w-6 h-6" />, title: t("list.offline.title"), desc: t("list.offline.desc"), gradient: "from-emerald-500/10 to-green-500/5", border: "border-emerald-500/15" },
    { icon: <Mic className="w-6 h-6" />, title: t("list.voice.title"), desc: t("list.voice.desc"), gradient: "from-amber-500/10 to-orange-500/5", border: "border-amber-500/15" },
  ];

  return (
    <section id="features" className="w-full max-w-6xl 2xl:max-w-7xl py-12 md:py-32 px-6 flex flex-col items-center mx-auto">
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

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={staggerItem}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`glow-card p-8 rounded-[2rem] bg-gradient-to-br ${feature.gradient} border ${feature.border} relative overflow-hidden group transition-colors`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 mb-5 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-white/90 mb-3">{feature.title}</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
