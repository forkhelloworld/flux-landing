"use client";

import { motion } from "framer-motion";
import {
  Home,
  Inbox,
  Layers,
  Zap,
  BarChart3,
  Settings,
  Search,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// Sidebar Navigation Item
export function MockupNavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer group",
      active ? "bg-teal-500/10 text-teal-400" : "text-white/40 hover:text-white/70 hover:bg-white/5"
    )}>
      <Icon className={cn("w-5 h-5", active ? "text-teal-400" : "text-inherit")} />
      <span className="text-sm font-medium">{label}</span>
      {active && (
        <motion.div
          layoutId="activeNav"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]"
        />
      )}
    </div>
  );
}

// Energy Status Toggle
export function MockupEnergySelector() {
  const t = useTranslations("Mockup.energy");
  const levels = [
    { id: 'low', label: t('low'), color: 'text-amber-400', bg: 'bg-amber-400/20' },
    { id: 'med', label: t('med'), color: 'text-emerald-400', bg: 'bg-emerald-400/20', active: true },
    { id: 'high', label: t('high'), color: 'text-teal-400', bg: 'bg-teal-400/20' },
  ];

  return (
    <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
      {levels.map((level) => (
        <div
          key={level.id}
          className={cn(
            "flex-1 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center transition-all duration-300 cursor-pointer",
            level.active ? cn(level.bg, level.color) : "text-white/20 hover:text-white/40"
          )}
        >
          {level.label}
        </div>
      ))}
    </div>
  );
}

// XP/Progress Bar
export function MockupProgressBar({ progress, label, value }: { progress: number, label: string, value: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-mono text-white/60">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-teal-500/50 to-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.3)] rounded-full"
        />
      </div>
    </div>
  );
}

// Task Card
export function MockupTaskCard({ title, subtitle, status, energy, xp }: {
  title: string,
  subtitle: string,
  status?: 'active' | 'pending' | 'done',
  energy: 'low' | 'med' | 'high',
  xp: number
}) {
  const t = useTranslations("Mockup.taskCard");
  const tEnergy = useTranslations("Mockup.energy");

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative p-5 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-300 shadow-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            status === 'active' ? "bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,1)]" : "bg-white/20"
          )} />
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
            {status === 'active' ? t('momentum') : t('nextStep')}
          </span>
        </div>
        <div className="bg-teal-500/10 px-2 py-0.5 rounded-lg border border-teal-500/20 text-[10px] font-mono text-teal-400">
          +{xp} XP
        </div>
      </div>

      <h3 className="text-lg font-medium text-white/90 mb-1 group-hover:text-teal-400 transition-colors line-clamp-1">
        {title}
      </h3>
      <p className="text-[11px] text-white/40 font-light mb-4 leading-relaxed line-clamp-2">
        {subtitle}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white/30">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono tracking-tight">{t('duration', { min: 25 })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/30">
            <Zap className="w-3.5 h-3.5 text-amber-400/50" />
            <span className="text-[10px] font-mono tracking-tight uppercase">{t('energy', { level: tEnergy(energy) })}</span>
          </div>
        </div>
        <button className="h-8 w-16 rounded-xl bg-teal-400/10 hover:bg-teal-400 text-teal-400 hover:text-black transition-all duration-300 flex items-center justify-center border border-teal-500/20 hover:border-teal-400 shadow-lg group-hover:shadow-teal-500/20">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// AI Triage Visualizer
export function MockupTriageOverlay() {
  const t = useTranslations("Mockup.triage");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-10 right-10 w-72 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-3xl shadow-2xl p-4 z-20 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
          </motion.div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">{t('title')}</div>
          <div className="text-[9px] text-white/30 uppercase tracking-tighter">{t('status')}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="text-xs text-white/80 font-mono italic truncate">{t('intentText')}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { label: t('tags.deepWork'), icon: Target, color: 'text-violet-400', bg: 'bg-violet-400/10' },
            { label: t('tags.highEnergy'), icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
            { label: t('tags.planLaunch'), icon: Layers, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          ].map((tag, i) => (
            <motion.div
              key={tag.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              className={cn("flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 text-[9px] font-bold uppercase tracking-tight", tag.bg, tag.color)}
            >
              <tag.icon className="w-3 h-3" />
              {tag.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scanning effect line */}
      <motion.div
        animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-teal-400/20 shadow-[0_0_15px_rgba(45,212,191,0.5)] z-30"
      />
    </motion.div>
  );
}

// Sidebar Component
export function MockupSidebar() {
  const t = useTranslations("Mockup");

  return (
    <div className="w-56 border-r border-white/5 p-5 flex flex-col gap-6 h-full bg-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-xl bg-teal-400/20 border border-teal-400/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-teal-400" />
        </div>
        <span className="font-bold text-lg tracking-tight text-white/90">FluxOS</span>
      </div>

      <div className="space-y-1">
        <MockupNavItem icon={Home} label={t('nav.dashboard')} active />
        <MockupNavItem icon={Inbox} label={t('nav.inbox')} />
        <MockupNavItem icon={Layers} label={t('nav.plans')} />
        <MockupNavItem icon={BarChart3} label={t('nav.analytics')} />
      </div>

      <div className="mt-8 space-y-4">
        <div className="px-2">
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{t('sidebar.activeProject')}</span>
        </div>
        <div className="px-3 py-3 rounded-2xl bg-white/5 border border-white/5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-white/70">{t('sidebar.projectName')}</span>
            <span className="text-[10px] text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">74%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "74%" }}
              className="h-full bg-teal-400"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-1">
        <MockupNavItem icon={Settings} label={t('nav.settings')} />
      </div>
    </div>
  );
}

// Header / Top Bar
export function MockupHeader() {
  const t = useTranslations("Mockup.header");

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white/40">
          <Search className="w-4 h-4" />
          <span className="text-xs font-light">{t('search')}</span>
          <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded border border-white/5 ml-4">⌘K</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] font-bold text-teal-400 uppercase tracking-tighter">{t('streak')}</div>
            <div className="text-xs font-mono text-white/80">{t('days', { count: 12 })}</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-teal-400" />
          </div>
        </div>

        <div className="w-8 h-8 rounded-full border border-white/10 bg-gradient-to-br from-white/20 to-transparent p-0.5">
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-[10px] font-bold text-white/60">
            JD
          </div>
        </div>
      </div>
    </div>
  );
}
