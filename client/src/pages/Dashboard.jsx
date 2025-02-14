import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
function Dashboard({ role }) {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {role === 'admin' && <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => navigate('/manage-exams')} >Manage Exams</button>}
            {role === 'faculty' && <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => navigate('/faculty-manage-exams')}>Upload Marks</button>}
            {role === 'student' && <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/view-exams')}>View Results</button>}
        </div>
    );
}

Dashboard.propTypes = {
    role: PropTypes.string.isRequired,  // Ensures 'role' is a required string prop
};

export default Dashboard;
