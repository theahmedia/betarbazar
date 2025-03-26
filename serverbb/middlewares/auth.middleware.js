import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

// Main authentication middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token

    // Fetch the user based on the decoded user ID
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user data to the request object for later use
    req.user = user;
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("🔥 Token verification failed:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Role verification middleware
export const verifyRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user data" });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  next(); // Pass control if role is valid
};

// Authentication middleware for routes requiring a user
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired, please log in again" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

// Admin check middleware
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Allow admin access
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

// Editor check middleware
export const isEditor = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "editor")) {
    next(); // Allow admin or editor access
  } else {
    res.status(403).json({ message: "Editor or Admin access required" });
  }
};

export default authMiddleware;
