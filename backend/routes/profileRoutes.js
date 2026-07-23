const express = require("express");

const ProfileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Create Profile
router.post(
    "/create",
    authMiddleware,
    ProfileController.create
);


// Get Profile
router.get(
    "/",
    authMiddleware,
    ProfileController.getProfile
);


// Update Profile
router.put(
    "/update",
    authMiddleware,
    ProfileController.update
);


module.exports = router;