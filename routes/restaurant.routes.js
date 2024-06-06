const express = require("express");
const {
  createRestaurant,
  joinRestaurant,
  getMenuItems,
  getRestaurantsByUserId,
  getRestaurant,
} = require("../controllers/restaurant-controllers");
const { authenticateToken } = require("../middlewares/auth-middleware");
const { adminRestriction } = require("../middlewares/admin-restriction");

const router = express.Router();

router.post("/create", adminRestriction, authenticateToken, createRestaurant);
router.post("/join", adminRestriction, authenticateToken, joinRestaurant);
router.post("/menu", authenticateToken, getMenuItems);
router.post("/info", authenticateToken, getRestaurant);
router.post(
  "/restaurants",
  adminRestriction,
  authenticateToken,
  getRestaurantsByUserId
);

module.exports = router;
