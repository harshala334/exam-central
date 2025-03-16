import axios from "axios";

const API_URL = "http://localhost:5000/api/seating";

export const generateSeating = async (exam, branch, semester, room, totalSeats) => {
  const response = await axios.post(`${API_URL}/generate`, { exam, branch, semester, room, totalSeats });
  return response.data;
};

export const getSeating = async (room) => {
  const response = await axios.get(`${API_URL}/${room}`);
  return response.data;
};
// 🔹 Update Seat (Add This Function)
export const updateSeat = async (room, seatNumber, newStudentId) => {
  const response = await axios.put(`${API_URL}/update`, { room, seatNumber, newStudentId });
  return response.data;
};