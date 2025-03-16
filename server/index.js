import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import examRoutes from './routes/exam.routes.js';
import adminRoutes from './routes/admin.routes.js';
import seatingRoutes from './routes/seatingRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seating", seatingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
