const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: { type: String },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = { Restaurant };
