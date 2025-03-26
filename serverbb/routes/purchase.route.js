import express from "express";
import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
  getSuppliers,
} from "../controllers/purchase.Controller.js";

const router = express.Router();

// Supplier Routes (Moved before dynamic :id route)
router.get("/suppliers", getSuppliers);

// Purchase Routes
router.post("/", createPurchase);
router.get("/", getPurchases);
router.get("/:id", getPurchaseById);
router.put("/:id", updatePurchase);
router.delete("/:id", deletePurchase);

export default router;
