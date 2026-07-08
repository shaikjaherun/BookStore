import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";

import authRoutes from "./routes/authRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send("📚 Book Store Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});