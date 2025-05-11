"use client";

import React from 'react'
import { useState } from 'react';
import { Fugaz_One } from "next/font/google";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function page() {
    const [mood, setMood] = useState("");
    const [submittedMood, setSubmittedMood] = useState(null);

    const quickMoods = [
        { emoji: "✨", label: "Inspired" },
        { emoji: "🌪️", label: "Chaotic" },
        { emoji: "🌈", label: "Hopeful" },
        { emoji: "⚡", label: "Energetic" },
        { emoji: "🌑", label: "Melancholy" },
    ];

    const handleMoodSubmit = () => {
        if (mood) {
            setSubmittedMood(mood);
            setMood("");          
        }
    };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="space-y-2 mb-12 text-center">
          <h1 className={`text-6xl font-extrabold mb-2 text-center ${fugaz.className}`}>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Mood Spectrum
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl text-center mx-auto">
            Map your emotional coordinates through time and space
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-slate-200">
          {/* Quick Mood Selection */}
          <div className="mb-10">
            <div className="grid grid-cols-5 gap-4 mb-8">
              {quickMoods.map((moodItem, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMood(moodItem.label)}
                  className="p-3 rounded-2xl bg-white hover:bg-slate-50 transition-all flex flex-col items-center group border border-slate-200"
                >
                  <span className="text-4xl mb-2 transition-transform group-hover:scale-125">
                    {moodItem.emoji}
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                    {moodItem.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mood Input */}
          <div className="relative mb-6">
            <motion.div whileHover={{ scale: 1.02 }}>
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="Describe your current state..."
                className="w-full px-8 py-5 pr-28 border-2 border-slate-200 rounded-[2rem] bg-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-lg text-gray-800 placeholder-gray-400"
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMoodSubmit}
              disabled={!mood}
              className="absolute right-2 top-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-[2rem] font-semibold flex items-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Log</span>
              <FiArrowRight className="text-xl" />
            </motion.button>
          </div>
        </div>

        {submittedMood && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-8 p-6 bg-white backdrop-blur-sm rounded-2xl border border-slate-200 text-center shadow-md"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              className="text-4xl mb-3 text-purple-600"
            >
              🌟
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <FiCheckCircle className="text-purple-600" />
              Mood Recorded
            </h2>
            <p className="text-gray-700">
              Current mood:{" "}
              <span className="font-semibold text-purple-600">
                {submittedMood}
              </span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div> 
  )
}