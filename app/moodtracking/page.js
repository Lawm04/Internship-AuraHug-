"use client";

import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤯", label: "Overwhelmed" },
  { emoji: "💖", label: "Loved" },
  { emoji: "😐", label: "Neutral" },
];

export default function QuickMoodTracker() {
  const [selected, setSelected] = useState(null);
  const [customNote, setCustomNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [moodData, setMoodData] = useState(null);

  const handleSubmit = async () => {
    if (!selected) return;
  
    try {
      const res = await fetch("/api/quickmood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: selected.label,
          note: customNote,
          date: new Date(),
        }),
      });
  
      if (!res.ok) {
        const errData = await res.json();
        console.error("Failed to save mood:", errData.message);
        return;
      }
  
      setSubmitted(true);
      setTimeout(() => {
        setSelected(null);
        setCustomNote("");
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting mood:", error);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-800 p-6 text-white">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-semibold text-center mb-6">Quick Mood Log</h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {moods.map((mood, idx) => (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              key={idx}
              className={`p-4 rounded-2xl border transition ${
                selected?.label === mood.label
                  ? "bg-purple-500 border-purple-700"
                  : "bg-white/5 border-white/20"
              }`}
              onClick={() => setSelected(mood)}
            >
              <div className="text-3xl mb-1">{mood.emoji}</div>
              <div className="text-sm font-medium">{mood.label}</div>
            </motion.button>
          ))}
        </div>

        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          value={customNote}
          onChange={(e) => setCustomNote(e.target.value)}
          placeholder="Add a quick note (optional)..."
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 mb-6"
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          disabled={!selected}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            selected
              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
              : "bg-gray-500 cursor-not-allowed text-white/70"
          }`}
        >
          Log Mood
        </motion.button>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 bg-green-500/20 border border-green-500 text-green-200 rounded-xl flex items-center gap-2"
            >
              <FiCheckCircle className="text-lg" />
              <span>Your mood has been logged!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
