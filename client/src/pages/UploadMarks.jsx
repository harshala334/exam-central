import { useState } from "react";
import axios from "axios";

function UploadMarks() {
    const [studentId, setStudentId] = useState("");
    const [subject, setSubject] = useState("");
    const [internalAssessment, setInternalAssessment] = useState("");
    const [attendance, setAttendance] = useState("");
    const [practical, setPractical] = useState("");

    const handleUpload = async () => {
        try {
            const facultyId = localStorage.getItem("facultyId"); // Ensure facultyId is stored after login

            if (!facultyId) {
                alert("Error: Faculty ID missing.");
                return;
            }

            await axios.post(
                "http://localhost:5000/api/marks",
                {
                    studentId,
                    subject,
                    internalAssessment: Number(internalAssessment),
                    attendance: Number(attendance),
                    practical: Number(practical),
                    facultyId,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            alert("Marks uploaded successfully");
        } catch (error) {
            alert("Error uploading marks");
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Upload Marks</h1>
            <input type="text" placeholder="Student ID" onChange={(e) => setStudentId(e.target.value)} className="border p-2 mb-2"/>
            <input type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} className="border p-2 mb-2"/>
            <input type="number" placeholder="Internal Assessment" onChange={(e) => setInternalAssessment(e.target.value)} className="border p-2 mb-2"/>
            <input type="number" placeholder="Attendance" onChange={(e) => setAttendance(e.target.value)} className="border p-2 mb-2"/>
            <input type="number" placeholder="Practical" onChange={(e) => setPractical(e.target.value)} className="border p-2 mb-2"/>
            <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded">Upload</button>
        </div>
    );
}

export default UploadMarks;
