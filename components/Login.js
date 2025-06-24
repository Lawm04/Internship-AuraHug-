"use client";

import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fugaz = Fugaz_One({ 
  subsets: ["latin"], 
  weight: '400' 
});

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.user.email);
        await router.push("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
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
        Log In
      </motion.h3>

      <motion.p
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
          You&#39;re one step away!
      </motion.p>

      <motion.input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[400px] px-3 py-2 border border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Email"
        required
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[400px] px-3 py-2 border border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Password"
        required
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      />

      {error && (
        <motion.p
          className="text-red-600 text-sm text-center max-w-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {error}
        </motion.p>
      )}

      <motion.div
        className="max-w-[400px] w-full flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button text="Submit" dark onClick={handleLogin} />
      </motion.div>

      <motion.p
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Don&#39;t have an account?{" "}
        <span
          className="text-indigo-600 cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </span>
      </motion.p>
    </motion.div>
  );
}
