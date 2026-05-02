require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

// Middleware
app.use(express.json());

// Debug (optional - remove later)
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Event Registration API is running...");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});