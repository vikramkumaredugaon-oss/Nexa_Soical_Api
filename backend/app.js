const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/otp", otpRoutes);

app.use("/api/profile", profileRoutes);


app.get("/", (req,res)=>{
    res.json({
        success:true,
        message:"Nexa Social Backend Running"
    });
});


module.exports = app;