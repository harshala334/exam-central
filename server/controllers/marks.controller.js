import Mark from "../models/Mark.js"; // ✅ Correct ES Module import

export const addMarks = async (req, res) => {
    try {
        const { studentId, subject, internalAssessment, attendance, practical, facultyId } = req.body;

        if (!studentId || !subject || !facultyId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const finalMarks = internalAssessment * 0.4 + attendance * 0.2 + practical * 0.4;

        const mark = new Mark({
            studentId,
            subject,
            internalAssessment,
            attendance,
            practical,
            finalMarks,
            facultyId,
        });
        await mark.save();
        res.status(201).json({ message: "Marks added successfully", mark });
    } catch (error) {
        res.status(500).json({ message: "Error adding marks", error });
    }
};

export const getMarks = async (req, res) => {
    try {
        const marks = await Mark.find().populate("studentId", "name").populate("facultyId", "name");
        res.status(200).json(marks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching marks", error });
    }
};

export const updateMarks = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMark = await Mark.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json({ message: "Marks updated successfully", updatedMark });
    } catch (error) {
        res.status(500).json({ message: "Error updating marks", error });
    }
};

export const deleteMarks = async (req, res) => {
    try {
        const { id } = req.params;
        await Mark.findByIdAndDelete(id);
        res.status(200).json({ message: "Marks deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting marks", error });
    }
};
