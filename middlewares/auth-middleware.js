const { config } = require("dotenv");
config();

const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const privateKey = process.env.JWT_PRIVATE_KEY;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const auths = authHeader.split(" ");

  if (auths[0] === "Bearer") {
    const token = auths[1];

    try {
      const decoded = jwt.verify(token, privateKey);

      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      next();
    } catch (error) {
      return res.status(501).json({ error: "Token error" });
    }
  }
};

module.exports = { authenticateToken };
