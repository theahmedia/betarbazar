import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
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
import checkUserRoutes from "./routes/auth.route.js";
import { createServer } from "http"; 
import { Server } from "socket.io";

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

// Middleware
const allowedOrigins = ["http://localhost:5173", "http://192.168.110.159:5173"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Disposition"], // Allows downloading files
}));


app.use(express.json()); // Handles JSON requests
app.use("/uploads/products", express.static(path.join("uploads/products")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Create an HTTP server from Express
const server = createServer(app);

// Initialize Socket.IO with the server
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'], 
  pingInterval: 10000, 
  pingTimeout: 5000, 
});

// Handle Socket.IO connections
let lastLogTime = 0;

io.on("connection", (socket) => {
  const connectedClients = Object.keys(io.sockets.sockets).length;

  if (connectedClients > 10) {
    const now = Date.now();
    if (now - lastLogTime > 5000) { // Log only once every 5 seconds
      console.log("🚨 Too many connections, blocking new clients!");
      lastLogTime = now;
    }
    socket.disconnect(true);
    return;
  }

  console.log(`✅ New client connected: ${socket.id}, Total: ${connectedClients}`);

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
app.use("/api", checkUserRoutes); 

app.use("/invoices", express.static(path.join(process.cwd(), "invoices")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
