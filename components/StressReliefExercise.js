"use client";

import { Fugaz_One } from 'next/font/google';
import React from 'react'
import { useRouter } from 'next/navigation';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function StressReliefExercise() {
  const router = useRouter();
  
  return (
  <div className="bg-gray-50 font-sans leading-relaxed">

    {/* Categories Section */}
    <section className="py-12 px-6">
    <h2 className= {`text-3xl font-bold text-center mb-8 ${fugaz.className}` }>Categories of Exercises</h2>      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Breathing Exercises */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className={`text-2xl font-semibold mb-4 ${fugaz.className}`}>Breathing Exercises</h2>
          <p className="text-gray-700 mb-4">Techniques like 4-7-8 breathing and diaphragmatic breathing to help you calm down.</p>
          <button onClick={() => router.push("/breathing")}

          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Explore Breathing Exercises
          </button>
        </div>
        {/* Guided Meditations */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className={`text-2xl font-semibold mb-4 ${fugaz.className}`}>Guided Meditations</h3>
          <p className="text-gray-700 mb-4">Short audio or video sessions for mindfulness and relaxation.</p>
          <button onClick={() => router.push("/meditation")}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
            Explore Meditations
          </button>
        </div>
      </div>
    </section>

    {/* Featured Exercise */}
    <section className="py-12 px-6 bg-gray-100">
      <h2 className={`text-3xl font-bold text-center mb-8 ${fugaz.className}`}>Featured Exercise</h2>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto text-center">
        <h3 className={`text-2xl font-semibold mb-4 ${fugaz.className}`}>2-Minute Breathing Exercise</h3>
        <p className="text-gray-700 mb-6">Quickly relax with this simple breathing technique.</p>
        <button onClick={() => router.push("/bloom")}
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition">
          Start Now
        </button>
      </div>
    </section>
  </div>
    )
}
