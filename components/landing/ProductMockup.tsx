"use client";

import { motion } from "framer-motion";
import { Sparkles, MousePointer2, Zap, Target, Search } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { useTranslations } from "next-intl";
import {
  MockupSidebar,
  MockupHeader,
  MockupTaskCard,
  MockupEnergySelector,
  MockupProgressBar,
  MockupTriageOverlay,
  MockupMobileFrame
} from "./MockupComponents";

export function ProductMockup() {
  const t = useTranslations("ProductMockup");

  return (
    <section id="experience" className="w-full py-20 px-6 flex flex-col items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="text-center mb-10 max-w-3xl"
      >
        <motion.div variants={staggerItem}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-[10px] font-bold text-teal-400 tracking-widest uppercase mb-6">
            {t("badge")}
          </span>
        </motion.div>
        <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-medium mb-4 tracking-tight text-white/90">
          {/* Note: In uk.json, Minimalism is not wrapped in a span yet, but I can adjust the translation string or the code */}
          {t.rich("title", {
            span: (chunks) => <span className="text-teal-400">{chunks}</span>
          })}
        </motion.h2>
        <motion.p variants={staggerItem} className="text-xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </motion.p>
      </motion.div>

      {/* Responsive Mockup Container */}
      <div className="w-full relative">
        {/* Desktop Browser View (Hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block relative w-full max-w-[900px] 2xl:max-w-[1200px] aspect-[16/10] rounded-[3.5rem] p-3 bg-gradient-to-br from-white/10 via-white/[0.05] to-transparent border border-white/10 backdrop-blur-[100px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] mx-auto group"
        >
          {/* Animated Background Glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Browser Frame */}
          <div className="w-full h-full bg-black/40 rounded-[2.8rem] border border-white/5 overflow-hidden flex shadow-inner relative">
            <MockupSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
              <MockupHeader />
              <div className="flex-1 p-8 overflow-y-auto no-scrollbar relative">
                <div className="max-w-4xl mx-auto space-y-12">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
                        <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">{t("systemStatus")}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        <MockupProgressBar progress={82} label={t("executionVelocity")} value={t("velocityValue")} />
                        <MockupProgressBar progress={65} label={t("focusScore")} value={t("scoreValue")} />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                        <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">{t("energyLevel")}</span>
                      </div>
                      <MockupEnergySelector />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 relative">
                    <MockupTaskCard title={t("task1.title")} subtitle={t("task1.subtitle")} status="active" energy="med" xp={150} />
                    <MockupTaskCard title={t("task2.title")} subtitle={t("task2.subtitle")} energy="high" xp={200} />
                  </div>
                </div>
                <MockupTriageOverlay />
              </div>
              <div className="px-8 pb-8">
                <div className="h-20 w-full rounded-[2rem] bg-gradient-to-r from-white/10 to-white/5 border border-white/10 backdrop-blur-3xl flex items-center px-8 gap-4 overflow-hidden shadow-2xl relative">
                  <Sparkles className="w-7 h-7 text-teal-400" />
                  <div className="flex-1 text-lg text-white/80 font-light tracking-tight">{t("capturePlaceholder")}</div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-400 flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(45,212,191,0.4)]">↵</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ x: [100, 300, 250, 450, 400], y: [500, 400, 200, 300, 450] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute pointer-events-none z-50 text-white/80"
          >
            <MousePointer2 className="w-6 h-6 fill-black stroke-white" />
          </motion.div>
        </motion.div>

        {/* Mobile Smartphone View (Visible on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:hidden w-full flex justify-center"
        >
          <MockupMobileFrame>
            {/* Mobile Header / Search Bar */}
            <div className="px-6 pt-10 pb-4 flex justify-between items-center bg-black/40 border-b border-white/5 gap-4">
              <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-[1.2rem] px-4 py-2 text-white/40 overflow-hidden">
                <Search className="w-3.5 h-3.5" />
                <span className="text-[11px] font-light truncate">{t("header.search")}</span>
              </div>
              <div className="w-8 h-8 rounded-[1rem] bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-white/20 p-0.5">
                  <div className="w-full h-full rounded-full bg-teal-400" />
                </div>
              </div>
            </div>

            {/* Mobile Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
              {/* Stats Section */}
              <div className="space-y-4">
                <MockupProgressBar progress={82} label={t("executionVelocity")} value={t("velocityValue")} />
                <div className="pt-2">
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-3">{t("energyLevel")}</div>
                  <MockupEnergySelector />
                </div>
              </div>

              {/* Task Section */}
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-3 h-3 text-teal-400" />
                  {t("nowFocus")}
                </div>
                <MockupTaskCard title={t("task1.title")} subtitle={t("task1.subtitle")} status="active" energy="med" xp={150} />
                <div className="opacity-50">
                  <MockupTaskCard title={t("task2.title")} subtitle={t("task2.subtitle")} energy="high" xp={200} />
                </div>
              </div>
            </div>

            {/* Mobile Quick Capture */}
            <div className="p-4 bg-gradient-to-t from-black to-black/20">
              <div className="h-16 w-full rounded-[1.5rem] bg-white/[0.05] border border-white/10 backdrop-blur-3xl flex items-center px-5 gap-3">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <div className="flex-1 text-sm text-white/40 font-light truncate">{t("capturePlaceholder")}</div>
                <div className="w-8 h-8 rounded-xl bg-teal-400 flex items-center justify-center text-black font-bold text-xs shadow-[0_0_15px_rgba(45,212,191,0.3)]">↵</div>
              </div>
            </div>
          </MockupMobileFrame>
        </motion.div>
      </div>

      {/* Feature Labels below mockup */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 max-w-5xl 2xl:max-w-7xl w-full">
        {[
          { icon: Sparkles, title: t("features.capture.title"), desc: t("features.capture.desc") },
          { icon: Target, title: t("features.decompose.title"), desc: t("features.decompose.desc") },
          { icon: Zap, title: t("features.energy.title"), desc: t("features.energy.desc") }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * i }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-teal-500/50 transition-colors">
              <feature.icon className="w-6 h-6 text-teal-400" />
            </div>
            <h4 className="text-lg font-medium text-white/90 mb-3">{feature.title}</h4>
            <p className="text-sm text-white/30 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
