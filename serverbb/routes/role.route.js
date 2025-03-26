import express from "express";

const router = express.Router();

// Define the available roles
const roles = ["admin", "editor", "customer"];

// GET request to fetch roles
router.get("/role", (req, res) => {
  try {
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
