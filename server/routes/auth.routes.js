import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Email already exists' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
        token,
        role: user.role,
        facultyId: user.role === "faculty" ? user._id : null, // ✅ Send facultyId if user is a faculty
    });
});

router.get('/dashboard', authenticateUser, (req, res) => {
    res.json({ message: `Welcome, ${req.user.role}` });
});

export default router;
