import express from "express";
import Seating from "../models/seatingModel.js";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Generate Seating Plan
router.post("/generate", async (req, res) => {
  try {
    const { exam, branch, semester, room, totalSeats } = req.body;
    console.log("Searching for students:", { branch, semester });
    console.log("Total seats to assign:", totalSeats);


    const students = await User.find({ branch, semester }).limit(totalSeats);
    console.log("Found students:", students);

    if (students.length === 0) {
      return res.status(400).json({ message: "No students found" });
    }

   
    const seats = Array.from({ length: totalSeats }, (_, index) => {
        const student = students[index] || null;
        console.log(`Assigning seat ${index + 1} to`, student ? student._id : "No Student");
        
        return {
          seatNumber: index + 1,
          student: student ? student._id : null,
          status: student ? "occupied" : "vacant",
        };
      });
      

    const seatingPlan = new Seating({ exam, branch, semester, room, seats });
    await seatingPlan.save();

    res.status(201).json(seatingPlan);
  } catch (error) {
    res.status(500).json({ message: "Error generating seating", error });
  }
});

// 🔹 Fetch Seating Plan
// router.get("/:room", async (req, res) => {
//   try {
//     const seatingPlan = await Seating.findOne({ room: req.params.room }).populate("seats.student");
//     res.json(seatingPlan);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching seating", error });
//   }
// });
router.get("/exam/:examId", async (req, res) => {
    try {
      const seating = await Seating.findOne({ exam: req.params.examId });
      if (!seating) {
        return res.status(404).json({ message: "Seating plan not found" });
      }
      res.json(seating);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });
export default router;
