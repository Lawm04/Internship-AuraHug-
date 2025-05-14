// app/api/mood/route.js

import dbConnect from "@/app/database/mongodb";
import Mood from "@/models/Mood";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Aggregate moods by type
    const result = await Mood.aggregate([
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 },
        },
      },
    ]);

    const moodData = {};
    result.forEach((entry) => {
      moodData[entry._id] = entry.count;
    });

    return NextResponse.json(moodData);
  } catch (error) {
    console.error("Error fetching mood data:", error);
    return NextResponse.json({ message: "Failed to fetch mood data" }, { status: 500 });
  }
}
