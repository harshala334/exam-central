import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";


function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    
            console.log("Full Login Response:", res.data); // Debug full response
    
            if (!res.data.token) {
                alert("Login failed: No token received.");
                return;
            }
    
            const token = res.data.token;
            localStorage.setItem('token', token);
    
            const user = jwtDecode(token);
            console.log("Decoded User:", user); // Debug decoded token
    
            localStorage.setItem('role', user.role);  // ✅ Store role explicitly
            setUser(user);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            alert("Invalid credentials");
        }
    };
    
    

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-blue-500 text-white p-2 rounded mb-3" onClick={handleLogin}>
                    Login
                </button>
                <p className="text-center">
                    Dont have an account?{" "}
                    <Link to="/register" className="text-blue-500 underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}

// ✅ Add PropTypes validation
Login.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default Login;
