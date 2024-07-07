const { config } = require("dotenv");
config();

const express = require("express");
const cors = require("cors");
const { connectDb } = require("../utils/index.js");
const authRoutes = require("../routes/user.routes.js");
const restaurantRoutes = require("../routes/restaurant.routes.js");
const menuRoutes = require("../routes/menu-item.routes.js");
const qrcodeRoutes = require("../routes/qrcode.routes.js");
const orderRoutes = require("../routes/order.routes.js");

const app = express();

app.use(
  cors({
    origin: "https://digital-menu-sandy.vercel.app",
  })
);
app.use(express.json());

connectDb();

app.get("/", (req, res) => res.status(200).json({ data: "Server is running" }));

app.use("/auth/v1", authRoutes);

app.use("/restaurant/v1", restaurantRoutes);

app.use("/menu/v1", menuRoutes);

app.use("/qrcode/v1", qrcodeRoutes);

app.use("/payment/v1", orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
