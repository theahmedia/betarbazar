import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  const userRole = user?.role || localStorage.getItem("role"); // Get role from state or localStorage

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect unauthorized users
  }

  return element;
};

export default ProtectedRoute;
