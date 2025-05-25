import dbConnect from "@/app/database/mongodb";
import QuickMood from "@/app/models/QuickMood";
import { NextResponse } from "next/server";

// POST: Save quick mood entry
export async function POST(request) {
  try {
    await dbConnect();
    const { mood, note, date } = await request.json();

    if (!mood) {
      return NextResponse.json({ message: "Mood is required" }, { status: 400 });
    }

    const newEntry = new QuickMood({ mood, note, date });
    await newEntry.save();

    return NextResponse.json({ message: "Quick mood saved" }, { status: 201 });
  } catch (err) {
    console.error("Failed to save quick mood:", err);
    return NextResponse.json({ message: "Failed to save quick mood" }, { status: 500 });
  }
}

// GET: Return summary data (e.g., for pie chart)
export async function GET() {
  try {
    await dbConnect();
    const entries = await QuickMood.find();

    const summary = {};

    entries.forEach(({ mood }) => {
      summary[mood] = (summary[mood] || 0) + 1;
    });

    return NextResponse.json(summary);
  } catch (err) {
    console.error("Failed to fetch quick mood data:", err);
    return NextResponse.json({ message: "Failed to fetch quick mood data" }, { status: 500 });
  }
}
