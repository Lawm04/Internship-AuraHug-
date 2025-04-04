"use client";

import { Fugaz_One } from 'next/font/google';
import React from 'react'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });


export default function About() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 min-h-screen px-4 sm:px-8 py-12">
      {/* Left Side: Text Content */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h3 className={`text-2xl sm:text-3xl md:text-6xl ${fugaz.className}`}>
          About Us
        </h3>
        <p className="text-gray-700 text-sm sm:text-base">
          Welcome to <strong>AuraHug</strong> — your daily companion for tracking emotions, reflecting on your mood, and finding balance in your life. Our goal is to help you better understand yourself by making emotional wellness simple, beautiful, and approachable.
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          At AuraHug, we believe everyone deserves a space to express and explore how they feel. Whether you're on a mental health journey or just trying to stay in tune with your moods, we're here to support you with a user-friendly, insightful experience.
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          Built with love by a team passionate about mental well-being, creativity, and technology.
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src="images/about.jpg" // Replace with your actual image path
          alt="About AuraHug"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}
