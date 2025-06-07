"use client";

import { Fugaz_One } from "next/font/google";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={" text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        Signup
      </h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2  sm:py-2 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2  sm:py-2 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2  sm:py-2 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="Password"
      />
      <div className="max-w-[400px] w-full flex justify-center">
        <Button text="Submit" dark onClick={handleSignup} />
      </div>
      <p className="text-center">
        Already have an account?{" "}
        <span
          className="text-indigo-600 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
