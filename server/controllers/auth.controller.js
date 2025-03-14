import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      contactNo,
      department,
      rollNo,
      branch,
      semester,
      employeeId,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNo,
      role,
      department,
    });

    if (role === "student") {
      if (!rollNo || !branch || !semester) {
        return res
          .status(400)
          .json({
            error: "Students must provide rollNo, branch, and semester.",
          });
      }
      newUser.rollNo = rollNo;
      newUser.branch = branch;
      newUser.semester = semester;
    } else if (role === "faculty") {
      if (!employeeId) {
        return res
          .status(400)
          .json({ error: "Faculty must provide an employee ID." });
      }
      newUser.employeeId = employeeId;
    }
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Server error, please try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        role: user.role
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later." });
  }
};
