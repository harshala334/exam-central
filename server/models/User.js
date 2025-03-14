import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNo: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "faculty", "student"],
    required: true,
  },
  department: { type: String },
  // Fields for students
  rollNo: { type: String, unique: true, sparse: true },
  branch: { type: String },
  semester: { type: Number },

  // Fields for faculty
  employeeId: { type: String, unique: true, sparse: true },
});

export default mongoose.model("User", UserSchema);
