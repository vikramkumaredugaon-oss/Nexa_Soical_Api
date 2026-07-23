const express = require("express");

const router = express.Router();


const OtpController =
require("../controllers/OtpController");



router.post(
"/send",
OtpController.send
);



router.post(
"/verify",
OtpController.verify
);



module.exports = router;