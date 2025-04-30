"use client";

import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';


import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function page() {
  const [feeling, setFeeling] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodLevel, setMoodLevel] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const emojis = ['😃', '🙂', '😐', '😔', '😢'];

  const handleSubmit = () => {
    if (feeling.trim() !== "") {
      setSubmitted(true);
    }
    };

  return (
    <div className=" w-full min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-8">
      <h1 className={`text-5xl font-extrabold mb-6 text-center text-purple-700 ${fugaz.className}`}>
        Daily Check-in
      </h1>
      <p className="text-gray-600 max-w-2xl text-center mb-10 text-lg">
        Take a moment to pause and reflect. Your feelings are important.
      </p>

      {!submitted ? (
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg flex flex-col items-center gap-6">
          {/* Emoji Mood Selector */}
          <div className="text-center w-full">
            <p className="text-lg font-medium mb-2 text-gray-700">Choose your mood:</p>
            <div className="flex justify-center gap-4">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMood(index)}
                  className={`text-3xl transition transform hover:scale-110 ${
                    selectedMood === index ? "scale-125 border-2 border-purple-500 rounded-full" : ""
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Meter */}
          <div className="w-full">
            <label className="block mb-2 text-gray-700 text-center font-medium">Mood Level: {moodLevel}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={moodLevel}
              onChange={(e) => setMoodLevel(e.target.value)}
              className="w-full accent-purple-500"
            />
            <div className="h-3 bg-purple-200 rounded mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-purple-500"
                animate={{ width: `${(moodLevel / 10) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="How are you feeling today?"
            rows="5"
            className="w-full px-5 py-3 border border-purple-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 text-gray-700 resize-none"
          ></textarea>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold tracking-wide transition"
          >
            Submit Check-in
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center space-y-4">
          <h2 className="text-3xl font-bold text-green-600">Thank You! ✨</h2>
          <p className="text-gray-600 text-lg">You have successfully checked in.</p>
          <p className="text-purple-600">
            Mood: <span className="text-2xl">{selectedMood !== null ? emojis[selectedMood] : '😐'}</span>
          </p>
          <p className="text-gray-600">Level: {moodLevel}/10</p>
          <p className="text-gray-600">Reflection: “{feeling}”</p>
        </div>
      )}
    </div>
     )
}
