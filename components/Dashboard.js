"use client";

import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calender from "./Calender";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ensurePermission, notifyUser } from "@/app/utils/notifications";

ChartJS.register(ArcElement, Tooltip, Legend);

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const router = useRouter();
  const [moodData, setMoodData] = useState({});
  const [entries, setEntries] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;
    setUserEmail(email);
    ensurePermission();

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

    // Schedule reminders
    fetch(`/api/reminders?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reminders");
        return res.json();
      })
      .then((data) => {
        const remindersList = data?.reminders || [];
        setReminders(remindersList);

        remindersList.forEach((r) => {
          const when = new Date(r.time).getTime() - Date.now();
          if (when > 0) {
            setTimeout(() => notifyUser("Reminder", { body: r.message }), when);
          }
        });
      })
      .catch((err) => console.error("Failed loading reminders:", err));
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
          className="bg-white p-7 rounded-xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center mb-5 pb-2 border-b border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
              Scheduled Reminders
            </h3>
            
            <button
              onClick={() => router.push("/set-reminder")}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add Reminder
            </button>
          </div>

          {reminders.length > 0 ? (
            <ul className="space-y-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50 scrollbar-thumb-rounded-full">
              {reminders.map((reminder) => (
                <motion.li
                  key={reminder._id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-md mr-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
                        {new Date(reminder.time).toLocaleString([], {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <p className="mt-1 text-gray-700">{reminder.message}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-300 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <p className="text-gray-500 text-lg font-medium">
                No upcoming reminders
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Add a new reminder to get started
              </p>
            </div>
          )}
        </motion.div>

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
              Easily log your mood in seconds to recognize emotional patterns
              over time.
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
              Take a moment to reflect on your feelings, energy, and gratitude
              each day.
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
              const total = Object.values(moodData).reduce(
                (sum, val) => sum + val,
                0
              );
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
