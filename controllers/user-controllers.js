const { config } = require("dotenv");
config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
// TODO: Integrate user restaurant creation
const { Restaurant } = require("../models/restaurant.model");

const privateKey = process.env.JWT_PRIVATE_KEY;

const signJwt = (payload) => {
  return jwt.sign(payload, privateKey);
};

const createUser = async (req, res) => {
  const { email, password, role, restaurantId } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ error: "Please enter valid email, password or role" });
  }

  try {
    if (!restaurantId) {
      console.log("User is not registered in any restaurant");
    }

    const hashedPassword = bcrypt.hashSync(password, 10, (err, hash) => {
      if (err) {
        return console.log(err);
      }

      return hash;
    });

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({ token: signJwt(payload) });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const result = bcrypt.compareSync(
      password,
      user.password,
      (err, result) => {
        if (err) {
          return console.log(err);
        }

        return result;
      }
    );

    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    return res.status(202).json({ token: signJwt(payload) });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser, loginUser };
