"use client";

import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Button from './Button';
import Calender from './Calender';
import { useRouter } from 'next/navigation';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Hero() {
  const router = useRouter();

  return (
    <div className='py-4 md:py-10 flex flex-col gap-4 sm:gap-8'>
      <h1 className={'text-5xl sm:text-text-6xl md:text-7xl text-center ' + fugaz.className}>
        <span className='textGradient'>AuraHug</span> helps you track your <span className='textGradient'>mood!</span> </h1>

        <p className='text-lg sm:text-xl md:text-2xl text-center
        w-full mx-auto max-w-[600px]'>Create your mood record and see how you feel on <span className='font-semibold '>ever day of every year</span></p>

        <div className='grid grid-cols-2 gap-4 w-fit mx-auto '>
           <Button onClick={() => router.push('/signup')} text="Sign up" />
           <Button onClick={() => router.push('/login')} text="Login" dark/>

        </div>
        <Calender />    
    </div>
     
  )
}
