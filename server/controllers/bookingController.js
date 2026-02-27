const Booking = require("../models/bookingModel");

/* ================= USER ================= */

// Create booking (user)
const createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user._id,
    ...req.body,
  });

  res.status(201).json(booking);
};

// Get own bookings (user)
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json(bookings);
};

/* ================= ADMIN ================= */

// Get all bookings (admin)
const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(bookings);
};

// Delete booking (admin only)
const deleteBooking = async (req, res) => {   
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  await booking.deleteOne();
  console.log("Deleted booking:", booking)
  res.json({_id: req.params.id});
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  deleteBooking,
};

