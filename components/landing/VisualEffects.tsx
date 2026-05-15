'use client';

import { useState, useEffect } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

export function Particles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<
    {
      id: number;
      left: number;
      size: number;
      duration: number;
      delay: number;
      opacity: number;
      isBright: boolean;
    }[]
  >([]);

  useEffect(() => {
    // Delay particle generation to prioritize initial paint
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      const finalCount = isMobile ? Math.min(count, 12) : count;
      const generated = Array.from({ length: finalCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * (isMobile ? 2 : 3) + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 20,
        opacity: Math.random() * (isMobile ? 0.3 : 0.4) + 0.1,
        isBright: Math.random() > 0.8,
      }));
      setParticles(generated);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="animate-float-up pointer-events-none absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.isBright ? 'rgba(45,212,191,0.6)' : 'rgba(255,255,255,0.3)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            boxShadow: p.isBright ? '0 0 6px rgba(45,212,191,0.4)' : 'none',
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
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <m.div
      className="pointer-events-none fixed top-0 left-0 z-[2] hidden h-[600px] w-[600px] rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background:
          'radial-gradient(circle, rgba(45,212,191,0.06) 0%, rgba(6,182,212,0.03) 30%, transparent 70%)',
      }}
    />
  );
}

export function AuroraBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden opacity-70 md:block">
      <div
        className="animate-aurora absolute -top-[15%] -left-[10%] h-[600px] w-[800px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(45,212,191,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="animate-aurora-reverse absolute top-[20%] -right-[15%] h-[500px] w-[600px]"
        style={{
          animationDelay: '-5s',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="animate-aurora-slow absolute bottom-[10%] left-[30%] h-[500px] w-[700px]"
        style={{
          animationDelay: '-12s',
          background: 'radial-gradient(ellipse, rgba(45,212,191,0.04) 0%, transparent 70%)',
        }}
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
