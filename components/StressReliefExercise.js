"use client";

import { Fugaz_One } from "next/font/google";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiActivity, FiHeadphones, FiClock, FiLock, FiBarChart2 } from "react-icons/fi";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function StressReliefExercise() {
  const router = useRouter();

  return (
    <div className={`min-h-screen bg-white font-sans ${fugaz.variable}`}>
      {/* Categories Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-4xl md:text-5xl font-bold text-center mb-12 text-indigo-800 ${fugaz.className}`}
        >
          Stress Relief Toolkit
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Breathing Exercises Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-2xl shadow-md border border-indigo-100 hover:border-indigo-300 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <FiActivity className="text-3xl text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-indigo-800">
                Breathing Mastery
              </h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Harness ancient techniques like 4-7-8 rhythm and diaphragmatic
              flow to find your calm center.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/bloom")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-semibold text-white hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Begin Breathwork
            </motion.button>
          </motion.div>

          {/* Guided Meditations Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-2xl shadow-md border border-indigo-100 hover:border-indigo-300 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <FiHeadphones className="text-3xl text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-indigo-800">
                Mindful Sessions
              </h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Immerse in curated audio journeys blending mindfulness, nature
              sounds, and binaural beats.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/relax")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-semibold text-white hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Start Meditation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Mental Quiz Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 -right-10 w-72 h-72 bg-indigo-200 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-10 -left-10 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-white rounded-3xl border border-indigo-100 shadow-xl backdrop-blur-sm"
          >
            <motion.div
              className="mb-6 mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg"
              animate={{
                rotate: [0, 5, -5, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <span className="text-5xl">🧠</span>
            </motion.div>

            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
                Mental Wellness Check
              </h2>
              <p className="text-gray-700 mb-6 text-lg max-w-2xl mx-auto leading-relaxed">
                Take a quick, confidential assessment to gain insights into your
                emotional well-being and receive personalized resources.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/mentalcheck")}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-bold text-white hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                Start Assessment
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </motion.button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FiClock className="text-indigo-500" />
                <span>Only 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <FiLock className="text-indigo-500" />
                <span>Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <FiBarChart2 className="text-indigo-500" />
                <span>Personalized insights</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
