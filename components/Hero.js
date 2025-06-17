"use client";

import { Fugaz_One } from 'next/font/google';
import React from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const fugaz = Fugaz_One({ 
  subsets: ["latin"], 
  weight: '400' 
});

export default function Hero() {
  const router = useRouter();

  return (
    <motion.div
      className='py-4 md:py-10 flex flex-col gap-4 sm:gap-8'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className='textGradient'>AuraHug</span> helps you track your{" "}
        <span className='textGradient'>mood!</span>
      </motion.h1>

      <motion.p
        className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Create your mood record and see how you feel on{" "}
        <span className='font-semibold'>every day of every year</span>
      </motion.p>

      <motion.div
        className='grid grid-cols-2 gap-4 w-fit mx-auto'
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.4 }}
        >
          <Button onClick={() => router.push('/signup')} text="Sign up" />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.4 }}
        >
          <Button onClick={() => router.push('/login')} text="Login" dark />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
