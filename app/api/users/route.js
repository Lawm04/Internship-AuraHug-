import dbConnect from "@/app/database/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const demoEmail = "yexlawmveung@gmail.com";

    const user = await User.findOne({ email: demoEmail }).select("name email");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
