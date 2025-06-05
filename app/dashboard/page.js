"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(loggedIn === "true");
  }, []);

  if (isAuthenticated === null) return <p className="text-center mt-10">Loading...</p>;

  return isAuthenticated ? <Dashboard /> : <Login />;
}
