import mongoose from "mongoose";

const MarkSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    internalAssessment: { type: Number, required: true },
    attendance: { type: Number, required: true },
    practical: { type: Number, required: true },
    finalMarks: { type: Number, required: true }, // Computed value
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

// Calculate final marks before saving
MarkSchema.pre("save", function (next) {
    this.finalMarks = this.internalAssessment * 0.4 + this.attendance * 0.2 + this.practical * 0.4;
    next();
});

const Mark = mongoose.model("Mark", MarkSchema);
export default Mark; // ✅ Correct ES Module export

//hello

