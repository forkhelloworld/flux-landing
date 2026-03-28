"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface WaitlistFormProps {
  className?: string;
  variant?: "hero" | "cta";
}

export function WaitlistForm({ className, variant = "hero" }: WaitlistFormProps) {
  const t = useTranslations("Waitlist");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage(t("invalidEmail"));
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || t("success"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || t("error"));
      }
    } catch (error) {
      setStatus("error");
      setMessage(t("error"));
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-teal-500/10 border border-teal-500/20 backdrop-blur-xl text-center"
          >
            <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-teal-400" />
            </div>
            <p className="text-teal-50 font-medium">{message}</p>
            <motion.button
              onClick={() => setStatus("idle")}
              className="mt-2 text-xs text-teal-400/60 hover:text-teal-400 underline underline-offset-4"
            >
              {t("addAnother")}
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col gap-3"
          >
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={t("placeholder")}
                disabled={status === "loading"}
                className={`w-full h-16 pl-6 pr-32 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl text-white placeholder:text-white/20 outline-none focus:border-teal-500/50 focus:bg-white/[0.05] transition-all duration-300 ${
                  status === "error" ? "border-red-500/50 bg-red-500/5" : ""
                }`}
              />
              <div className="absolute right-2 top-2 bottom-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-full px-6 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="hidden sm:inline">{t("button")}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-100 text-sm"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
