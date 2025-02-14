import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewResults() {
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/marks/my-marks', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setMarks(res.data);
            } catch {
                alert("Error fetching marks");  // ✅ Handle error properly
            }
        };
        fetchMarks();
    }, []);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">My Results</h1>
            <ul className="w-1/2 bg-white shadow-md p-4">
                {marks.map((mark) => (
                    <li key={mark._id} className="border-b p-2">
                        <p><strong>Exam:</strong> {mark.examId.title}</p>
                        <p><strong>Subject:</strong> {mark.examId.subject}</p>
                        <p><strong>Marks Obtained:</strong> {mark.marksObtained} / {mark.examId.maxMarks}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewResults;
