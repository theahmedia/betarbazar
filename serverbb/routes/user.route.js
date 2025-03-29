import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js"; // Ensure the correct path
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserInvoice,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.put("/:userId/invoice", updateUserInvoice);
router.delete("/:id", deleteUser);

router.get("/users/:id", async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});




export default router;
