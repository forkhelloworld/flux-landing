"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Particles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<{ id: number; left: number; size: number; duration: number; delay: number; opacity: number; isBright: boolean }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 20,
      opacity: Math.random() * 0.4 + 0.1,
      isBright: Math.random() > 0.7,
    }));
    setParticles(generated);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-float-up"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.isBright ? "rgba(45,212,191,0.6)" : "rgba(255,255,255,0.3)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            boxShadow: p.isBright ? "0 0 6px rgba(45,212,191,0.4)" : "none",
          }}
        />
      ))}
    </div>
  );
}

export function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[2] hidden md:block w-[600px] h-[600px] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(45,212,191,0.06) 0%, rgba(6,182,212,0.03) 30%, transparent 70%)",
      }}
    />
  );
}

export function AuroraBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70">
      <div
        className="absolute w-[800px] h-[600px] -top-[15%] -left-[10%] animate-aurora"
        style={{ background: "radial-gradient(ellipse, rgba(45,212,191,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute w-[600px] h-[500px] top-[20%] -right-[15%] animate-aurora-reverse"
        style={{ animationDelay: "-5s", background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute w-[700px] h-[500px] bottom-[10%] left-[30%] animate-aurora-slow"
        style={{ animationDelay: "-12s", background: "radial-gradient(ellipse, rgba(45,212,191,0.04) 0%, transparent 70%)" }}
      />
    </div>
  );
}

export function VisualEffects() {
  return (
    <>
      <Particles count={30} />
      <CursorGlow />
      <AuroraBlobs />
    </>
  );
}
