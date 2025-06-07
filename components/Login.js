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

  const hadleLogin = async () => {
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
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={" text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        Log In
      </h3>
      <p>You're one step away!</p>

      <input
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
        <Button text="Submit" dark onClick={hadleLogin} />
      </div>
      <p className="text-center">
        Don't have an account? <span className="text-indigo-600 cursor-pointer"  onClick={() => router.push("/signup")}
>Sign up</span>
      </p>
    </div>
  );
}
