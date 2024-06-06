const { config } = require("dotenv");
config();

const { Restaurant } = require("../models/restaurant.model");
const QRCode = require("qrcode");

const generateQRCode = async (req, res) => {
  const { restaurantId } = req.body;

  if (!restaurantId) {
    return res.status(401).json({ error: "Restaurant ID is missing" });
  }

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId });

    if (!restaurant) {
      return res.status(500).json({ error: "Unable to get restaurant" });
    }

    const frontendUrl = `${process.env.FRONTEND_URL}/home/menu?result=${restaurant._id}`;

    QRCode.toDataURL(frontendUrl, (err, url) => {
      if (err) {
        return console.log(err);
      }

      return res.status(200).json({ data: url });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateQRCode };
