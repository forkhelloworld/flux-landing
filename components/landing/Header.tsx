"use client";

import { ArrowRight, Menu, X, Zap } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const t = useTranslations("Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "vision", label: t("problem") },
    { id: "how-it-works", label: t("howItWorks") },
    { id: "features", label: t("features") },
    { id: "faq", label: t("faq") }
  ];

  return (
    <>
      <div className="fixed top-0 inset-x-0 h-10 z-[60] bg-accent flex items-center justify-center px-4 overflow-hidden group">
        <motion.a 
          href="https://app.flux-os.xyz"
          className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-accent-foreground tracking-widest uppercase"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Zap className="w-3 h-3 fill-accent-foreground" />
          {t("announcement")}
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </motion.a>
        <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <header className="fixed top-10 inset-x-0 h-20 z-50 flex items-center px-6 md:px-12 border-b border-border bg-background/80 md:bg-background/40 backdrop-blur-lg md:backdrop-blur-2xl">
      <div className="flex items-center gap-3 font-bold text-xl tracking-tighter">
        <Image src="/logo.png" alt="FluxOS Logo" loading="eager" width={32} height={32} className="w-8 h-8 object-contain" />
        <span className="relative">FluxOS</span>
      </div>
      <nav aria-label="Main navigation" className="ml-auto hidden md:flex items-center gap-8 text-sm font-medium text-foreground-muted">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} 
            className="hover:text-white transition-colors relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
          </a>
        ))}
        <a
          href="https://app.flux-os.xyz"
          className="group px-6 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(var(--accent-raw),0.15)] hover:shadow-[0_0_30px_rgba(var(--accent-raw),0.25)]"
        >
          {t("joinWaitlist")} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </nav>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="ml-auto p-2 md:hidden text-foreground-muted hover:text-foreground transition-colors z-[60]"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-10"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-8 text-2xl font-semibold tracking-tighter">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.1, color: "var(--accent)" }}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="https://app.flux-os.xyz"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-10 py-4 rounded-full bg-accent text-accent-foreground font-bold flex items-center gap-3 shadow-[0_0_30px_rgba(var(--accent-raw),0.3)]"
              >
                {t("joinWaitlist")} <ArrowRight className="w-5 h-5" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
}
