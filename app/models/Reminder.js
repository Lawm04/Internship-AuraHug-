import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
});

export default mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);
