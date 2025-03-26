import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { userId, id } = req.params;
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId." });
  }
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid orderId." });
  }
  next();
};

// Middleware to check if the user is authenticated (using JWT)
const isAuthenticated = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Export both middlewares
export { validateObjectId, isAuthenticated };
