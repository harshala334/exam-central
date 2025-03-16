import mongoose from "mongoose";

const SeatingSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  branch: String,
  semester: Number,
  room: String,
  seats: [
    {
      seatNumber: Number,
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["occupied", "vacant"], default: "vacant" }
    }
  ]
});

export default mongoose.model("Seating", SeatingSchema);
