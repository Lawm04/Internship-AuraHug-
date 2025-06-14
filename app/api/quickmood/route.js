import dbConnect from "@/app/database/mongodb";
import QuickMood from "@/app/models/QuickMood";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

// POST: Save quick mood entry
export async function POST(request) {
  try {
    await dbConnect();
    const { mood, note, date, email } = await request.json();

    if (!mood || !email) {
      return NextResponse.json({ message: "Mood and email are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newEntry = new QuickMood({ mood, note, date, userId: user._id, email });
    await newEntry.save();

    return NextResponse.json({ message: "Quick mood saved" }, { status: 201 });
  } catch (err) {
    console.error("Failed to save quick mood:", err);
    return NextResponse.json({ message: "Failed to save quick mood" }, { status: 500 });
  }
}

// GET: Return summary data for a specific user
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const entries = await QuickMood.find({ userId: user._id });

    const moodSummary = {};
    const entryList = [];

    entries.forEach((entry) => {
      const { mood, date } = entry;
      moodSummary[mood] = (moodSummary[mood] || 0) + 1;
      entryList.push({ mood, date });
    });

    const weeklyCheckinCount = new Set(
      entryList.map((entry) => new Date(entry.date).toDateString())
    ).size;

    return NextResponse.json({
      summary: moodSummary,
      weeklyCheckinCount,
      entries: entryList,
    });
  } catch (err) {
    console.error("Failed to fetch quick mood data:", err);
    return NextResponse.json({ message: "Failed to fetch quick mood data" }, { status: 500 });
  }
}