import { useState } from 'react';
import axios from 'axios';

function UploadMarks() {
    const [studentId, setStudentId] = useState('');
    const [examId, setExamId] = useState('');
    const [marks, setMarks] = useState('');

    const handleUpload = async () => {
        try {
            await axios.post('http://localhost:5000/api/marks/upload', 
                { studentId, examId, marksObtained: marks },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert("Marks uploaded successfully");
        } catch {
            alert("Error uploading marks");  // ✅ Handle error properly
        }
    };
    

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Upload Marks</h1>
            <input type="text" placeholder="Student ID" onChange={(e) => setStudentId(e.target.value)} className="border p-2 mb-2"/>
            <input type="text" placeholder="Exam ID" onChange={(e) => setExamId(e.target.value)} className="border p-2 mb-2"/>
            <input type="number" placeholder="Marks" onChange={(e) => setMarks(e.target.value)} className="border p-2 mb-2"/>
            <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded">Upload</button>
        </div>
    );
}

export default UploadMarks;
