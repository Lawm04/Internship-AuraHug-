import dbConnect from "@/app/database/mongodb";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if(!session?.user?.email){
      return NextResponse.json({ message:"Unauthorized"}, {status:401});
    }

    const user = await User.findOne({ email: session.user.email }).select("name email");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
