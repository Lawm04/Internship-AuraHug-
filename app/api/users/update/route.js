import dbConnect from "@/app/database/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Parse multipart form data
async function parseMultipartFormData(request) {
  const busboy = (await import("busboy")).default;

  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: Object.fromEntries(request.headers) });
    const fields = {};
    let fileData = null;
    let fileName = null;

    bb.on("file", (_, file, info) => {
      fileName = info.filename;
      const chunks = [];

      file.on("data", (data) => chunks.push(data));
      file.on("end", () => {
        fileData = Buffer.concat(chunks);
      });
    });

    bb.on("field", (name, value) => {
      fields[name] = value;
    });

    bb.on("close", () => resolve({ fields, fileData, fileName }));
    bb.on("error", reject);

    request.body.pipe(bb);
  });
}

export async function POST(req) {
  try {
    await dbConnect();

    const contentType = req.headers.get("content-type") || "";
    let fields = {};
    let fileData = null;
    let fileName = null;

    if (contentType.startsWith("multipart/form-data")) {
      const parsed = await parseMultipartFormData({
        headers: Object.fromEntries(req.headers),
        body: req.body,
      });

      fields = parsed.fields;
      fileData = parsed.fileData;
      fileName = parsed.fileName;
    } else {
      fields = await req.json();
    }

    const { email, name } = fields;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.name = name || user.name;

    if (fileData && fileName) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = path.extname(fileName);
      const newFileName = `profile_${user._id}${ext}`;
      const filePath = path.join(uploadDir, newFileName);

      fs.writeFileSync(filePath, fileData);
      user.profileImage = `/uploads/${newFileName}`;
    }

    await user.save();

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}