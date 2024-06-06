const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be atleast 8 characters long"],
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    required: true,
  },
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: false,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: false,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
