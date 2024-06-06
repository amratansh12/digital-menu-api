const express = require("express");
const { authenticateToken } = require("../middlewares/auth-middleware");
const { adminRestriction } = require("../middlewares/admin-restriction");
const {
  createMenuItem,

  getMenuItemById,
} = require("../controllers/menu-item-controllers");

const router = express.Router();

router.post("/create", adminRestriction, authenticateToken, createMenuItem);
router.get("/", authenticateToken, getMenuItemById);

module.exports = router;
