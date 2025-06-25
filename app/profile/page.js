"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Fugaz_One } from "next/font/google";
import { useRouter } from 'next/navigation';
import { FiCamera, FiLogOut, FiArrowLeft } from 'react-icons/fi';
import Image from "next/image";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const fileInputRef = useRef(null);

  //Fetch user profile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users?email=${email}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setForm({ name: data.name, email: data.email });
          setPreviewImage(data.profileImage || null);
        } else {
          setError(data.message || "Failed to fetch user");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Error fetching user: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.onerror = () => setError("Failed to read file");
    reader.readAsDataURL(file);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setForm({ name: user.name, email: user.email });
    setPreviewImage(user.profileImage || null);
    setImageFile(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await fetch("/api/users/update", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUser({
          ...user,
          name: form.name,
          email: form.email,
          profileImage: data.profileImage || previewImage,
        });
        setEditMode(false);
        setImageFile(null);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
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

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div
            className={`relative group ${editMode ? "cursor-pointer" : ""}`}
            onClick={() => editMode && fileInputRef.current?.click()}
            role={editMode ? "button" : undefined}
            tabIndex={editMode ? 0 : -1}
            onKeyPress={(e) => {
              if (editMode && e.key === 'Enter') fileInputRef.current?.click();
            }}
            aria-label="Change profile picture"
            style={{ opacity: editMode ? 1 : 0.85 }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center relative overflow-hidden">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-white text-4xl font-bold">
                  {user?.name?.[0]?.toUpperCase() || '?'}
                </span>
              )}
              {editMode && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCamera className="text-white text-2xl" />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              aria-hidden="true"
              disabled={!editMode}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading profile...</p>
        ) : user ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg transition hover:bg-gray-100">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                    autoFocus
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{user.name}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg transition hover:bg-gray-100">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{user.email}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {editMode ? (
                <>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 transition-all"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition-all"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex-1 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all"
                >
                  Edit Profile
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FiLogOut className="text-lg" />
                Log Out
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-500">Failed to load profile</p>
        )}
      </div>
    </div>
  );
}