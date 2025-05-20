import mongoose from "mongoose";

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  energy: {type: Number,required:true},
  gratitudes:{type:[String], default:[]},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Mood || mongoose.model("Mood", MoodSchema);
