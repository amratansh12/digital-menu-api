const { config } = require("dotenv");
config();

const { mongoose } = require("mongoose");
const { Restaurant } = require("../models/restaurant.model");
const { User } = require("../models/user.model");

const createRestaurant = async (req, res) => {
  const { name, location, description, userId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const restaurant = await Restaurant.create({
      name,
      location,
      description,
      employees: [userId],
    });

    if (!restaurant) {
      session.abortTransaction();
      return res.status(400).json({ error: "Unable to create restaurant" });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { restaurants: restaurant._id } }
    );

    if (!user) {
      session.abortTransaction();
      return res.status(400).json({ error: "Unable to update user" });
    }

    res.status(201).json({ data: restaurant });
    session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    console.log(error);
  } finally {
    session.endSession();
  }
};

const joinRestaurant = async (req, res) => {
  const { userId, restaurantId } = req.body;

  if (!userId || !restaurantId) {
    return res.status(401).json({ error: "Invalid User ID or Restaurant ID" });
  }

  try {
    const isAlreadyJoined = await Restaurant.findOne({
      _id: restaurantId,
      employees: userId,
    });

    if (isAlreadyJoined) {
      return res
        .status(401)
        .json({ error: "User already joined the given Restaurant" });
    }

    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { employees: userId } },
      { new: true }
    ).populate("employees");

    return res.status(201).json({ data: restaurant });
  } catch (error) {
    console.log(error);
  }
};

const getMenuItems = async (req, res) => {
  const { restaurantId } = req.body;

  if (!restaurantId) {
    return res.status(400).json({ error: "Select a valid restaurant" });
  }

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId }).populate(
      "menu"
    );

    if (!restaurant || !restaurant.menu) {
      return res.status(400).json({ error: "Unable to fetch menu" });
    }

    return res.status(200).json({ data: restaurant.menu });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurant = async (req, res) => {
  const { restaurantId } = req.body;

  if (!restaurantId) {
    return res.status(400).json({ error: "Select a valid restaurant" });
  }

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });

    if (!restaurant) {
      return res.status(400).json({ error: "Unable to fetch employees" });
    }

    return res.status(200).json({ data: restaurant });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantsByUserId = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Userid missing" });
  }

  try {
    const restaurants = await Restaurant.find({ employees: userId });

    if (!restaurants) {
      return res.status(500).json({ error: "Unable to find the restaurants" });
    }

    return res.status(200).json({ data: restaurants });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRestaurant,
  joinRestaurant,
  getMenuItems,
  getRestaurant,
  getRestaurantsByUserId,
};
