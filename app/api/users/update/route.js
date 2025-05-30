import dbConnect from "@/app/database/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// For parsing multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseMultipartFormData(request) {
  const busboy = (await import("busboy")).default;
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: Object.fromEntries(request.headers) });
    const fields = {};
    let fileData = null;
    let fileName = null;
    let fileMime = null;
    bb.on("file", (name, file, info) => {
      fileName = info.filename;
      fileMime = info.mimeType;
      const chunks = [];
      file.on("data", (data) => chunks.push(data));
      file.on("end", () => {
        fileData = Buffer.concat(chunks);
      });
    });
    bb.on("field", (name, value) => {
      fields[name] = value;
    });
    bb.on("close", () => resolve({ fields, fileData, fileName, fileMime }));
    bb.on("error", reject);
    request.body.pipe(bb);
  });
}

export async function POST(request) {
  await dbConnect();
  try {
    let fields = {};
    let fileData = null;
    let fileName = null;
    let fileMime = null;

    const contentType = request.headers.get("content-type") || "";
    if (contentType.startsWith("multipart/form-data")) {
      // Parse multipart form data
      const req = {
        headers: Object.fromEntries(request.headers),
        body: request.body,
      };
      ({ fields, fileData, fileName, fileMime } = await parseMultipartFormData(req));
    } else {
      // Parse JSON body
      fields = await request.json();
    }

    const { email, name } = fields;
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update name
    user.name = name || user.name;

    // Handle profile image upload
    if (fileData && fileName) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileExt = path.extname(fileName);
      const newFileName = `profile_${user._id}${fileExt}`;
      const filePath = path.join(uploadDir, newFileName);

      fs.writeFileSync(filePath, fileData);
      user.profileImage = `/uploads/${newFileName}`;
    }

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || null,
    }, { status: 200 });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}