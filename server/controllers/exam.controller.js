import Exam from '../models/Exam.js';

// ✅ Create an Exam
export const createExam = async (req, res) => {
    try {
        const { title, subject, date, maxMarks } = req.body;
        const newExam = new Exam({ title, subject, date, maxMarks });
        await newExam.save();
        res.status(201).json({ message: 'Exam created successfully', exam: newExam });
    } catch (error) {
        res.status(500).json({ message: 'Error creating exam', error });
    }
};

// ✅ Get all Exams
export const getExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exams', error });
    }
};

// ✅ Update an Exam
export const updateExam = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExam = await Exam.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'Exam updated successfully', exam: updatedExam });
    } catch (error) {
        res.status(500).json({ message: 'Error updating exam', error });
    }
};

// ✅ Delete an Exam
export const deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        await Exam.findByIdAndDelete(id);
        res.status(200).json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting exam', error });
    }
};
