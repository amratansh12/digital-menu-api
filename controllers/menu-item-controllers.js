const { mongoose } = require("mongoose");
const { MenuItem } = require("../models/menuItem.model");
const { Restaurant } = require("../models/restaurant.model");

const createMenuItem = async (req, res) => {
  const { name, description, price, category, restaurantId } = req.body;

  if (!name || !description || !price || !category || !restaurantId) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      restaurantId,
    });

    if (!menuItem) {
      session.abortTransaction();
      return res.status(501).json({ error: "Unable to create menu item" });
    }

    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { menu: menuItem._id } },
      { new: true }
    );

    if (!restaurant) {
      session.abortTransaction();
      return res.status(500).json({ error: "Unable to find the Restaurant" });
    }

    session.commitTransaction();
    return res.status(201).json({ data: menuItem });
  } catch (error) {
    console.log(error);
    session.abortTransaction();
  } finally {
    session.endSession();
  }
};

const getMenuItemById = async (req, res) => {
  const { menuId } = req.body;

  if (!menuId) {
    return res.status(401).json({ error: "Select a valid menu item" });
  }

  try {
    const menuItem = await MenuItem.findOne({ _id: menuId });

    if (!menuItem) {
      return res.status(401).json({ error: "Unable to fetch the menu item" });
    }

    return res.status(200).json({ data: menuItem });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createMenuItem, getMenuItemById };
