import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define role-based nav items
  let navItems = [
    { name: "Home", path: "/home" },
    { name: "View Exams", path: "/view-exams" },
  ];

  if (user) {
    switch (user.role) {
      case "student":
        navItems.push({ name: "View Results", path: "/view-results" });
        break;
      case "faculty":
        navItems.push(
          { name: "Upload Marks", path: "/upload-marks" },
          { name: "Faculty Manage Exams", path: "/faculty-manage-exams" }
        );
        break;
      case "admin":
        navItems.push(
          { name: "Manage Exams", path: "/manage-exams" },
          { name: "Admin", path: "/admin" }
        );
        break;
      default:
        break;
    }
  }

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md">
      <header className="w-full">
        <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
          {/* Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Exam Central
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex lg:items-center">
            {user ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-700"
            >
              <Bars3Icon className="size-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black opacity-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg p-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Exam Central
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-700"
              >
                <XMarkIcon className="size-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-base font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="mt-6">
                {user ? (
                  <Button variant="outline" onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Navbar;
