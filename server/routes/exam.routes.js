import express from 'express';
import { createExam, getExams, updateExam, deleteExam } from '../controllers/exam.controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Admin & Faculty can create an exam
router.post('/add', authenticateUser, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
        return res.status(403).json({ error: 'Access denied' });
    }
    await createExam(req, res);
});

// ✅ Admin & Faculty can view all exams
router.get('/all', authenticateUser, getExams);

// ✅ Admin & Faculty can update an exam
router.put('/update/:id', authenticateUser, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
        return res.status(403).json({ error: 'Access denied' });
    }
    await updateExam(req, res);
});

// ✅ Admin & Faculty can delete an exam
router.delete('/delete/:id', authenticateUser, async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
        return res.status(403).json({ error: 'Access denied' });
    }
    await deleteExam(req, res);
});

export default router;
