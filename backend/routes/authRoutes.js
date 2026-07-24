const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", AuthController.register);

router.post("/login", AuthController.login);


// Update Device Token
router.patch(
    "/device-token",
    authMiddleware,
    AuthController.updateDeviceToken
);


module.exports = router;