import { Fugaz_One } from 'next/font/google';
import React from 'react'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });


export default function StressReliefExercise() {
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Explore Breathing Exercises
          </button>
        </div>
        {/* Guided Meditations */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className={`text-2xl font-semibold mb-4 ${fugaz.className}`}>Guided Meditations</h3>
          <p className="text-gray-700 mb-4">Short audio or video sessions for mindfulness and relaxation.</p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
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
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition">
          Start Now
        </button>
      </div>
    </section>

    {/* Interactive Tools Section */}
    <section className="py-12 px-6">
      <h2 className={`text-3xl font-bold text-center mb-8 ${fugaz.className}`}>Interactive Tools</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Breathing Timer */}
        <div className="p-6 rounded-xl bg-gradient-to-tr from-blue-100 to-purple-200 shadow-lg relative overflow-hidden">
          <h3 className={`text-xl font-bold mb-4 ${fugaz.className}`}>Breathing Timer</h3>
          <p className="text-gray-700 mb-6">Follow the visual timer to guide your breathing. Inhale, hold, and exhale with ease.</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-600"></div>
            </div>
          </div>
        </div>

        {/* Meditation Player */}
        <div className="p-6 rounded-xl bg-gradient-to-tr from-orange-100 to-yellow-200 shadow-lg relative">
          <h3 className={`text-xl font-bold mb-4 ${fugaz.className}`}>Meditation Player</h3>
          <p className="text-gray-700 mb-6">Relax with guided meditation sessions. Close your eyes and press play.</p>
          <div className="bg-white rounded-lg shadow-inner p-4 relative">
            <p className="text-yellow-800">"Calm and Focus"</p>
            <audio controls className="w-full mt-2">
              <source src="your-meditation-audio.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>


  </div>
    )
}
