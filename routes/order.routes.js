const express = require("express");
const { authenticateToken } = require("../middlewares/auth-middleware.js");
const {
  createOrder,
  verifyOrder,
  getOrdersByRestaurantId,
  getOrdersByUserId,
  updateOrderStatus,
} = require("../controllers/order-controllers.js");

const router = express.Router();

router.post("/create", createOrder);
router.post("/success", verifyOrder);
router.post("/restaurant/orders", authenticateToken, getOrdersByRestaurantId);
router.post("/user/orders", authenticateToken, getOrdersByUserId);
router.post("/update", authenticateToken, updateOrderStatus);

module.exports = router;
