import dbConnect from "@/app/database/mongodb";
import Mood from "@/app/models/Mood";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

// GET: Return mood summary 
export async function GET() {
  try {
    await dbConnect();

    const moods = await Mood.find().populate("userId", "name email");
    const moodSummary = {};

    moods.forEach((entry) => {
      const moodType = entry.mood;

      if (!moodSummary[moodType]) {
        moodSummary[moodType] = {
          count: 0,
          users: [],
        };
      }

      moodSummary[moodType].count++;
      moodSummary[moodType].users.push({
        name: entry.userId?.name || "Unknown",
        email: entry.userId?.email || "Unknown",
      });
    });

    return NextResponse.json(moodSummary);
  } catch (error) {
    console.error("Error fetching mood data:", error);
    return NextResponse.json(
      { message: "Failed to fetch mood data" },
      { status: 500 }
    );
  }
}

// POST: Save mood entry
export async function POST(request) {
  try {
    await dbConnect();

    const { mood, energy, gratitudes, email } = await request.json();

    if (!mood || !energy|| !email) {
      return NextResponse.json({ message: "Mood and energy are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newMood = new Mood({
      mood,
      energy,
      gratitudes,
      userId: user._id,
    });

    await newMood.save();

    return NextResponse.json({ message: "Mood saved" }, { status: 201 });
  } catch (error) {
    console.error("Error saving mood:", error);
    return NextResponse.json({ message: "Failed to save mood" }, { status: 500 });
  }
}
