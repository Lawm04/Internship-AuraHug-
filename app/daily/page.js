"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { Howl } from 'howler';
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-fugaz'
});

const ambientSounds = {
  rain: new Howl({ src: ['/sounds/rain.mp3'], loop: true }),
  waves: new Howl({ src: ['/sounds/waves.mp3'], loop: true }),
  forest: new Howl({ src: ['/sounds/forest.mp3'], loop: true })
};

export default function Page() {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [ambientSound, setAmbientSound] = useState(null);
  const [selectedSound, setSelectedSound] = useState('rain');

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            setSessionCompleted(true);
            ambientSound?.stop();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      ambientSounds[selectedSound]?.play();
      setAmbientSound(ambientSounds[selectedSound]);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    ambientSound?.pause();
  };

  const handleRestart = () => {
    setTimeLeft(300);
    setIsPlaying(false);
    setSessionCompleted(false);
    ambientSound?.stop();
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 ${fugaz.variable}`}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md border border-slate-200"
      >
        <h1 className={`text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 font-fugaz`}>
          Daily Mindfulness
        </h1>

        {!sessionCompleted ? (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="text-6xl font-mono text-purple-600 mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={isPlaying ? handlePause : handleStart}
                  className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all"
                >
                  {isPlaying ? (
                    <FaPause className="text-2xl" />
                  ) : (
                    <FaPlay className="text-2xl" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-gray-700 text-lg mb-2 font-medium">Ambient Sounds</h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(ambientSounds).map((sound) => (
                  <button
                    key={sound}
                    onClick={() => setSelectedSound(sound)}
                    className={`p-3 rounded-xl transition-all ${
                      selectedSound === sound
                        ? 'bg-purple-100 border-2 border-purple-300'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-gray-800 capitalize font-medium">
                      {sound}
                      {selectedSound === sound && (
                        <span className="ml-2 text-purple-600">✓</span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4 text-purple-600">🎉</div>
            <h2 className={`text-2xl font-bold text-gray-800 mb-4 font-fugaz`}>
              Session Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              Great job taking time for mindfulness today
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2 mx-auto"
            >
              <FaRedo />
              Start Again
            </button>
          </motion.div>
        )}
      </motion.div>

      <p className="text-gray-600 mt-8 text-center">
        Begin your daily practice with a 5-minute mindful session
      </p>
    </div>
  );
}