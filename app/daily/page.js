"use client";

import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import { motion } from "framer-motion";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function page() {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(5);
  const [gratitudes, setGratitudes] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);

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
    if (mood !== null && gratitudes.some((g) => g.trim() !== "")) {
      try {
        const res = await fetch("/api/mood", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mood: moods[mood].label,
            energy,
            gratitudes,
            email: "yexlawmveung@gmail.com",
          }),
        });

        const result = await res.json();
        if (res.ok) {
          setSubmitted(true);
        } else {
          console.error("Failed to save:", result.message);
        }
      } catch (err) {
        console.error("Error saving mood:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
        <h1 className={`text-4xl text-center text-purple-700 font-bold mb-6 ${fugaz.className}`}>
          Daily Check-In
        </h1>

        {!submitted ? (
          <div className="space-y-8">
            {/* Mood */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">How are you feeling today?</h2>
              <div className="flex gap-3">
                {moods.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMood(idx)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      mood === idx ? "bg-purple-200" : "bg-gray-100"
                    }`}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <p className="text-sm">{m.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Energy level</h2>
              <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-center text-purple-700 font-medium mt-2">Energy: {energy}/10 ⚡</p>
            </div>

            {/* Gratitude */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">What are you grateful for today?</h2>
              <div className="space-y-3">
                {gratitudes.map((g, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Gratitude #${i + 1}`}
                    value={g}
                    onChange={(e) => handleGratitudeChange(i, e.target.value)}
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition"
              disabled={mood === null}
            >
              Complete Check-In
            </button>
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
