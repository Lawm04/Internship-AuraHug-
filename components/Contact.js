"use client";

import { Fugaz_One } from 'next/font/google';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Contact() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/thank-you');
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center gap-6 min-h-screen bg-white py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left Side: Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center p-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="images/floralbrain.jpg"
          alt="Contact Us"
          className="w-full max-w-md rounded-2xl shadow-xl border-4 border-purple-100"
        />
      </motion.div>

      {/* Right Side: Form */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center items-center gap-8 p-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3
            className={`text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent ${fugaz.className}`}
          >
            Contact Us
          </h3>
          <p className="text-purple-700 max-w-md">
            Have questions? Reach out to our wellness team
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-md space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input
            className="w-full px-5 py-3 duration-200 border-2 border-purple-200 rounded-full outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 placeholder:text-purple-300"
            placeholder="Your Name"
          />
          <input
            className="w-full px-5 py-3 duration-200 border-2 border-purple-200 rounded-full outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 placeholder:text-purple-300"
            placeholder="Your Email"
          />
          <input
            className="w-full px-5 py-3 duration-200 border-2 border-purple-200 rounded-full outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 placeholder:text-purple-300"
            placeholder="Subject"
          />
          <textarea
            className="w-full px-5 py-3 duration-200 border-2 border-purple-200 rounded-2xl outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 placeholder:text-purple-300"
            placeholder="Your Message"
            rows="4"
          ></textarea>

          <motion.div
            className="flex justify-center pt-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              Send Message
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}