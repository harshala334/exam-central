import React, { useState } from "react";
import { getSeating } from "../api/seatingService";

const SeatingDisplay = () => {
  const [room, setRoom] = useState("");
  const [seating, setSeating] = useState(null);

  const fetchSeating = async () => {
    try {
      const data = await getSeating(room);
      setSeating(data);
    } catch (error) {
      console.error("Error fetching seating plan");
    }
  };

  return (
    <div>
      <h2>View Seating Plan</h2>
      <input type="text" placeholder="Enter Room" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={fetchSeating}>Fetch Seating</button>
      {seating && (
        <ul>
          {seating.seats.map((seat) => (
            <li key={seat.seatNumber}>
              Seat {seat.seatNumber}: {seat.student?.name || "Vacant"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeatingDisplay;
