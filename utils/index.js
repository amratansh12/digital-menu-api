const { config } = require("dotenv");
config();

const mongoose = require("mongoose");

const uri = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);

    console.log("Connection to database success");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb };
