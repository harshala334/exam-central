import React, { useState } from "react";
import { generateSeating } from "../api/seatingService";
import { toast } from "react-toastify";

const SeatingGenerator = () => {
  const [formData, setFormData] = useState({ exam: "", branch: "", semester: "", room: "", totalSeats: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await generateSeating(formData.exam, formData.branch, formData.semester, formData.room, formData.totalSeats);
      toast.success("Seating Plan Generated Successfully!");
    } catch (error) {
      toast.error("Error generating seating plan");
    }
  };

  return (
    <div>
      <h2>Generate Seating Plan</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="exam" placeholder="Exam ID" onChange={handleChange} required />
        <input type="text" name="branch" placeholder="Branch" onChange={handleChange} required />
        <input type="number" name="semester" placeholder="Semester" onChange={handleChange} required />
        <input type="text" name="room" placeholder="Room" onChange={handleChange} required />
        <input type="number" name="totalSeats" placeholder="Total Seats" onChange={handleChange} required />
        <button type="submit">Generate</button>
      </form>
    </div>
  );
};

export default SeatingGenerator;
