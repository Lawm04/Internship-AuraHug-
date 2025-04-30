"use client";

import React from 'react'
import { Fugaz_One } from "next/font/google";
import { useState, useEffect } from "react";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const PHASES = [
    { label: "Inhale", duration: 4000 },
    { label: "Hold", duration: 3000 },
    { label: "Exhale", duration: 5000 },
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
        case "Inhale":
          return "scale-125";
        case "Hold":
          return "scale-125";
        case "Exhale":
          return "scale-100";
        default:
          return "scale-100";
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
        <h1 className={`text-4xl font-bold mb-4 text-center ${fugaz.className}`}>
          Breathe & Bloom
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
          Sync your breath with the flower. Complete 6 cycles to fully bloom.
        </p>
  
        {/* Breathing Flower */}
        <div className={`transition-all duration-[3000ms] ${getScale()}`}>
          <div className="w-48 h-48 rounded-full bg-pink-200 flex items-center justify-center shadow-xl">
            <div className="w-24 h-24 rounded-full bg-white"></div>
          </div>
        </div>
  
        {/* Message */}
        <div className="mt-6 text-xl font-medium text-purple-700">
          {cycleCount >= 6 ? "🌸 You Bloomed!" : phase.label}
        </div>
  
        {/* Cycle Progress */}
        <p className="mt-2 text-gray-500">{cycleCount} / 6 Cycles</p>
      </div>
    );
}
