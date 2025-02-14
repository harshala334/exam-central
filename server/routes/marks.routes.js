const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Mark = require('../models/Mark');

// Upload Marks (Faculty Only)
router.post('/upload', authMiddleware(['faculty']), async (req, res) => {
    try {
        const { studentId, examId, marksObtained } = req.body;
        const mark = new Mark({ studentId, examId, marksObtained });
        await mark.save();
        res.status(201).json({ message: "Marks uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Get Student's Marks (Student Only)
router.get('/my-marks', authMiddleware(['student']), async (req, res) => {
    try {
        const marks = await Mark.find({ studentId: req.user.id }).populate('examId', 'title subject maxMarks date');
        res.status(200).json(marks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
