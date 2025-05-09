"use client";

import React, { useEffect, useState } from 'react';
import { Fugaz_One } from "next/font/google";
import { useRouter } from 'next/navigation';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [])

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <h1 className={`text-4xl font-bold text-purple-700 mb-6 text-center ${fugaz.className}`}>
          Your Profile
        </h1>

        {user ? (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 font-medium">Name:</p>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Email:</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Joined:</p>
              <p className="text-lg">{user.joined || "N/A"}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition"
            >
              Log Out
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  )
}
