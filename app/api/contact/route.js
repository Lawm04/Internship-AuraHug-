import { NextResponse } from "next/server";
import dbConnect from "@/app/database/mongodb";
import Contact from "@/app/models/Contact";

export async function POST(req) {
  await dbConnect();
  const data = await req.json();

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    await Contact.create(data);
    return NextResponse.json({ message: "Message saved" }, { status: 201 });
  } catch (error) {
    console.error("Failed to save message:", error);
    return NextResponse.json({ message: "Error saving message" }, { status: 500 });
  }
}
