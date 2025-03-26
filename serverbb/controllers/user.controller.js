import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; // Import bcrypt

// Create a new user
export const createUser = async (req, res) => {
  try {
    console.log("Received user data:", req.body); // Log request body for debugging

    const { name, phone, email, role, password } = req.body;

    if (!name || !phone || !role || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      phone,
      email,
      role,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error); // Log error
    res.status(400).json({ error: error.message });
  }
};


// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean(); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, phone, email, role, password } = req.body;
    let updateData = { name, phone, email, role };

    // Hash password only if it's updated
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserInvoice = async (req, res) => {
  const { userId } = req.params;
  const { invoiceUrl } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the invoice URL
    user.invoiceUrl = invoiceUrl;
    await user.save();

    res.status(200).json({ message: "Invoice URL updated successfully", user });
  } catch (error) {
    console.error("Error updating invoice URL:", error);
    res.status(500).json({ message: "Failed to update invoice URL" });
  }
};
