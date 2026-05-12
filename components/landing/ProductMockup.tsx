"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Target, ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function ProductMockup() {
  const t = useTranslations("ProductMockup");

  return (
    <section id="experience" className="w-full py-24 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Background Ambient Glows (RedditGrow style) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Background Ambient Glows (Enhanced Bloom) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-teal-500/15 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-500/10 blur-[140px] rounded-full pointer-events-none z-0" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="text-center mb-16 max-w-3xl relative z-10"
      >
        <motion.div variants={staggerItem}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/5 text-[10px] font-bold text-teal-400 tracking-widest uppercase mb-6">
            {t("badge")}
          </span>
        </motion.div>
        <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-medium mb-4 tracking-tight text-white/90">
          {t.rich("title", {
            span: (chunks) => <span className="text-teal-400">{chunks}</span>
          })}
        </motion.h2>
        <motion.p variants={staggerItem} className="text-xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </motion.p>
      </motion.div>

      {/* Main Mockup Container (Ultra-Subtle) */}
      <div className="w-full relative max-w-[1100px] 2xl:max-w-[1400px] mx-auto z-10 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Subtle Outer Border / Glow Frame - Restored Glass & Fixed Radius */}
          <div className="relative p-1 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden isolate">
            {/* Inner Screenshot Container with perfectly matched radius */}
            <div className="relative aspect-[16/9] w-full rounded-[calc(1.5rem-4px)] md:rounded-[calc(2rem-4px)] overflow-hidden bg-black/20">
              <Image
                src="/image.png"
                alt="FluxOS MVP Screenshot"
                fill
                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700"
                priority
              />
              {/* Subtle Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Centered CTA Button (Floating Style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <Link 
              href="https://app.flux-os.xyz"
              target="_blank"
              className="flex items-center gap-3 px-8 py-4 bg-teal-400 text-black font-bold rounded-full shadow-[0_20px_50px_-10px_rgba(45,212,191,0.6)] hover:scale-105 transition-all duration-300 group/btn"
            >
              <span>{t("joinWaitlist") || "Open App"}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Labels below mockup */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 max-w-5xl 2xl:max-w-7xl w-full relative z-10">
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
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-teal-400/10 transition-all duration-300">
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
