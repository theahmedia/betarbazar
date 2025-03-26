import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Register User
// export const register = async (req, res) => {
//   try {
//     const { name, phone, email, password, confirmPassword, role } = req.body;

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return res.status(400).json({ message: "Phone number already exists" });
//     }

//     // Hash password once
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const userData = { 
//       name, 
//       phone, 
//       password: hashedPassword,
//       ...(email && email.trim() ? { email } : {}) // Only add email if it's provided
//     };

//     const user = await User.create(userData);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error: error.message });
//   }
// };

// export const register = async (req, res) => {
//   const { name, phone, email, password, confirmPassword, role } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }

//   try {
//     const userData = { 
//       name, 
//       phone, 
//       password, // Do NOT hash manually, Mongoose will do it
//       role: role || "customer", // Assign role if provided, else default to customer
//       ...(email && email.trim() ? { email } : {})
//     };

//     const user = await User.create(userData);
//     res.status(201).json({ message: "User registered successfully" });

//   } catch (error) {
//     if (error.code === 11000) {
//       if (error.keyPattern.phone) {
//         return res.status(400).json({ message: "Phone number already exists" });
//       }
//       if (error.keyPattern.email) {
//         return res.status(400).json({ message: "Email already exists" });
//       }
//     }
//     res.status(500).json({ message: "Error registering user", error: error.message });
//   }
// };

export const register = async (req, res) => {
  try {
    const { name, phone, email, password, confirmPassword, deliveryLocation, role } = req.body;

    // Check if user already exists by phone
    let user = await User.findOne({ phone });

    if (user) {
      return res.status(200).json(user); // Auto-login if user exists
    }

    // Validate password only if provided
    if (password && password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Create new user with required & optional fields
    const userData = {
      name,
      phone,
      deliveryLocation, // Ensuring delivery location is stored
      ...(password ? { password } : {}), // Only include password if provided
      role: role || "customer", // Default role if not provided
      ...(email && email.trim() ? { email } : {}), // Optional email
    };

    user = await User.create(userData);

    res.status(201).json(user); // Return user object for auto-login

  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.phone) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
      if (error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔹 Password Match Result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate Reset Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Email Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset password email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};

// Reset Password: Updates Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token or user not found." });

    // Ensure password is hashed only once
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token.", error: error.message });
  }
};

export const checkUser = async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const user = await User.findOne({ phone });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

