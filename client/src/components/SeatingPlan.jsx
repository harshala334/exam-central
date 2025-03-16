// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SeatingPlan = ({ examId }) => {
//   const [seatingData, setSeatingData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch seating data from the backend
//     axios
//       .get(`http://localhost:5000/api/seating/exam/${examId}`)
//       .then((response) => {
//         setSeatingData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching seating data:", error);
//         setLoading(false);
//       });
//   }, [examId]); // Runs when examId changes

//   if (loading) {
//     return <p>Loading seating plan...</p>;
//   }

//   if (!seatingData) {
//     return <p>No seating data available.</p>;
//   }

//   return (
//     <div>
//       <h2>Seating Plan for Room {seatingData.room}</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Seat Number</th>
//             <th>Student ID</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {seatingData.seats.map((seat) => (
//             <tr key={seat._id}>
//               <td>{seat.seatNumber}</td>
//               <td>{seat.student ? seat.student : "Vacant"}</td>
//               <td>{seat.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SeatingPlan;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SeatingPlan = ({ examId }) => {
//   const [seatingData, setSeatingData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/seating/exam/${examId}`)
//       .then((response) => {
//         setSeatingData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching seating data:", error);
//         setLoading(false);
//       });
//   }, [examId]);

//   if (loading) return <p className="text-center text-lg">Loading seating plan...</p>;
//   if (!seatingData) return <p className="text-center text-lg text-gray-500">No seating data available.</p>;

//   // Seat type color coding
//   const getSeatColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "lower":
//         return "bg-blue-400 text-white";
//       case "middle":
//         return "bg-yellow-400 text-black";
//       case "upper":
//         return "bg-red-400 text-white";
//       default:
//         return "bg-gray-300 text-black";
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-center mb-4">Seating Plan for Room {seatingData.room}</h2>

//       {/* Train Seat Layout */}
//       <div className="grid grid-cols-3 gap-4">
//         {seatingData.seats.map((seat, index) => (
//           <div
//             key={seat._id}
//             className={`p-4 rounded-lg text-center font-semibold ${getSeatColor(seat.status)}`}
//           >
//             <p className="text-lg">Seat {seat.seatNumber}</p>
//             <p className="text-sm">{seat.student ? `ID: ${seat.student}` : "Vacant"}</p>
//             <p className="text-xs font-medium">({seat.status} berth)</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SeatingPlan;
import React, { useEffect, useState } from "react";
import axios from "axios";

const SeatingPlan = ({ examId }) => {
  const [seatingData, setSeatingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/seating/exam/${examId}`)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging Log
        setSeatingData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching seating data:", error);
        setLoading(false);
      });
  }, [examId]);

  if (loading) return <p className="text-center text-lg">Loading seating plan...</p>;
  if (!seatingData || !seatingData.seats) return <p className="text-center text-lg text-gray-500">No seating data available.</p>;

  // Bench status color coding
  const getSeatColor = (status) => {
    switch (status?.toLowerCase()) {
      case "occupied":
        return "bg-green-500 text-white"; // Green for occupied benches
      case "vacant":
        return "bg-gray-300 text-black"; // Light gray for vacant benches
      default:
        return "bg-gray-400 text-white"; // Default gray
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Seating Plan - Exam Center {seatingData.room}</h2>

      {/* Grid Layout with 4 Rows */}
      <div className="grid grid-cols-4 gap-6">
        {seatingData.seats.map((seat, index) => (
          <div
            key={seat._id || index}
            className={`p-3 rounded-md text-center w-24 font-medium ${getSeatColor(seat.status)}`}
          >
            <p>Seat {seat.seatNumber}</p>
            <p className="text-sm">{seat.student ? `ID: ${seat.student}` : "Vacant"}</p>
            <p className="text-xs font-medium">({seat.status})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatingPlan;
