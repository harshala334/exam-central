import { useState, useEffect } from 'react';
import axios from 'axios';

function ManageExams() {
    const [exams, setExams] = useState([]);
    const [newExam, setNewExam] = useState({ title: '', subject: '', date: '', maxMarks: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/api/exams/all', {
            headers: { Authorization: localStorage.getItem('token') }
        })
        .then((res) => setExams(res.data))
        .catch(() => alert('Error fetching exams'));
    }, []);

    const addExam = () => {
        axios.post('http://localhost:5000/api/exams/add', newExam, {
            headers: { Authorization: localStorage.getItem('token') }
        })
        .then(() => {
            alert('Exam added successfully');
            window.location.reload();
        })
        .catch(() => alert('Error adding exam'));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Manage Exams</h1>

            <input className="mb-2 p-2 border rounded" type="text" placeholder="Title" onChange={(e) => setNewExam({ ...newExam, title: e.target.value })} />
            <input className="mb-2 p-2 border rounded" type="text" placeholder="Subject" onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })} />
            <input className="mb-2 p-2 border rounded" type="date" onChange={(e) => setNewExam({ ...newExam, date: e.target.value })} />
            <input className="mb-2 p-2 border rounded" type="number" placeholder="Max Marks" onChange={(e) => setNewExam({ ...newExam, maxMarks: e.target.value })} />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addExam}>Add Exam</button>

            <h2 className="text-xl font-bold mt-6">Existing Exams</h2>
            <ul className="mt-2">
                {exams.map((exam) => (
                    <li key={exam._id} className="border p-2 rounded mb-2">
                        {exam.title} - {exam.subject} ({exam.date})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageExams;
