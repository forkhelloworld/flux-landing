"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TypingEffect({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (idx < text.length) {
          setDisplayed(text.slice(0, idx + 1));
          setIdx(idx + 1);
        } else {
          setDisplayed("");
          setIdx(0);
        }
      },
      idx < text.length ? 80 + Math.random() * 40 : 3000
    );
    return () => clearTimeout(timeout);
  }, [idx, text]);

  return (
    <div className={cn("text-white/40 font-light italic flex items-center", className)}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-0.5 w-0.5 h-5 bg-teal-400 inline-block"
      />
    </div>
  );
}
