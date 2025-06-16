"use client";

import React, { useState, useEffect } from "react";
import { Fugaz_One } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const PHASES = [
  { label: "Inhale", duration: 4000, icon: "🌬️", color: "from-indigo-400 to-indigo-500" },
  { label: "Hold", duration: 3000, icon: "⏳", color: "from-indigo-500 to-indigo-600" },
  { label: "Exhale", duration: 5000, icon: "🍃", color: "from-indigo-600 to-indigo-700" },
];

export default function page() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (cycleCount >= 6) return;

    const timeout = setTimeout(() => {
      setPhaseIndex((prevIndex) => {
        const next = (prevIndex + 1) % PHASES.length;
        if (next === 0) {
          setCycleCount((prevCount) => prevCount + 1);
        }
        return next;
      });
    }, PHASES[phaseIndex].duration);

    return () => clearTimeout(timeout);
  }, [phaseIndex, cycleCount]);

  const phase = PHASES[phaseIndex];

  const getScale = () => {
    switch (phase.label) {
      case "Inhale": return 1.2;
      case "Hold": return 1.1;
      case "Exhale": return 0.9;
      default: return 1;
    }
  };

  const getGradient = () => {
    const parts = phase?.color?.split(' ') || [];
    const from = parts[0]?.replace('from-', '#') || '#818cf8';
    const to = parts[1]?.replace('to-', '#') || '#6366f1';
    return `linear-gradient(135deg, ${from}, ${to})`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8 space-y-2">
        <h1 className={`text-5xl font-bold text-indigo-800 ${fugaz.className}`}>
          Breath Harmony
        </h1>
        <p className="text-indigo-600 text-lg font-semibold max-w-md mx-auto">
          Synchronize with the rhythm — complete 6 cycles to unlock inner balance
        </p>
      </div>

      <div className="relative w-64 h-64">
        <AnimatePresence mode='wait'>
          <motion.div
            key={phase.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: getScale(),
              opacity: 1,
              background: getGradient()
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full rounded-full flex items-center justify-center shadow-xl"
          >
            <div className="absolute inset-0 rounded-full bg-indigo-100/30 animate-pulse" />
            <div className="text-6xl">{phase.icon}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 space-y-4 text-center">
        <motion.div
          key={phase.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-indigo-700"
        >
          {cycleCount >= 6 ? "🌸 Full Bloom Achieved" : phase.label}
        </motion.div>

        <div className="flex justify-center gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < cycleCount ? 'bg-indigo-600' : 'bg-indigo-100'
              }`}
            />
          ))}
        </div>

        <div className="text-indigo-600 font-bold flex items-center justify-center gap-2">
          <span className="text-sm">Cycles Completed</span>
          <span className="font-mono text-indigo-700 font-bold">{cycleCount}/6</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-sm">
        {PHASES.map((p) => (
          <div key={p.label} className={`text-center p-3 rounded-xl transition-all ${
            phase.label === p.label 
              ? 'bg-indigo-100 border-2 border-indigo-300' 
              : 'bg-indigo-50 border border-indigo-100'
          }`}>
            <div className="text-2xl mb-1">{p.icon}</div>
            <div className="text-sm text-indigo-800 font-bold">{p.label}</div>
            <div className="text-xs text-indigo-600 font-semibold">{p.duration / 1000}s</div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center text-indigo-500 text-sm max-w-md">
        <p>Focus on your breath and follow the rhythm. This exercise helps reduce stress and improve focus.</p>
      </div>
    </div>
  );
}