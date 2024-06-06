const express = require("express");
const { authenticateToken } = require("../middlewares/auth-middleware");
const { adminRestriction } = require("../middlewares/admin-restriction");
const { generateQRCode } = require("../controllers/qrcode-controllers");

const router = express.Router();

router.post("/generate", authenticateToken, adminRestriction, generateQRCode);

module.exports = router;
