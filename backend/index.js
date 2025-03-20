require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const agentRoutes = require("./routes/agentRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();

// ✅ Load environment variables and connect to DB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Allows handling form data
app.use(cors());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api", dataRoutes);

// ✅ Test Route
app.get("/test", (req, res) => res.send("✅ API is working!"));

// ✅ Protected Route (Requires Auth)
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "✅ Access granted to protected data!",
    user: req.user, // Decoded token data
  });
});

// ✅ Global Error Handler (Catches all unhandled errors)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
