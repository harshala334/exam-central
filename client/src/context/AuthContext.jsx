import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token); 
    setUser(jwtDecode(token)); 
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token));
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); 
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, login, setUser, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
