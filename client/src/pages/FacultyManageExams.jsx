import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FacultyManageExams() {
    const [exams, setExams] = useState([]);
    const [newExam, setNewExam] = useState({ title: '', subject: '', date: '', maxMarks: '' });
    const [editingExam, setEditingExam] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (userRole !== 'faculty') {
            alert('Access Denied');
            navigate('/'); 
        }

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

    const updateExam = (id) => {
        axios.put(`http://localhost:5000/api/exams/update/${id}`, editingExam, {
            headers: { Authorization: localStorage.getItem('token') }
        })
        .then(() => {
            alert('Exam updated successfully');
            window.location.reload();
        })
        .catch(() => alert('Error updating exam'));
    };

    const deleteExam = (id) => {
        axios.delete(`http://localhost:5000/api/exams/delete/${id}`, {
            headers: { Authorization: localStorage.getItem('token') }
        })
        .then(() => {
            alert('Exam deleted successfully');
            window.location.reload();
        })
        .catch(() => alert('Error deleting exam'));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Faculty Exam Management</h1>

            {/* Add Exam */}
            <input className="mb-2 p-2 border rounded" type="text" placeholder="Title" onChange={(e) => setNewExam({ ...newExam, title: e.target.value })} />
            <input className="mb-2 p-2 border rounded" type="text" placeholder="Subject" onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })} />
            <input className="mb-2 p-2 border rounded" type="date" onChange={(e) => setNewExam({ ...newExam, date: e.target.value })} />
            <input className="mb-2 p-2 border rounded" type="number" placeholder="Max Marks" onChange={(e) => setNewExam({ ...newExam, maxMarks: e.target.value })} />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addExam}>Add Exam</button>

            {/* Existing Exams */}
            <h2 className="text-xl font-bold mt-6">Existing Exams</h2>
            <ul className="mt-2">
                {exams.map((exam) => (
                    <li key={exam._id} className="border p-2 rounded mb-2 flex justify-between items-center">
                        <div>
                            {exam.title} - {exam.subject} ({exam.date})
                        </div>
                        <div>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => setEditingExam(exam)}>Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteExam(exam._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit Exam Form */}
            {editingExam && (
                <div className="mt-4 p-4 border rounded bg-white">
                    <h3 className="text-lg font-bold">Edit Exam</h3>
                    <input className="mb-2 p-2 border rounded" type="text" value={editingExam.title} onChange={(e) => setEditingExam({ ...editingExam, title: e.target.value })} />
                    <input className="mb-2 p-2 border rounded" type="text" value={editingExam.subject} onChange={(e) => setEditingExam({ ...editingExam, subject: e.target.value })} />
                    <input className="mb-2 p-2 border rounded" type="date" value={editingExam.date} onChange={(e) => setEditingExam({ ...editingExam, date: e.target.value })} />
                    <input className="mb-2 p-2 border rounded" type="number" value={editingExam.maxMarks} onChange={(e) => setEditingExam({ ...editingExam, maxMarks: e.target.value })} />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => updateExam(editingExam._id)}>Update Exam</button>
                    <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingExam(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default FacultyManageExams;
