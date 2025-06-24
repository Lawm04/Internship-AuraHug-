"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

const moods = [
  { emoji: "😊", label: "Happy", color: "from-yellow-400 to-amber-300" },
  { emoji: "😤", label: "Frustrated", color: "from-orange-500 to-red-400" },
  { emoji: "😴", label: "Tired", color: "from-blue-400 to-indigo-400" },
  { emoji: "🤯", label: "Overwhelmed", color: "from-purple-500 to-fuchsia-500",},
  { emoji: "💖", label: "Loved", color: "from-pink-500 to-rose-400" },
  { emoji: "😐", label: "Neutral", color: "from-gray-400 to-slate-400" },
];

export default function QuickMoodTracker() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [customNote, setCustomNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isNoteFocused, setIsNoteFocused] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!selected) return;
  
    try {
      const res = await fetch("/api/quickmood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selected.label,
          note: customNote,
          date: new Date().toISOString(),
          email: localStorage.getItem("userEmail"),
        }),
      });
  
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const errMsg = errData?.message || "Submission failed";
        console.error("Failed to save mood:", errMsg);
        setError(`Failed to save mood: ${errMsg}`);
        return;
      }
  
      await res.json().catch(() => null); // optional: use if response has no body
      setSubmitted(true);
      setError("");
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (error) {
      console.error("Error submitting mood:", error.message || error);
      setError(`Failed to save mood: ${error.message || "Submission failed"}`);
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-4 sm:p-6 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden"
      >
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-300 bg-red-800/20 border border-red-500/30 rounded">
            {error}
          </div>
        )}
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Quick Mood Log
          </motion.h1>
          <p className="text-slate-300 max-w-md mx-auto">
            Capture how you&aposre feeling right now with one tap
          </p>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 relative z-10">
          {moods.map((mood, idx) => (
            <motion.button
              key={idx}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center relative overflow-hidden ${
                selected?.label === mood.label
                  ? `border-white shadow-lg`
                  : "border-white/20 bg-white/5"
              }`}
              onClick={() => setSelected(mood)}
            >
              {/* Selected indicator */}
              {selected?.label === mood.label && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-80 z-0`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                />
              )}

              <div className="text-3xl mb-1 z-10">{mood.emoji}</div>
              <div className="text-sm font-medium z-10">{mood.label}</div>

              {selected?.label === mood.label && (
                <motion.div
                  className="absolute -bottom-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <FiCheckCircle className="text-lg" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Note Input */}
        <motion.div
          className={`relative mb-6 rounded-xl border-2 transition-all duration-300 ${
            isNoteFocused
              ? "border-purple-400 bg-white/10"
              : "border-white/20 bg-white/5"
          }`}
          animate={isNoteFocused ? { y: -5 } : { y: 0 }}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300">
            <FiEdit2 />
          </div>
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            onFocus={() => setIsNoteFocused(true)}
            onBlur={() => setIsNoteFocused(false)}
            placeholder="Add a quick note (optional)..."
            className="w-full pl-12 pr-4 py-3 bg-transparent placeholder-slate-400 focus:outline-none"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div className="relative z-10" whileHover={{ scale: 1.02 }}>
          <motion.button
            whileHover={{
              scale: selected ? 1.05 : 1,
              boxShadow: selected
                ? "0 10px 25px -5px rgba(192, 132, 252, 0.5)"
                : "none",
            }}
            whileTap={{ scale: selected ? 0.95 : 1 }}
            disabled={!selected}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              selected
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                : "bg-slate-700 cursor-not-allowed text-white/50"
            }`}
          >
            {selected ? (
              <>
                Log {selected.label} Mood
                <FiCheckCircle className="text-xl" />
              </>
            ) : (
              "Select a Mood"
            )}
          </motion.button>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 300 },
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-6 p-4 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-500/50 text-green-100 rounded-xl flex items-center gap-3 backdrop-blur-sm"
            >
              <motion.div
                className="flex-shrink-0"
                animate={{
                  rotate: [0, 15, -15, 15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <FiCheckCircle className="text-2xl text-green-300" />
              </motion.div>
              <div>
                <div className="font-semibold">Mood logged successfully!</div>
                <div className="text-sm text-green-200/80">
                  Your feeling has been recorded
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}