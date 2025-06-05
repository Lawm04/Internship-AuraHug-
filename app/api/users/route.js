import dbConnect from "@/app/database/mongodb";
import User from "@/app/models/User"; 
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email }).select("name email profileImage");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
