"use client";

import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Signup successful");
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("An error occurred during signup");
    }
  };

  return (
    <motion.div
      className="flex flex-col flex-1 justify-center items-center gap-4 text-gray-800"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h3
        className={`text-4xl sm:text-5xl md:text-6xl text-indigo-800 ${fugaz.className}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Sign up
      </motion.h3>

      {error && (
        <motion.p
          className="text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      <motion.input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 py-2 border border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Name"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 py-2 border border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Email"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 py-2 border border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Password"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      />

      <motion.div
        className="max-w-[400px] w-full flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button text="Submit" dark onClick={handleSignup} />
      </motion.div>

      <motion.p
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Already have an account?{" "}
        <span
          className="text-indigo-600 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </motion.p>
    </motion.div>
  );
}