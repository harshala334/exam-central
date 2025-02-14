import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ViewExams() {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'student') {
            alert('Access Denied');
            navigate('/');
        }
    }, []);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">View Exams</h1>
            {/* Fetch and display exam details here */}
        </div>
    );
}

export default ViewExams;
