import mongoose from "mongoose";

const QuickMoodSchema = new mongoose.Schema(
  {
    mood: { type: String, required: true },
    note: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.QuickMood || mongoose.model("QuickMood", QuickMoodSchema);
