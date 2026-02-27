import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import {
  addBooking,
  fetchBookings,
  deleteBooking,
} from "../features/booking/bookingSlice";

export default function Booking() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);

  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addBooking({
        name,
        date,
        time: date,
        persons: Number(guests),
      })
    );

    setName("");
    setGuests(1);
    setDate("");
  };

  return (
    <>
      {/* 🔥 Fixed Background - page bade hone par bhi stretch nahi hoga */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            "url('https://thumbs.dreamstime.com/z/flat-d-isometric-restaurant-table-online-reservation-smartphone-vector-illustration-isometry-mobile-app-concept-78218331.jpg')",
        }}
      />

      {/* Fixed Overlay */}
      <div className="fixed inset-0 bg-black/40 -z-10" />

      {/* Main Content */}
      <div className="min-h-screen relative text-white">
        <Navbar />

        <div className="p-8 max-w-4xl mx-auto">

          {/* 🔥 FORM ANIMATION */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-10 border border-white/20"
          >
            <h1 className="text-2xl font-bold mb-4 text-orange-400">
              Book a Table
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">

              <motion.input
                whileFocus={{ scale: 1.05 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none"
                placeholder="Your name"
                required
              />

              <motion.input
                whileFocus={{ scale: 1.05 }}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                type="number"
                min={1}
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none"
                placeholder="Guests"
                required
              />

              <motion.input
                whileFocus={{ scale: 1.05 }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="datetime-local"
                className="w-full p-3 rounded bg-white/20 border border-white/30 text-white focus:outline-none"
                required
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-orange-500 hover:bg-orange-600 transition p-3 rounded font-semibold shadow-lg"
              >
                Book Now
              </motion.button>
            </form>
          </motion.div>

          {/* 🔥 BOOKINGS LIST ANIMATION */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold mb-4 text-orange-400">
              My Bookings
            </h2>

            {bookings.length === 0 && (
              <p className="text-gray-300">No bookings yet</p>
            )}

            {bookings.map((b, index) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 p-4 mb-3 rounded-lg flex justify-between items-center border border-white/20"
              >
                <div>
                  <p><b>Date:</b> {new Date(b.date).toLocaleString()}</p>
                  <p><b>Guests:</b> {b.persons}</p>
                  <p>
                    <b>Status:</b>{" "}
                    <span
                      className={
                        b.status === "Approved"
                          ? "text-green-400"
                          : b.status === "Rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }
                    >
                      {b.status}
                    </span>
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(deleteBooking(b._id))}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow"
                >
                  Cancel
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

        </div>

        <Footer />
      </div>
    </>
  );
}