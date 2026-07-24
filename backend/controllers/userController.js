const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");


router.patch(
    "/device-token",
    authMiddleware,
    UserController.updateDeviceToken
);


module.exports = router;