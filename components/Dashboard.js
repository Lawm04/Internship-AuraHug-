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

    // Fetch and schedule reminders
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

        {/* Reminders Section */}
        <motion.div
          className="bg-white p-7 rounded-2xl shadow-xl border border-indigo-100"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-indigo-50">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Scheduled Reminders
              </h3>
            </div>
            <motion.button
              onClick={() => router.push("/set-reminder")}
              className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2.5 rounded-xl hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Reminder
            </motion.button>
          </div>

          {reminders.length > 0 ? (
            <ul className="space-y-4 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-indigo-50 scrollbar-thumb-rounded-full">
              {reminders.map((reminder) => {
                const isPast = new Date(reminder.time) < new Date();
                return (
                  <motion.li
                    key={reminder._id}
                    className={`p-4 rounded-xl border-l-4 shadow-sm transition-all duration-300 group flex items-start
                      ${isPast
                        ? "bg-gray-50 border-gray-300 text-gray-500"
                        : "bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-400 text-indigo-700 hover:shadow-md"}`}
                    whileHover={{ x: 5 }}
                  >
                    <div className={`mr-3 p-2 rounded-lg ${isPast ? "bg-gray-200" : "bg-indigo-100"}`}>
                      {isPast ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium flex items-center ${isPast ? "line-through" : ""}`}>
                        {new Date(reminder.time).toLocaleString([], {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        {!isPast && (
                          <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <p className={`mt-1.5 ${isPast ? "text-gray-600" : "text-gray-800"}`}>{reminder.message}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center py-10 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-dashed border-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="text-xl font-medium text-indigo-800 mt-4">No reminders scheduled</h3>
              <p className="text-indigo-500 mt-2 text-center max-w-md">
                You don't have any upcoming reminders. Add a new one to get started.
              </p>
              <motion.button
                onClick={() => router.push("/set-reminder")}
                className="mt-4 text-indigo-700 font-medium hover:text-indigo-900 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                Create your first reminder
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Mood and Check-in Sections */}
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
              Reflect on your feelings, energy, and gratitude each day.
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

      {/* Mood Chart and Insights */}
      <motion.div
        className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div className="w-full md:w-1/2 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Mood Distribution</h3>
          {pieData ? (
            <Pie data={pieData} options={pieOptions} />
          ) : (
            <p className="text-gray-500">Loading mood chart...</p>
          )}
        </motion.div>

        <motion.div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Weekly Insights
          </h3>
          <div className="relative w-full bg-indigo-100 rounded-full h-6 shadow">
            <div
              className="absolute bg-indigo-500 h-6 rounded-full left-0"
              style={{ width: `${checkInPercent}%` }}
            ></div>
            <span className="absolute inset-0 flex justify-center items-center text-sm text-black font-semibold z-10">
              {checkInCount}/7 Check-ins this week
            </span>
          </div>
          {Object.entries(moodData).map(([mood, count], i) => {
            const total = Object.values(moodData).reduce((a, b) => a + b, 0);
            const percent = Math.round((count / total) * 100);
            return (
              <div
                key={mood}
                className="relative w-full bg-gray-100 rounded-full h-6 shadow"
              >
                <div
                  className="absolute bg-red-400 h-6 rounded-full left-0"
                  style={{ width: `${percent}%` }}
                ></div>
                <span className="absolute inset-0 flex justify-center items-center text-sm text-black font-semibold z-10">
                  {mood}: {percent}%
                </span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Calendar */}
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
