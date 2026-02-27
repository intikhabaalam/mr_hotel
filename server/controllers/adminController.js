const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const Menu = require("../models/menuModel");

const getAdminStats = async (req, res, next) => {
  try {
    const users = await User.countDocuments();
    const bookings = await Booking.countDocuments();
    const menuItems = await Menu.countDocuments();

    res.json({
      users,
      bookings,
      menuItems
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAdminStats };