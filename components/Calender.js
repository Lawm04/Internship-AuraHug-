"use client";
import React from 'react'
import { useState } from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";


export default function Calender() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">My Mood Calendar</h1>

      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm">
        <Calendar
          onChange={setValue}
          value={value}
          className="!border-none !w-full"
          tileClassName={({ date, view }) => 
            `rounded-lg transition-all hover:bg-purple-200/50
            ${value.toDateString() === date.toDateString() 
              ? '!bg-gradient-to-br from-purple-500 to-blue-500 !text-white' 
              : 'bg-white/30'}
            ${view === 'month' && date.getMonth() !== value.getMonth() 
              ? 'text-gray-400' : 'text-gray-700'}`
          }
          navigationLabel={({ date }) => (
            <span className="text-purple-700 font-semibold">
              {format(date, 'MMMM yyyy')}
            </span>
          )}
          formatShortWeekday={(locale, date) => 
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
          }
          // Remove tileContent to prevent duplicate numbers
        />
      </div>

      <div className="mt-6 px-4 py-2 bg-purple-100 rounded-full">
        <p className="text-lg text-purple-700 font-medium">
          Selected Date: <span className="text-blue-600">{format(value, "PPP")}</span>
        </p>
      </div>
    </div>
      )
}
