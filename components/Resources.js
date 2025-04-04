"use client";

import React from 'react'
import { Fugaz_One } from 'next/font/google';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Resources() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <h1 className={`text-4xl font-bold text-center mb-10 ${fugaz.className}`}>
        Helpful Resources
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Stress & Mindfulness */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className={`text-2xl font-semibold mb-4 ${fugaz.className}`}>
            Stress & Mindfulness
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><a href="https://www.apa.org/topics/stress" target="_blank" className="text-blue-600 hover:underline">APA – Stress Management</a></li>
            <li><a href="https://www.health.harvard.edu/mind-and-mood/mindfulness-meditation" target="_blank" className="text-blue-600 hover:underline">Harvard – Mindfulness Meditation</a></li>
            <li><a href="https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858" target="_blank" className="text-blue-600 hover:underline">Mayo Clinic – Meditation Guide</a></li>
          </ul>
        </div>

        {/* Guided Meditation Platforms */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className={`text-2xl font-semibold mb-4 ${fugaz.className}`}>
            Guided Meditation Platforms
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><a href="https://insighttimer.com/" target="_blank" className="text-purple-600 hover:underline">Insight Timer</a></li>
            <li><a href="https://www.uclahealth.org/marc/mindful-meditations" target="_blank" className="text-purple-600 hover:underline">UCLA Mindful</a></li>
            <li><a href="https://www.youtube.com/user/Getsomeheadspace" target="_blank" className="text-purple-600 hover:underline">Headspace (YouTube)</a></li>
          </ul>
        </div>

        {/* Media & Sounds */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className={`text-2xl font-semibold mb-4 ${fugaz.className}`}>
            Media & Sounds
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><a href="https://freesound.org/" target="_blank" className="text-green-600 hover:underline">FreeSound – Meditation Audio</a></li>
            <li><a href="https://mixkit.co/free-stock-music/meditation/" target="_blank" className="text-green-600 hover:underline">Mixkit – Free Meditation Music</a></li>
            <li><a href="https://unsplash.com/" target="_blank" className="text-green-600 hover:underline">Unsplash – Relaxing Visuals</a></li>
          </ul>
        </div>

        {/* Mental Health Support */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className={`text-2xl font-semibold mb-4 ${fugaz.className}`}>
            Mental Health Support
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><a href="https://www.mhanational.org/" target="_blank" className="text-red-600 hover:underline">Mental Health America</a></li>
            <li><a href="https://www.befrienders.org/" target="_blank" className="text-red-600 hover:underline">Befrienders Worldwide</a></li>
            <li><a href="https://www.7cups.com/" target="_blank" className="text-red-600 hover:underline">7 Cups – Emotional Support</a></li>
          </ul>
        </div>
      </div>
    </div>  )
}
