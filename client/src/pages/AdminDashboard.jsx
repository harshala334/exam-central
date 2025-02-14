import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchExams();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/users", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setUsers(res.data);
        } catch {
            alert("Error fetching users");
        }
    };

    const fetchExams = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/exams", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setExams(res.data);
        } catch {
            alert("Error fetching exams");
        }
    };

    return (
        <div className="h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            
            <div className="w-full max-w-4xl bg-white p-4 shadow-md rounded">
                <h2 className="text-xl font-semibold mb-2">Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user._id} className="p-2 border-b">
                            {user.name} - {user.role}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full max-w-4xl bg-white p-4 shadow-md rounded mt-4">
                <h2 className="text-xl font-semibold mb-2">Exams</h2>
                <ul>
                    {exams.map((exam) => (
                        <li key={exam._id} className="p-2 border-b">
                            {exam.name} - {exam.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboard;
