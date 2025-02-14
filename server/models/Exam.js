import mongoose from 'mongoose';

const ExamSchema = new mongoose.Schema({
    title: String,
    subject: String,
    date: Date,
    maxMarks: Number
});

export default mongoose.model('Exam', ExamSchema);
