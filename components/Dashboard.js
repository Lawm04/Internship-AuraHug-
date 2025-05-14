"use client";

import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const router = useRouter();
  const [moodData, setMoodData] = useState(null);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const res = await fetch("/api/mood");
        const data = await res.json();
        setMoodData(data);
      } catch (err) {
        console.error("Failed to load mood data ", err);
      }
    };
    fetchMoodData();
  }, []);

  const pieData =
    moodData && Object.keys(moodData).length > 0
      ? {
          labels: Object.keys(moodData),
          datasets: [
            {
              data: Object.values(moodData),
              backgroundColor: ["#A8E6CF", "#FF8B94", "#B3CDE0"],
              borderWidth: 1,
            },
          ],
        }
      : null;

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <section className="py-12 px-6">
        <h5
          className={
            "text-2xl sm:text-3xl md:text-7xl text-center " + fugaz.className
          }
        >
          <span className="textGradient">Welcome back! </span>Here's your{" "}
          <span className="textGradient">progress</span> today?
        </h5>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Breathing Exercises */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Quick Mood Tracking</h3>
            <p className="text-gray-700 mb-4">
              Easily log your mood in seconds to recognize emotional patterns
              over time.
            </p>
            <button
              onClick={() => router.push("/moodtracking")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Start
            </button>
          </div>

          {/* Guided Meditations */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Daily Check-in</h3>
            <p className="text-gray-700 mb-4">
              Take a moment to reflect on your feelings, energy, and gratitude
              each day.
            </p>
            <button
              onClick={() => router.push("/daily")}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              Start
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-8 mt-8 bg-white rounded-lg shadow-md p-6">
        {/* Pie Chart Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Mood Distribution</h3>
          {pieData ? (
            <Pie data={pieData} options={pieOptions} />
          ) : (
            <p className="text-gray-500">Loading mood chart...</p>
          )}
        </div>

        {/* Progress Bars Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Weekly Insights
          </h3>

          {/* Green Progress Bar */}
          <div className="relative w-full bg-green-100 rounded-full h-6 shadow flex items-center justify-center">
            <div
              className="absolute bg-green-300 h-6 rounded-full left-0"
              style={{ width: "70%" }}
            ></div>
            <span className="text-sm text-white font-semibold z-10">
              Mood improved by: 70%
            </span>
          </div>

          {/* Red Progress Bar */}
          <div className="relative w-full bg-red-100 rounded-full h-6 shadow flex items-center justify-center">
            <div
              className="absolute bg-red-300 h-6 rounded-full left-0"
              style={{ width: "30%" }}
            ></div>
            <span className="text-sm text-white font-semibold z-10">
              Averaged Mood: 30%
            </span>
          </div>

          {/* Blue Progress Bar */}
          <div className="relative w-full bg-blue-100 rounded-full h-6 shadow flex items-center justify-center">
            <div
              className="absolute bg-blue-300 h-6 rounded-full left-0"
              style={{ width: "50%" }}
            ></div>
            <span className="text-sm text-white font-semibold z-10">
              3/7 check-ins completed this week: 50%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
