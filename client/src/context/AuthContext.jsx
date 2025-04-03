import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (phone, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { phone, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (name, phone, email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, { name, phone, email, password });
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
