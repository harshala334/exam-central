import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const { role, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Exam Central</h1>
      <p className="text-gray-600 mt-2">Your one-stop solution for seamless exam management</p>

      {isAuthenticated ? (
        <>
          <h2 className="text-xl mt-6 text-gray-700">
            Logged in as: <span className="font-semibold text-blue-500">{role.toUpperCase()}</span>
          </h2>
          <Link to="/dashboard">
            <Button className="mt-4">Go to Dashboard</Button>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <Button className="mt-6">Login to Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default LandingPage;
