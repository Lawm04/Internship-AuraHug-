"use client";

import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calender from "./Calender";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const router = useRouter();
  const [moodData, setMoodData] = useState({});
  const [entries, setEntries] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;
    setUserEmail(email);

    const fetchMoodData = async () => {
      try {
        const res = await fetch(`/api/quickmood?email=${email}`);
        const data = await res.json();
        setMoodData(data.summary || {});
        setEntries(data.entries || []);
      } catch (err) {
        console.error("Failed to load mood data", err);
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
              backgroundColor: [
                "#A8E6CF",
                "#FF8B94",
                "#FFD3B6",
                "#F8BBD0",
                "#D1C4E9",
                "#B3CDE0",
              ],
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

  const today = new Date();
  const checkInDays = new Set(
    entries
      .filter((e) => {
        const d = new Date(e.date);
        return (today - d) / (1000 * 60 * 60 * 24) <= 6;
      })
      .map((e) => new Date(e.date).toDateString())
  );
  const checkInCount = checkInDays.size;
  const checkInPercent = Math.round((checkInCount / 7) * 100);

  return (
    <motion.div
      className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <section className="py-12 px-6">
        <motion.h5
          className={`text-2xl sm:text-3xl md:text-7xl text-center ${fugaz.className}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="textGradient">Welcome back! </span>Here's your{" "}
          <span className="textGradient">progress</span> today?
        </motion.h5>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Quick Mood Tracking</h3>
            <p className="text-gray-700 mb-4">
              Easily log your mood in seconds to recognize emotional patterns over time.
            </p>
            <button
              onClick={() => router.push("/moodtracking")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Start
            </button>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Daily Check-in</h3>
            <p className="text-gray-700 mb-4">
              Take a moment to reflect on your feelings, energy, and gratitude each day.
            </p>
            <button
              onClick={() => router.push("/daily")}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
            >
              Start
            </button>
          </motion.div>
        </motion.div>
      </section>

      <motion.div
        className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Mood Distribution</h3>
          {pieData ? (
            <Pie data={pieData} options={pieOptions} />
          ) : (
            <p className="text-gray-500">Loading mood chart...</p>
          )}
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Weekly Insights
          </h3>

          <motion.div
            className="relative w-full bg-indigo-100 rounded-full h-6 shadow flex items-center justify-center"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute bg-indigo-500 h-6 rounded-full left-0"
              style={{ width: `${checkInPercent}%` }}
            ></div>
            <span className="text-sm text-black font-semibold z-10">
              {checkInCount}/7 Check-ins this week
            </span>
          </motion.div>

          {moodData && Object.keys(moodData).length > 0 ? (
            Object.entries(moodData).map(([mood, count], i) => {
              const total = Object.values(moodData).reduce((sum, val) => sum + val, 0);
              const percent = Math.round((count / total) * 100);
              return (
                <motion.div
                  key={mood}
                  className="relative w-full bg-gray-100 rounded-full h-6 shadow"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div
                    className="absolute bg-red-400 h-6 rounded-full left-0"
                    style={{ width: `${percent}%` }}
                  ></div>
                  <span className="absolute inset-0 flex justify-center items-center text-sm text-black font-semibold z-10">
                    {mood}: {percent}%
                  </span>
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">Loading insights...</p>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Calender />
      </motion.div>
    </motion.div>
  );
}