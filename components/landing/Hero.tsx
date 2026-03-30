"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { HeartPulse, CheckCircle2, Target, Sparkles, Zap, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 150, 500], [1, 1, 0]);
  const heroScale = useTransform(scrollY, [0, 150, 500], [1, 1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-12 md:pb-20 px-6 overflow-visible">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.07)_0%,rgba(6,182,212,0.03)_30%,transparent_60%)] pointer-events-none" />

      {/* Left floating cards */}
      <motion.div
        animate={{ y: [-15, 10, -15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute left-[5%] xl:left-[10%] 2xl:left-[15%] top-1/3 flex-col gap-6 z-10 opacity-60"
      >
        <motion.div
          whileHover={{ scale: 1.05, opacity: 1 }}
          className="glow-card min-w-[13rem] p-4 rounded-2xl bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-4"
        >
          <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="absolute inset-0 w-full h-full -rotate-90 origin-center">
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" className="text-teal-500/10" />
              <motion.circle
                cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3"
                className="text-teal-400"
                strokeLinecap="round"
                initial={{ strokeDasharray: "125.6", strokeDashoffset: "125.6" }}
                animate={{ strokeDashoffset: "31.4" }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
            <HeartPulse className="w-5 h-5 text-teal-400 relative z-10" />
          </div>
          <div>
            <div className="text-[10px] text-white/50 font-medium tracking-wide uppercase">{t("energyLevel")}</div>
            <div className="text-xs font-semibold text-white/90">{t("optimalFocus")}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, opacity: 1 }}
          className="glow-card min-w-[13rem] p-5 rounded-2xl bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-4"
        >
          <div className="text-[10px] text-teal-400 font-bold tracking-widest uppercase flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-teal-400"
            />
            {t("aiDecomposing")}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-teal-400" />
            </div>
            <motion.div
              className="h-1.5 bg-white/20 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "7rem" }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-white/5" />
            <motion.div
              className="h-1.5 bg-white/10 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Right floating cards */}
      <motion.div
        animate={{ y: [15, -10, 15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute right-[5%] xl:right-[10%] 2xl:right-[15%] top-1/4 flex-col gap-8 z-10 items-end opacity-60"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/5 border border-teal-500/20 backdrop-blur-2xl shadow-[0_0_40px_rgba(45,212,191,0.15)] flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-teal-400" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, opacity: 1 }}
          className="glow-card min-w-[12rem] p-4 rounded-2xl bg-[#0a0a0a]/60 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40 uppercase font-bold">{t("focusSession")}</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-red-500"
            />
          </div>
          <div className="h-10 w-full rounded-xl bg-white/5 border border-white/10 flex items-center px-3 gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <div className="h-1.5 w-24 bg-white/20 rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-20 flex flex-col items-center text-center max-w-5xl 2xl:max-w-7xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-xs font-medium text-white/50 flex items-center gap-2"
        >
          <Zap className="w-3 h-3 text-teal-400" />
          {t("badge")}
        </motion.div>

        {/* Title with shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7.5rem] font-serif font-bold tracking-tight md:tracking-tight leading-[1.1] md:leading-[0.95] mb-6 md:mb-10 italic"
        >
          <span className="text-white drop-shadow-sm">{t("title1")}</span><br />
          <span className="md:animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,rgb(45,212,191)_0%,rgb(6,182,212)_25%,rgba(255,255,255,0.9)_50%,rgb(6,182,212)_75%,rgb(45,212,191)_100%)] bg-clip-text text-transparent pb-3 inline-block">
            {t("title2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-white/40 max-w-2xl 2xl:max-w-4xl mb-8 md:mb-14 font-light leading-relaxed mx-auto px-4"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="h-14 md:h-16 px-8 md:px-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-bold text-base md:text-xl flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(45,212,191,0.3)] hover:shadow-[0_0_80px_rgba(45,212,191,0.5)] transition-shadow duration-300"
          >
            {t("cta")} <ArrowRight className="w-5 md:w-6 h-5 md:h-6" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
