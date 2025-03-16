import React, { useEffect, useState } from "react";
import { getSeating, updateSeat } from "../api/seatingService";

const SeatingLayout = ({ room }) => {
  const [seating, setSeating] = useState(null);

  useEffect(() => {
    fetchSeating();
  }, [room]);

  const fetchSeating = async () => {
    try {
      console.log("Fetching seating for room:", room); // ✅ Debugging log
      const data = await getSeating(room);
      console.log("Seating data received:", data); // ✅ Debugging log
      setSeating(data);
    } catch (error) {
      console.error("Error fetching seating:", error); // ✅ Debugging log
    }
  };
  

  const handleSeatClick = async (seatNumber) => {
    const newStudentId = prompt("Enter new student ID:");
    if (newStudentId) {
      await updateSeat(room, seatNumber, newStudentId);
      fetchSeating(); // Refresh seating after update
    }
  };

  if (!seating) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">{`Room: ${room}`}</h2>
      <div className="grid grid-cols-3 gap-4">
        {seating.seats.map((seat) => (
          <button
            key={seat.seatNumber}
            className={`p-4 rounded-lg text-white ${
              seat.status === "occupied" ? "bg-blue-600" : "bg-green-500"
            }`}
            onClick={() => handleSeatClick(seat.seatNumber)}
          >
            {seat.seatNumber} - {seat.student ? seat.student.name : "Vacant"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatingLayout;
