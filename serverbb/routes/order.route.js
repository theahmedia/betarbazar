import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  updateUserInvoiceUrl,
} from "../controllers/order.controller.js";

const router = express.Router();

// Routes for managing orders
router.post("/", createOrder); // Create an order
router.get("/", getAllOrders); // Get all orders
router.get("/:id", getOrderById); // Get a single order by ID
router.put("/:id/status", updateOrderStatus); // Update order status
router.put("/:userId/invoice", updateUserInvoiceUrl);
router.delete("/:id", deleteOrder); // Delete an order

export default router;
