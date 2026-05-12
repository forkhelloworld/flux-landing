"use client";

import { motion } from "framer-motion";
import { Brain, Layers, Activity, Workflow, ListChecks, SlidersHorizontal } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function Problem() {
  const t = useTranslations("Problem");

  return (
    <section id="vision" aria-labelledby="problem-title" className="w-full max-w-5xl 2xl:max-w-7xl py-12 md:py-20 lg:pb-32 px-6 flex flex-col items-center text-center mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="w-full">
        <motion.div variants={staggerItem}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-bold text-teal-400 tracking-widest uppercase mb-6">
            {t("badge")}
          </span>
        </motion.div>
        <motion.h2 id="problem-title" variants={staggerItem} className="text-3xl md:text-5xl font-medium mb-6 text-white/90">
          {t("title")}
        </motion.h2>
        <motion.p variants={staggerItem} className="text-lg md:text-xl text-white/50 leading-relaxed font-light mb-16 px-4 max-w-3xl mx-auto">
          {t("subtitle")}
        </motion.p>

        <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="glow-card p-8 rounded-[2rem] bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/10 relative overflow-hidden group hover:from-red-500/10 transition-colors"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain className="w-20 h-20 text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-red-300 mb-3 flex items-center gap-3">
              <Activity className="w-5 h-5" /> {t("friction.title")}
            </h3>
            <p className="text-white/50 font-light leading-relaxed relative z-10">
              {t("friction.desc")}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="glow-card p-8 rounded-[2rem] bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 relative overflow-hidden group hover:from-blue-500/10 transition-colors"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layers className="w-20 h-20 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-blue-300 mb-3 flex items-center gap-3">
              <Workflow className="w-5 h-5" /> {t("abstraction.title")}
            </h3>
            <p className="text-white/50 font-light leading-relaxed relative z-10">
              {t("abstraction.desc")}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="glow-card p-8 rounded-[2rem] bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10 relative overflow-hidden group hover:from-amber-500/10 transition-colors"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <ListChecks className="w-20 h-20 text-amber-500" />
            </div>
            <h3 className="text-xl font-medium text-amber-300 mb-3 flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5" /> {t("paralysis.title")}
            </h3>
            <p className="text-white/50 font-light leading-relaxed relative z-10">
              {t("paralysis.desc")}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
