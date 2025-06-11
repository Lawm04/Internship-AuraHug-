"use client";

import React, { useState, useEffect } from "react";
import { Fugaz_One } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiHeart, FiZap, FiCheck } from "react-icons/fi";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function DailyCheckIn() {
  const router = useRouter();
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(5);
  const [gratitudes, setGratitudes] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const moods = [
    { label: "Happy", emoji: "😊", color: "from-yellow-400 to-amber-300" },
    { label: "Sad", emoji: "😢", color: "from-blue-400 to-indigo-300" },
    { label: "Anxious", emoji: "😰", color: "from-gray-400 to-slate-300" },
    { label: "Calm", emoji: "🧘", color: "from-teal-400 to-emerald-300" },
    { label: "Excited", emoji: "🤩", color: "from-pink-500 to-rose-400" },
  ];

  const handleGratitudeChange = (i, value) => {
    const updated = [...gratitudes];
    updated[i] = value;
    setGratitudes(updated);
  };

  const handleSubmit = async () => {
    if (mood === null || !gratitudes.some((g) => g.trim() !== "")) {
      setError("Please select a mood and enter at least one gratitude");
      return;
    }

    const email =
      typeof window !== "undefined"
        ? localStorage.getItem("userEmail")
        : null;

    if (!email) {
      setError("You must be logged in to submit your mood.");
      return;
    }

    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: moods[mood].label,
          energy,
          gratitudes,
          email,
        }),
      });

      if (!res.ok) throw new Error("Failed to save check-in");

      setSubmitted(true);
      setError("");
    } catch (err) {
      console.error("Error saving mood:", err);
      setError(err.message || "Failed to save check-in");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-8 relative">

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50 backdrop-blur-sm"
      >
        <div className="text-center mb-8">
          <motion.h1 
            className={`text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 font-bold mb-2 ${fugaz.className}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Daily Check-In
          </motion.h1>
          <p className="text-gray-500 max-w-md mx-auto">Track your mood and gratitude to build emotional awareness</p>
        </div>

        {error && (
          <motion.div 
            className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.div>
        )}

        {!submitted ? (
          <div className="space-y-10">
            {/* Mood Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">How are you feeling today?</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {moods.map((m, idx) => (
                  <motion.button
                    key={m.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMood(idx)}
                    className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                      mood === idx 
                        ? `bg-gradient-to-br ${m.color} text-white shadow-lg` 
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                    } w-24 h-24`}
                    aria-label={`Select ${m.label} mood`}
                  >
                    <span className="text-3xl mb-2">{m.emoji}</span>
                    <p className="text-sm font-medium">{m.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <FiZap className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Energy Level</h2>
              </div>
              <div className="px-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-500 [&::-webkit-slider-thumb]:shadow-lg"
                  aria-label="Select energy level"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full">
                    <FiZap className="text-yellow-500 mr-2" />
                    <span className="text-lg font-bold text-purple-700">
                      {energy}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gratitude Inputs */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-pink-100 p-2 rounded-full">
                  <FiHeart className="w-5 h-5 text-pink-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  What are you grateful for today?
                </h2>
              </div>
              <div className="space-y-4">
                {gratitudes.map((g, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400">
                      <FiHeart />
                    </div>
                    <input
                      type="text"
                      placeholder={`I'm grateful for... #${i + 1}`}
                      value={g}
                      onChange={(e) => handleGratitudeChange(i, e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                      aria-label={`Enter gratitude ${i + 1}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.div 
              className="pt-4"
              whileHover={{ scale: 1.01 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={mood === null}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                aria-label="Submit daily check-in"
              >
                Complete Check-In
                <FiCheck className="text-xl" />
              </motion.button>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }
            }}
            className="text-center py-10 space-y-6"
          >
            <motion.div 
              className="text-7xl"
              animate={{ 
                rotate: [0, 15, -15, 15, 0],
                y: [0, -20, 0, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Check-in Complete!
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Your mood and gratitude are recorded. Great job practicing mindfulness!
            </p>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <FiArrowLeft />
                Return to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}