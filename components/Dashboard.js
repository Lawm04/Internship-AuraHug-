"use client";

import { Fugaz_One } from "next/font/google";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";


ChartJS.register(ArcElement, Tooltip, Legend);
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    "neutral": "🥴",
    happy: "😆",
    love: "💕",
    sad: "😭",
    cool: "😎",
  };

   // Pie chart data
   const pieData = {
    labels: ["Happy", "Sad", "Neutral"],
    datasets: [
      {
        data: [40, 30, 30], // Sample data percentages
        backgroundColor: ["#A8E6CF", "#FF8B94", "#B3CDE0"], 
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };


  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 ">
         <section className="py-12 px-6">
         <h5
        className={
          "text-2xl sm:text-3xl md:text-7xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">Welcome back! </span>Here's your <span className="textGradient">progress</span> today?
      </h5>       <div className="grid md:grid-cols-2 gap-6">
        {/* Breathing Exercises */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4">Quick Mood Tracking</h3>
          <p className="text-gray-700 mb-4">Techniques like 4-7-8 breathing and diaphragmatic breathing to help you calm down.</p>
          <button 
          onClick={()=> router.push("/moodtracking")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Start
          </button>
        </div>
        {/* Guided Meditations */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-4">Daily Check-in</h3>
          <p className="text-gray-700 mb-4">Short audio or video sessions for mindfulness and relaxation.</p>
          <button 
          onClick={()=> router.push("/daily")}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition" >
            Start
          </button>
        </div>
      </div>
      
    </section>

    <div className="flex flex-col md:flex-row gap-8 mt-8 bg-white rounded-lg shadow-md p-6">
  {/* Pie Chart Section */}
  <div className="w-full md:w-1/2 flex flex-col items-center">
    <h3 className="text-2xl font-semibold mb-4">Mood Distribution</h3>
    <Pie data={pieData} options={pieOptions} />
  </div>

  {/* Progress Bars Section */}
  <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
    <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">Weekly Insights</h3>
    
    {/* Green Progress Bar */}
    <div className="relative w-full bg-green-100 rounded-full h-6 shadow flex items-center justify-center">
      <div
        className="absolute bg-green-300 h-6 rounded-full left-0"
        style={{ width: "70%" }}
      ></div>
      <span className="text-sm text-white font-semibold z-10">Mood improved by: 70%</span>
    </div>
    
    {/* Red Progress Bar */}
    <div className="relative w-full bg-red-100 rounded-full h-6 shadow flex items-center justify-center">
      <div
        className="absolute bg-red-300 h-6 rounded-full left-0"
        style={{ width: "30%" }}
      ></div>
      <span className="text-sm text-white font-semibold z-10">Averaged Mood: 30%</span>
    </div>
    
    {/* Blue Progress Bar */}
    <div className="relative w-full bg-blue-100 rounded-full h-6 shadow flex items-center justify-center">
      <div
        className="absolute bg-blue-300 h-6 rounded-full left-0"
        style={{ width: "50%" }}
      ></div>
      <span className="text-sm text-white font-semibold z-10">3/7 check-ins completed this week: 50% </span>
    </div>
  </div>
</div>


      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.keys(moods).map((mood, moodIndex) => (
          <button className={'p-4 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-2 ' +
           (moodIndex === 4 ? "col-span-2 sm:col-span-1 " : " ")} key={moodIndex} >
            <p className=" text-4xl sm:text-5xl md:text-6xl ">{moods[mood]}</p>
            <p className={'text-indigo-500 ' + fugaz.className }>{mood}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
