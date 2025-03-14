import express from "express";
import { authorizeRoles} from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/users", authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

export default router;
