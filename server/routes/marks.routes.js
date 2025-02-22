import express from "express";
import { addMarks, getMarks, updateMarks, deleteMarks } from "../controllers/marks.controller.js";
import { authenticateUser, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, addMarks);
router.get("/", authenticateUser, getMarks);
router.put("/:id", authenticateUser, updateMarks);
router.delete("/:id", authenticateUser, verifyAdmin, deleteMarks);

export default router; // ✅ Correct ES Module export
