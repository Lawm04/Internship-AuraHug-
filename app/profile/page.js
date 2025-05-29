"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Fugaz_One } from "next/font/google";
import { useRouter } from 'next/navigation';
import { FiCamera, FiLogOut, FiArrowLeft } from 'react-icons/fi';

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error('Failed to fetch user data');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      // Add your image upload logic here
    };
    
    reader.onerror = () => setError('Failed to read file');
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6 flex items-center justify-center relative">
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          aria-label="Go back"
        >
          <FiArrowLeft className="text-lg" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-xl transition-all hover:shadow-2xl">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        //Avatar
        <div className="flex flex-col items-center mb-8">
          <div 
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            aria-label="Change profile picture"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center relative overflow-hidden">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-white text-4xl font-bold">
                  {user?.name?.[0]?.toUpperCase() || '?'}
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiCamera className="text-white text-2xl" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              aria-hidden="true"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading profile...</p>
        ) : user ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg transition hover:bg-gray-100">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="text-gray-800 font-medium">{user.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg transition hover:bg-gray-100">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
              aria-label="Log out"
            >
              <FiLogOut className="text-lg" />
              Log Out
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Failed to load profile</p>
        )}
      </div>
    </div>
  );
}