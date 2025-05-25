"use client";

import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function DailyCheckIn() {
  const router = useRouter();
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(5);
  const [gratitudes, setGratitudes] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Anxious", emoji: "😰" },
    { label: "Calm", emoji: "🧘" },
    { label: "Excited", emoji: "🤩" },
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

    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: moods[mood].label,
          energy,
          gratitudes,
          email: "yexlawmveung@gmail.com",
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8 relative">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          aria-label="Return to dashboard"
        >
          <FiArrowLeft className="text-lg" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
        <h1 className={`text-4xl text-center text-purple-700 font-bold mb-6 ${fugaz.className}`}>
          Daily Check-In
        </h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        {!submitted ? (
          <div className="space-y-8">
            {/* Mood Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">How are you feeling today?</h2>
              <div className="flex flex-wrap gap-3">
                {moods.map((m, idx) => (
                  <motion.button
                    key={m.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMood(idx)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      mood === idx ? "bg-purple-200" : "bg-gray-100"
                    }`}
                    aria-label={`Select ${m.label} mood`}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <p className="text-sm">{m.label}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Energy Level</h2>
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="w-full accent-purple-600"
                aria-label="Select energy level"
              />
              <p className="text-center text-purple-700 font-medium mt-2">
                Energy: {energy}/10 ⚡
              </p>
            </div>

            {/* Gratitude Inputs */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                What are you grateful for today?
              </h2>
              <div className="space-y-3">
                {gratitudes.map((g, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="w-full"
                  >
                    <input
                      type="text"
                      placeholder={`Gratitude #${i + 1}`}
                      value={g}
                      onChange={(e) => handleGratitudeChange(i, e.target.value)}
                      className="w-full px-4 py-2 border border-purple-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                      aria-label={`Enter gratitude ${i + 1}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={mood === null}
              className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit daily check-in"
            >
              Complete Check-In
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6"
          >
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-purple-700">Check-in Complete!</h2>
            <p className="text-gray-600">Your mood and gratitude are recorded. See you tomorrow!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}