const express = require('express');
require('dotenv').config();
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/dbConfig');
const errorHandler = require('./middleware/errorHandler');

// Routes
const menuRoutes = require("./routes/menuRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes")


// ---------------- PORT ----------------
const PORT = process.env.PORT || 5000;
const app = express();

// ---------------- Connect DB ----------------
connectDB();

// ---------------- Middleware ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- Dev CORS ----------------
if (process.env.NODE_ENV !== "production") {
  const cors = require('cors');
  app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
  }));
}

// ---------------- Routes ----------------
app.use("/api/auth", authRoutes);     
app.use("/api/menu", menuRoutes);     
app.use("/api/booking", bookingRoutes);  
app.use("/api/admin", adminRoutes);
app.use("/api/orders",orderRoutes)
    

// ---------------- Production Serve React ----------------
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "hotel/dist")));

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "hotel", "dist", "index.html"));
  });

} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// ---------------- Error Handler ----------------
app.use(errorHandler);

// ---------------- Start Server ----------------
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT: ${PORT}`.bgBlue.white);
});