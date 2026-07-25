const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Debug: Check if MONGO_URI is loaded
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager API is running...",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
