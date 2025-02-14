import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            alert('Registration successful');
            navigate('/login');
        } catch {
            alert('Error registering');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <input className="mb-2 p-2 border rounded" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input className="mb-2 p-2 border rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className="mb-2 p-2 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <select className="mb-2 p-2 border rounded" onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
            </select>
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
