"use client"

import React from 'react'
import { Fugaz_One } from "next/font/google";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });


export default function page() {
    const meditations = [
        {
          title: "Mindful Breathing",
          type: "audio",
          source: "/audio/breathing.mp3",
          duration: "5 min",
        },
        {
          title: "Body Scan Relaxation",
          type: "audio",
          source: "/audio/body-scan.mp3",
          duration: "10 min",
        },
        {
          title: "Morning Motivation",
          type: "video",
          source: "https://www.youtube.com/embed/ZToicYcHIOU",
          duration: "7 min",
        },
        {
          title: "Evening Calm",
          type: "video",
          source: "https://www.youtube.com/embed/1vx8iUvfyCY",
          duration: "15 min",
        },
      ];

  return (
 <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl sm:text-5xl font-bold text-center text-indigo-600 mb-6 ${fugaz.className}`}>
          Guided Meditations
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore audio and video sessions for mindfulness and relaxation. Choose one to reset your mind and body.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {meditations.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h3 className={`text-xl font-semibold mb-2 ${fugaz.className}`}>{item.title}</h3>
              <p className="text-gray-500 mb-4">{item.duration}</p>
              {item.type === "audio" ? (
                <audio controls className="w-full">
                  <source src={item.source} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full h-full rounded-md"
                    src={item.source}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>  )
}
