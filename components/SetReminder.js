"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetReminder() {
  const router = useRouter(); 
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email || !message || !time) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, time }),
      });

      if (res.ok) {
        alert("Reminder set successfully!");
        setMessage("");
        setTime("");
        router.push('/dashboard'); 
      } else {
        alert("Failed to set reminder.");
      }
    } catch (error) {
      console.error("Error setting reminder:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Set Reminder</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Reminder message"
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Add Reminder
      </button>
    </div>
  );
}