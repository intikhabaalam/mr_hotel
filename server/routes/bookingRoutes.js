const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  deleteBooking,
} = require("../controllers/bookingController");

const  protect  = require("../middleware/authMiddleware")
const  adminOnly  = require("../middleware/adminMiddleware")

const router = express.Router();

/* USER */
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect,deleteBooking);

/* ADMIN */
router.get("/", protect, adminOnly, getAllBookings);

module.exports = router;
