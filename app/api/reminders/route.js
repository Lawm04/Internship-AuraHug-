import dbConnect from "@/app/database/mongodb";
import Reminder from "@/app/models/Reminder";
import { NextResponse } from "next/server";

// Handle POST (set new reminder)
export async function POST(req) {
  await dbConnect();
  const { email, message, time } = await req.json();

  try {
    const newReminder = new Reminder({ email, message, time });
    await newReminder.save();
    return NextResponse.json({ message: "Reminder set!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error setting reminder" }, { status: 500 });
  }
}

// Handle GET (fetch reminders for a user)
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const reminders = await Reminder.find({ email }).sort({ time: 1 });
    return NextResponse.json({ reminders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching reminders" }, { status: 500 });
  }
}