import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { role, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Exam Central</h1>
      <p className="text-gray-600 mt-2">Your one-stop solution for seamless exam management</p>

      {isAuthenticated ? (
        <h2 className="text-xl mt-6 text-gray-700">
          Logged in as: <span className="font-semibold text-blue-500">{role.toUpperCase()}</span>
        </h2>
      ) : (
        <p className="text-lg mt-6 text-gray-700">Please log in to access your dashboard.</p>
      )}
    </div>
  );
};

export default LandingPage;
