import dbConnect from "@/app/database/mongodb";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
      await dbConnect();
      const { email, password } = await request.json();
      const user = await User.findOne({ email });

     //Validation
    if ( !email || !password) {
      returnNextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
      
      if (!user) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
  
      return NextResponse.json(
        { message: "Login successful", userId: user._id },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Server error" },
        { status: 500 }
      );
    }
  }