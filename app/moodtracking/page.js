"use client";

import React from 'react'
import { useState } from 'react';
import { Fugaz_One } from "next/font/google";
import { motion } from "framer-motion";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function page() {
    const [mood, setMood] = useState("");
    const [submittedMood, setSubmittedMood] = useState(null);

    const quickMoods = [
        { emoji: "😊", label: "Happy" },
        { emoji: "😢", label: "Sad" },
        { emoji: "😡", label: "Angry" },
        { emoji: "😴", label: "Tired" },
        { emoji: "😌", label: "Calm" },
    ];

    const handleMoodSubmit = () => {
        if (mood) {
            setSubmittedMood(mood);
            setMood("");          
        }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <h1 className={`text-5xl font-extrabold mb-6 text-center text-indigo-800 ${fugaz.className}`}>
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Mood Tracker
          </span>
        </h1>
        
        <p className="text-lg text-gray-700 max-w-xl text-center mb-8 mx-auto">
          Capture your emotional landscape in real-time. Your mood matters.
        </p>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
          {/* Quick Mood Selection */}
          <div className="mb-8">
            <h3 className="text-gray-600 font-medium mb-4 text-center">
              Quick Select
            </h3>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {quickMoods.map((moodItem, index) => (
                <button
                  key={index}
                  onClick={() => setMood(moodItem.label)}
                  className="p-2 rounded-xl bg-white hover:bg-indigo-50 transition-colors border border-indigo-100 flex flex-col items-center"
                >
                  <span className="text-3xl mb-1">{moodItem.emoji}</span>
                  <span className="text-xs font-medium text-gray-600">
                    {moodItem.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mood Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Or describe your mood in words..."
              className="w-full px-6 py-4 pr-20 border-2 border-indigo-200 rounded-full bg-white/50 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-lg"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMoodSubmit}
              disabled={!mood}
              className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              Track
            </motion.button>
          </div>
        </div>

        {submittedMood && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-8 p-6 bg-green-50/80 backdrop-blur-sm rounded-xl border border-indigo-200 text-center"
          >
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-indigo-800 mb-2">
              Mood Captured!
            </h2>
            <p className="text-gray-700">
              Current mood:{" "}
              <span className="font-semibold text-indigo-700">
                {submittedMood}
              </span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div> 
  )
}