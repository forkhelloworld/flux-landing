"use client";

import { motion } from "framer-motion";
import { Sparkles, MousePointer2, Zap, Target } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { useTranslations } from "next-intl";
import { 
  MockupSidebar, 
  MockupHeader, 
  MockupTaskCard, 
  MockupEnergySelector, 
  MockupProgressBar,
  MockupTriageOverlay
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

      {/* Desktop App Layout Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[900px] aspect-[16/10] rounded-[3.5rem] p-3 bg-gradient-to-br from-white/10 via-white/[0.05] to-transparent border border-white/10 backdrop-blur-[100px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] mx-auto group"
      >
        {/* Animated Background Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Browser Frame */}
        <div className="w-full h-full bg-black/40 rounded-[2.8rem] border border-white/5 overflow-hidden flex shadow-inner relative">
          
          {/* Sidebar */}
          <MockupSidebar />

          {/* Main Workspace */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
            <MockupHeader />

            <div className="flex-1 p-6 md:p-8 overflow-y-auto no-scrollbar relative">
              <div className="max-w-4xl mx-auto space-y-12">
                
                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 gap-6 md:gap-10">
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
                    <p className="text-[10px] text-white/20 italic font-mono uppercase tracking-tight">
                      {t("energyHint")}
                    </p>
                  </div>
                </div>

                {/* Task Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  <MockupTaskCard 
                    title={t("task1.title")}
                    subtitle={t("task1.subtitle")}
                    status="active"
                    energy="med"
                    xp={150}
                  />
                  
                  <div className="opacity-40 hover:opacity-100 transition-opacity duration-500 scale-95 origin-left">
                    <MockupTaskCard 
                      title={t("task2.title")}
                      subtitle={t("task2.subtitle")}
                      energy="high"
                      xp={200}
                    />
                  </div>

                  {/* Connecting visualization line */}
                  <svg className="absolute -left-12 top-10 w-10 h-1/2 pointer-events-none opacity-20 hidden md:block" fill="none">
                    <path d="M10 10C-10 40 -10 100 10 130" stroke="url(#gradient)" strokeWidth="2" strokeDasharray="4 4" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Secondary list of tasks */}
                <div className="space-y-3">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{t("upcomingActions")}</span>
                      <span className="text-[9px] font-mono text-teal-400 cursor-pointer hover:underline uppercase tracking-tighter">{t("viewAll")}</span>
                   </div>
                   {[
                     t("task3"),
                     t("task4"),
                     t("task5")
                   ].map((task, i) => (
                     <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all duration-300 group cursor-default">
                        <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-teal-500/50 transition-colors">
                          <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-teal-400/20 transition-all" />
                        </div>
                        <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors flex-1">{task}</span>
                        <div className="text-[10px] font-mono text-white/10 uppercase group-hover:text-amber-400 transition-colors">{t("medEnergy")}</div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Float Triage Overlay */}
              <MockupTriageOverlay />
            </div>

            {/* Quick Capture Bar - Fixed at bottom of workspace */}
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <motion.div 
                whileHover={{ scale: 1.005, y: -2 }}
                className="h-20 w-full rounded-[2rem] bg-gradient-to-r from-white/10 to-white/5 border border-white/10 backdrop-blur-3xl flex items-center px-8 gap-4 overflow-hidden shadow-2xl relative group/input"
              >
                <div className="absolute inset-0 bg-teal-400/5 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <Sparkles className="w-7 h-7 text-teal-400 flex-shrink-0 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <TypingEffect text={t("capturePlaceholder")} className="text-lg text-white/80 placeholder:text-white/20 font-light tracking-tight" />
                </div>
                <div className="flex items-center gap-4">
                   <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest hidden md:block">Press Enter to Decompose</div>
                   <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-teal-400 flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(45,212,191,0.4)] group-hover/input:shadow-teal-400/60 transition-all cursor-pointer active:scale-90">
                     ↵
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative elements outside the frame */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-40 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full mix-blend-screen" 
        />
        
        {/* Floating Mouse Cursor for realism */}
        <motion.div 
          animate={{ 
            x: [100, 300, 250, 450, 400],
            y: [500, 400, 200, 300, 450],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute pointer-events-none z-50 text-white/80"
        >
          <MousePointer2 className="w-6 h-6 fill-black stroke-white" />
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }}
            className="absolute top-full left-full mt-2 ml-2 px-3 py-1.5 rounded-xl bg-teal-400 text-black text-[10px] font-bold shadow-xl backdrop-blur-md"
          >
            {t("actionTriggered")}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Feature Labels below mockup */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 max-w-5xl w-full">
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
