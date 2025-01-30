import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Button from './Button';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Signup() {
  return (
<div className="flex flex-col flex-1 justify-center items-center gap-4 ">
      <h3 className={' text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>Signup</h3>
      <input className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2  sm:py-2 border border-solid border-indigo-400 rounded-full outline-none" placeholder="Name"/>
      <input className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2  sm:py-2 border border-solid border-indigo-400 rounded-full outline-none" placeholder="Email"/>
      <input className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2  sm:py-2 border border-solid border-indigo-400 rounded-full outline-none" placeholder="Password"/>
      <div className="max-w-[400px] w-full flex justify-center">
          <Button text="Submit" dark />
        </div>
      <p className="text-center">Already have an account? <span className="text-indigo-600">Sign up</span></p>

    </div>   )
}
