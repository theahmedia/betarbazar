import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext'; // Assuming you have a context for user data

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useContext(AuthContext); // Get user data from context

  if (!user) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to a "Not Authorized" page or a page with limited access
    return <Navigate to="/not-authorized" />;
  }

  return element;
};

export default PrivateRoute;
