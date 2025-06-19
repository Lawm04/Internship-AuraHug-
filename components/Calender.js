"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

export default function Calender() {
  const [value, setValue] = useState(new Date());
  const [emotions, setEmotions] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(null);

  const emojiOptions = ["😊", "😢", "😠", "😴", "😍", "😎", "🤔", "😇", "😭", "🥳"];

  const handleDayClick = (date) => {
    setValue(date);
    setPickerDate(format(date, "yyyy-MM-dd"));
    setShowPicker(true);
  };

  const handleEmojiSelect = (emoji) => {
    if (pickerDate) {
      setEmotions((prev) => ({ ...prev, [pickerDate]: emoji }));
      setShowPicker(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-8 relative">
      <h1 className="text-4xl font-bold text-purple-500 mb-6">
        My Mood Calendar
      </h1>

      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-sm">
        <Calendar
          onChange={setValue}
          value={value}
          onClickDay={handleDayClick}
          className="!border-none !w-full"
          tileContent={({ date }) => {
            const dateKey = format(date, "yyyy-MM-dd");
            return (
              <div className="text-xl">
                {emotions[dateKey] ? emotions[dateKey] : ""}
              </div>
            );
          }}
          tileClassName={({ date, view }) =>
            `rounded-lg transition-all hover:bg-purple-200/50
            ${value.toDateString() === date.toDateString()
              ? '!bg-gradient-to-br from-purple-300 to-blue-300 !text-white'
              : 'bg-white/30'}
            ${view === 'month' && date.getMonth() !== value.getMonth()
              ? 'text-gray-400'
              : 'text-gray-700'}`
          }
          navigationLabel={({ date }) => (
            <span className="text-purple-500 font-semibold">
              {format(date, "MMMM yyyy")}
            </span>
          )}
          formatShortWeekday={(locale, date) =>
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]
          }
        />
      </div>

      <div className="mt-6 px-4 py-2 bg-purple-100 rounded-full">
        <p className="text-lg text-purple-400 font-medium">
          Selected Date:{" "}
          <span className="text-blue-600">{format(value, "PPP")}</span>{" "}
          {emotions[format(value, "yyyy-MM-dd")]
            ? `→ Mood: ${emotions[format(value, "yyyy-MM-dd")]}`
            : ""}
        </p>
      </div>

      {showPicker && (
        <div className="fixed bottom-10 bg-white border border-gray-300 rounded-xl shadow-lg p-4 grid grid-cols-5 gap-3 z-50">
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              className="text-2xl hover:scale-125 transition-transform"
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
