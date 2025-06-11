"use client";

import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.user.email); // store for profile use
        await router.push("/dashboard");
      } else {
        console.warn("Login failed:", data.message);
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        Log In
      </h3>
      <p className="text-center">You're one step away!</p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[400px] px-3 py-2 border border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[400px] px-3 py-2 border border-indigo-400 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Password"
        required
      />

      {error && (
        <p className="text-red-600 text-sm text-center max-w-[400px]">{error}</p>
      )}

      <div className="max-w-[400px] w-full flex justify-center">
        <Button text="Submit" dark onClick={handleLogin} />
      </div>

      <p className="text-center">
        Don't have an account?{" "}
        <span
          className="text-indigo-600 cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}
