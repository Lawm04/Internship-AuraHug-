"use client";

import { Fugaz_One } from 'next/font/google';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiZap, FiActivity, FiHeadphones } from 'react-icons/fi';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function StressReliefExercise() {
  const router = useRouter();
  
  return (
    <div className={`min-h-screen bg-slate-50 font-sans ${fugaz.variable}`}>
      {/* Categories Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${fugaz.className}"
        >
          Stress Relief Toolkit
        </motion.h2>
      
        <div className="grid md:grid-cols-2 gap-8">
          {/* Breathing Exercises Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-2xl shadow-md border border-slate-200 hover:border-purple-300 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiActivity className="text-3xl text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-purple-800 font-fugaz">
                Breathing Mastery
              </h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Harness ancient techniques like 4-7-8 rhythm and diaphragmatic flow to find your calm center.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/bloom")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-lg font-semibold text-white hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Begin Breathwork
            </motion.button>
          </motion.div>

          {/* Guided Meditations Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-2xl shadow-md border border-slate-200 hover:border-blue-300 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiHeadphones className="text-3xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800 font-fugaz">
                Mindful Sessions
              </h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Immerse in curated audio journeys blending mindfulness, nature sounds, and binaural beats.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/relax")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-semibold text-white hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Start Meditation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Quick Relax Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-md"
          >
            <div className="mb-6 inline-block p-4 bg-purple-100 rounded-full">
              <FiZap className="text-4xl text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-purple-900 mb-4 font-fugaz">
              Instant Recharge
            </h2>
            <p className="text-gray-700 mb-8 text-lg max-w-xl mx-auto">
              Reset your nervous system with our 5-minute nature immersion experience
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/recharge")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-lg font-bold text-gray-900 hover:from-amber-500 hover:to-orange-600 transition-all"
            >
              Activate Relaxation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}