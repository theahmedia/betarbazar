import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import compression from "compression";
import { createServer } from "http"; 
import { Server } from "socket.io";
import ConnectDB from "./config/dbconncet.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import roleRoutes from "./routes/role.route.js";
import purchaseRoutes from "./routes/purchase.route.js";
import supplierRoutes from "./routes/supplier.route.js";
import categoryRoutes from "./routes/category.route.js";
import brandRoutes from "./routes/brand.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";

// Load environment variables
dotenv.config();

// Ensure MongoDB URI exists
if (!process.env.MONGO_URI) {
  console.error("❌ MongoDB URI is missing! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
ConnectDB();

// Initialize Express App
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security & Performance Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression

// CORS Setup
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Disposition"], 
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.resolve("uploads"), { immutable: true, maxAge: "1d" }));
app.use("/invoices", express.static(path.resolve("invoices"), { immutable: true, maxAge: "1d" }));

// Create an HTTP server
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling'], 
  pingInterval: 10000, 
  pingTimeout: 5000, 
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`✅ New client connected: ${socket.id}`);

  socket.on("productAdded", (product) => {
    console.log("Received product:", product);
    io.emit("newProduct", product);
  });

  socket.on("categoryCreated", (category) => {
    console.log("Received category:", category);
    io.emit("newCategory", category);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", roleRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api", brandRoutes);
app.use("/api/orders", orderRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
