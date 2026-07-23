const express = require("express");
const cors = require("cors");

require("./config/database");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/otp", otpRoutes);

app.use("/api/profile", profileRoutes);


// Test API
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Nexa Social Backend Running..."
    });

});


module.exports = app;