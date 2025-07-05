"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { Howl } from 'howler';
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({ 
  subsets: ["latin"], 
  weight: '400', 
  display: 'swap' 
});

const ambientSounds = {
  rain: new Howl({ src: ['/sounds/rain.mp3'], loop: true }),
  waves: new Howl({ src: ['/sounds/waves.mp3'], loop: true }),
  forest: new Howl({ src: ['/sounds/forest.mp3'], loop: true })
};

export default function RelaxPage() {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [selectedSound, setSelectedSound] = useState('rain');
  const [soundInstance, setSoundInstance] = useState(null);

  useEffect(() => {
    let timer;

    if (isPlaying) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            setSessionCompleted(true);
            soundInstance?.stop();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isPlaying) {
      const sound = ambientSounds[selectedSound];
      sound.play();
      setSoundInstance(sound);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    soundInstance?.pause();
  };

  const handleRestart = () => {
    setTimeLeft(300);
    setIsPlaying(false);
    setSessionCompleted(false);
    soundInstance?.stop();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex flex-col items-center justify-center px-4 py-10 ${fugaz.variable}`}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-slate-200"
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text mb-8 font-fugaz">
          Daily Mindfulness
        </h1>
  
        {/* Mindfulness Video */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Mindfulness Video</h2>
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/inpok4MKVLM"
            title="Mindfulness Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          </div>
        </div>
  
        {/* Timer & Controls */}
        {!sessionCompleted ? (
          <>
            <div className="flex flex-col items-center mb-10">
              <div className="text-5xl md:text-6xl font-mono text-indigo-600 mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={isPlaying ? handlePause : handleStart}
                  className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white shadow-md"
                >
                  {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
                </button>
              </div>
            </div>
  
            {/* Nature Sounds */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Nature Sounds</h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(ambientSounds).map((sound) => (
                  <button
                    key={sound}
                    onClick={() => setSelectedSound(sound)}
                    className={`py-3 rounded-xl text-sm font-medium transition-all border shadow-sm ${
                      selectedSound === sound
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-gray-700'
                    }`}
                  >
                    {sound.charAt(0).toUpperCase() + sound.slice(1)}
                    {selectedSound === sound && <span className="ml-2">✓</span>}
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
            <div className="text-6xl mb-4 text-indigo-500">🌞</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-fugaz">
              Session Complete!
            </h2>
            <p className="text-gray-600 mb-6">Great job taking time for mindfulness today.</p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white flex items-center gap-2 mx-auto shadow-md"
            >
              <FaRedo />
              Start Again
            </button>
          </motion.div>
        )}
      </motion.div>
  
      <p className="text-gray-500 mt-8 text-center text-sm">
        Reconnect with your breath. Refresh your mind. 🌿
      </p>
    </div>
  );
  
}