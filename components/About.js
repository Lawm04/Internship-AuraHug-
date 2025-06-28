"use client";

import { Fugaz_One } from 'next/font/google';
import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-blue-50 px-4 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent ${fugaz.className} `}
          >
            About AuraHug
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-indigo-400 to-blue-400 mx-auto rounded-full"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left Side: Text Content */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col gap-6 bg-white p-8 rounded-3xl shadow-lg border border-indigo-100"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-indigo-700 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to <strong className="text-indigo-800">AuraHug</strong> — your daily companion for tracking emotions, reflecting on your mood, and finding balance in your life. Our goal is to help you better understand yourself by making emotional wellness simple, beautiful, and approachable.
            </motion.p>
            
            <motion.p 
              className="text-indigo-700 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              At AuraHug, we believe everyone deserves a space to express and explore how they feel. Whether you&apos;re on a mental health journey or just trying to stay in tune with your moods, we&apos;re here to support you with a user-friendly, insightful experience.
            </motion.p>
            
            <motion.p 
              className="text-indigo-700 text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Built with love by a team passionate about mental well-being, creativity, and technology.
            </motion.p>

            <motion.div 
              className="mt-6 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {['Mindfulness', 'Wellness', 'Empathy', 'Support'].map((tag, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-2xl blur-lg opacity-30"></div>
              <Image
                src="/images/AuraHug.png"
                alt="About AuraHug"
                width={900} 
                height={900}
                className="w-full max-w-md rounded-2xl shadow-xl relative z-10 border-4 border-white"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 z-0"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 z-0"></div>
          </motion.div>
        </div>

        {/* Team section */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className={`text-3xl font-bold mb-6 text-indigo-800 ${fugaz.className}`}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Empathy', desc: 'Understanding your emotional journey with compassion' },
              { title: 'Simplicity', desc: 'Creating an intuitive experience for everyone' },
              { title: 'Privacy', desc: 'Respecting and protecting your personal data' }
            ].map((value, i) => (
              <motion.div 
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100"
                whileHover={{ y: -10, boxShadow: "0 20px 25px -15px rgba(99, 102, 241, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{value.title}</h3>
                <p className="text-indigo-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
