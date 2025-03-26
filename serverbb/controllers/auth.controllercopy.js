import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Register
export const register = async (req, res) => {
  const { name, phone, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userData = { 
      name, 
      phone, 
      password, // Storing password as plain text (Not recommended)
      ...(email && email.trim() !== "" ? { email: email } : { email: null })
    };
    const user = await User.create(userData);
    res.status(201).json({ message: "User registered successfully" });
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
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Entered Password:", password);
    console.log("Stored Password:", user.password);

    if (password !== user.password) {
      console.log("Password comparison failed");
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
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset password email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

// Reset Password: Updates Password
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token or user not found." });

    user.password = newPassword; // Storing password in plain text (Not recommended)
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token.", error });
  }
};
