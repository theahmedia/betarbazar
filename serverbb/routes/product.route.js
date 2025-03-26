import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getHotDeals,
  getTodaysMarketPrice,
  getTopSelling,
  getBestSeller,
  getNewArrival,
  getTopRated,
  getFeaturedProducts,
  getProductsByCategory,
} from "../controllers/product.controller.js";
import upload from "../middlewares/productsImgMiddleware.js"; // Your image upload middleware

const router = express.Router();

// 🔹 CREATE PRODUCT (With Image Upload)
router.post("/", upload.single("image"), createProduct);

// 🔹 GET ALL PRODUCTS
router.get("/", getProducts);

// ✅ FILTERED PRODUCT SECTIONS (Move these above `/:id`)
router.get("/hot-deals", getHotDeals);
router.get("/todays-market-price", getTodaysMarketPrice);
router.get("/top-selling", getTopSelling);
router.get("/best-seller", getBestSeller);
router.get("/new-arrival", getNewArrival);
router.get("/top-rated", getTopRated);
router.get("/featured", getFeaturedProducts);

// Route to get products by category (Corrected path)
router.get("/category/:categoryId", getProductsByCategory); // Removed redundant `/api/products`

// 🔹 GET SINGLE PRODUCT (Now placed **after** filtered routes)
router.get("/:id", getProductById);

// 🔹 UPDATE PRODUCT (With Image Upload)
router.put("/:id", upload.single("image"), updateProduct);

// 🔹 DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;
