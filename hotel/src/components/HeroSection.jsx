import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] w-full">
      {/* Premium Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.4), 
            rgba(0,0,0,0.4)
          ), url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')`,
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center">
        {/* Left Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-xl text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Warm. Spicy. Irresistible.
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-6 drop-shadow-md">
            M R Hotel — The best non-veg meals in town. Freshly cooked, served hot.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              to="/menu"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
            >
              View Menu
            </Link>
            <Link
              to="/booking"
              className="inline-block bg-white/90 hover:bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
            >
              Book a Table
            </Link>
          </div>
        </motion.div>

        {/* Right Info Box */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-8 md:mt-0 md:ml-auto hidden md:block"
        >
          <div className="bg-white/95 text-gray-800 p-6 rounded-xl shadow-2xl w-80">
            <h4 className="font-bold text-lg mb-3">Why Choose Us</h4>
            <ul className="text-sm space-y-2">
              <li>Fresh & Spicy Non-Veg Dishes</li>
              <li>Quick Delivery & Dine-in</li>
              <li>Hygienic Kitchen</li>
              <li>Vibrant & Delicious Meals</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}