"use client";

import { Fugaz_One } from 'next/font/google'
import React from 'react'
import Button from './Button';
import { useRouter } from 'next/navigation';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Contact() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/thank-you');
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 min-h-screen">
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src="images/floralbrain.jpg" 
          alt="Contact Us"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6">
        <h3 className={'text-2xl sm:text-3xl md:text-6xl ' + fugaz.className}>Contact</h3>

        <input
          className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-2 border border-solid border-indigo-400 rounded-full outline-none"
          placeholder="Your Name"
        />
        <input
          className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-2 border border-solid border-indigo-400 rounded-full outline-none"
          placeholder="Your Email"
        />
        <input
          className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-2 border border-solid border-indigo-400 rounded-full outline-none"
          placeholder="Subject"
        />
        <textarea
          className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-2 border border-solid border-indigo-400 rounded-lg outline-none"
          placeholder="Message"
          rows="4"
        ></textarea>

        <div className="max-w-[400px] w-full flex justify-center">
          <Button onClick={handleSubmit} text="Submit" dark />
        </div>
      </div>
    </div>
      )
}
