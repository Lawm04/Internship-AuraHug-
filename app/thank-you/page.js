"use client"

import React from 'react'
import { Fugaz_One } from "next/font/google";
import { useRouter } from "next/navigation";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function page() {
    const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <h1 className={`text-4xl sm:text-5xl text-green-600 mb-4 ${fugaz.className}`}>
        Thank You! 💜
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Your message has been received. We'll get back to you as soon as possible.
      </p>
      <button
        onClick={() => router.push("/dashboard")}
        className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
      >
        Back to Home
      </button>
    </div>  )
}
