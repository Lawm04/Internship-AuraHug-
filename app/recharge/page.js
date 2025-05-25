"use client";

import React, { useState, useEffect } from "react";
import { Fugaz_One } from "next/font/google";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const sound = new Howl({
  src: ["/sounds/nature.wav"],
  loop: true,
  volume: 0.5,
});

export default function InstantRecharge() {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsPlaying(false);
            setCompleted(true);
            sound.stop();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const startSession = () => {
    setIsPlaying(true);
    setCompleted(false);
    sound.play();
  };

  const pauseSession = () => {
    setIsPlaying(false);
    sound.pause();
  };

  const restartSession = () => {
    setTimeLeft(300);
    setIsPlaying(false);
    setCompleted(false);
    sound.stop();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-100 to-blue-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
      >
        <h1 className={`text-4xl font-bold text-emerald-600 mb-4 ${fugaz.className}`}>
          Instant Recharge
        </h1>
        <p className="text-gray-600 mb-6">
          Reset your nervous system with our 5-minute nature immersion experience.
        </p>

        {!completed ? (
          <>
            <div className="text-6xl font-mono text-emerald-500 mb-6">{formatTime(timeLeft)}</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={isPlaying ? pauseSession : startSession}
                className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>
              <button
                onClick={restartSession}
                className="p-4 rounded-full bg-slate-300 hover:bg-slate-400 text-slate-800"
              >
                <FaRedo size={20} />
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mt-4"
          >
            <div className="text-5xl mb-3">🌿</div>
            <h2 className="text-xl font-bold text-emerald-600 mb-2">Session Complete</h2>
            <p className="text-gray-600">You’ve just completed your recharge. Well done!</p>
            <button
              onClick={restartSession}
              className="mt-6 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              Start Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
