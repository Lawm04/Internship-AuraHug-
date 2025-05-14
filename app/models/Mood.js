import mongoose from "mongoose";

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Mood || mongoose.model("Mood", MoodSchema);
