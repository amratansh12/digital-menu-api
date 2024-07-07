const { config } = require("dotenv");
config();

const { Orders } = require("../models/orders.model");
const { User } = require("../models/user.model");
const { Restaurant } = require("../models/restaurant.model");
const Razorpay = require("razorpay");
const crypto = require("node:crypto");

const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_6969",
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(500).json({ error: "Unable to create order" });
    }

    return res.status(201).json({ data: order });
  } catch (error) {
    console.log(error);
  }
};

const verifyOrder = async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      restaurantId,
      userId,
      items,
      tableNumber,
    } = req.body;

    const secret = process.env.RAZORPAY_API_SECRET;
    const shasum = crypto.createHmac("sha256", secret);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res.status(400).json({ error: "Unauthorized transaction" });

    const order = await Orders.create({
      items,
      restaurantId,
      userId,
      status: "Pending",
      tableNumber,
    });

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { orders: order._id } }
    );
    await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { orders: order._id } }
    );

    if (!order) {
      return res
        .status(500)
        .json({ error: "Unable to create order, Server error" });
    }

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "UserID missing" });
  }

  try {
    const user = await User.findOne({ _id: userId }).populate({
      path: "orders",
      populate: {
        path: "items",
      },
    });

    if (!user) {
      return res.status(500).json({ error: "Unable to fetch orders" });
    }

    res.status(200).json({ data: user.orders });
  } catch (error) {
    console.log(error);
  }
};

const getOrdersByRestaurantId = async (req, res) => {
  const { restaurantId } = req.body;

  if (!restaurantId) {
    return res.status(400).json({ error: "RestaurantID missing" });
  }

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId }).populate(
      {
        path: "orders",
        populate: {
          path: "items",
        },
      }
    );

    if (!restaurant) {
      return res.status(500).json({ error: "Unable to fetch orders" });
    }

    res.status(200).json({ data: restaurant.orders });
  } catch (error) {
    console.log(error);
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return res.status(400).json({ error: "Specify the order and status" });
  }

  try {
    await Orders.findOneAndUpdate({ _id: orderId }, { status });

    return res.status(200).json({ data: "Success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  verifyOrder,
  getOrdersByRestaurantId,
  getOrdersByUserId,
  updateOrderStatus,
};
