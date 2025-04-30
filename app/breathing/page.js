"use client"
import React from 'react';
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function page() {
  return (
<div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${fugaz.className}`}>
        Explore Breathing Exercises
      </h1>
      <p className="text-center text-gray-600 max-w-xl mb-6">
        Follow along with the breathing animation below. Inhale as the circle expands, hold briefly, and exhale as it shrinks.
      </p>

      {/* Breathing Animation */}
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full bg-blue-300 animate-breathe" />
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        .animate-breathe {
          animation: breathe 6s ease-in-out infinite;
        }
      `}</style>
    </div>  )
}
