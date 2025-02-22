import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import "./index.css";

import Login from './pages/Login';
import Register from "./pages/Register";

import Dashboard from './pages/Dashboard';
import UploadMarks from './pages/UploadMarks';
import ViewResults from './pages/ViewResults';
import AdminDashboard from './pages/AdminDashboard';
import ManageExams from './pages/ManageExams';
import FacultyManageExams from './pages/FacultyManageExams';
import ViewExams from './pages/ViewExams';


function App() {
    const auth = useAuth(); 
    const { user, checkAuth, setUser } = auth || {}; // ✅ Ensure setUser is available

    useEffect(() => {
        checkAuth?.();
    }, []);

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Navbar/>
            <Routes>
                <Route path="/home" element={user ? <LandingPage /> : <Navigate to="/dashboard" />} />
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login setUser={setUser} />} />  {/* ✅ Pass setUser from context */}
                <Route path="/register" element={<Register />} />
               
                
                <Route path="/dashboard" element={user ? <Dashboard role={user.role} /> : <Navigate to="/login" />} />
                <Route path="/manage-exams" element={user?.role === 'admin' ? <ManageExams /> : <Navigate to="/dashboard" />} />
                <Route path="/faculty-manage-exams" element={user?.role === 'faculty' ? <FacultyManageExams /> : <Navigate to="/dashboard" />} />
                <Route path="/view-exams" element={user ? <ViewExams /> : <Navigate to="/dashboard" />} />
                <Route path="/upload-marks" element={user?.role === 'faculty' ? <UploadMarks /> : <Navigate to="/dashboard" />} />
                <Route path="/view-results" element={user?.role === 'student' ? <ViewResults /> : <Navigate to="/dashboard" />} />
                <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}

export default App;
