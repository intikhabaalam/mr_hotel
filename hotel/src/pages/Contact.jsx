
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <>
      <Navbar />

      {/* Background Section */}
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/d8/d1/f8/d8d1f89a1dda4422b078da852211e942.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center text-white px-6"
        >
          {/* Heading */}
          <h1 className="text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-200 mb-10">
            We’d love to connect with you
          </p>

          {/* Contact Info */}
          <div className="space-y-4 text-lg">

            <motion.p whileHover={{ scale: 1.05 }}>
              📞{" "}
              <a href="tel:+919827550629" className="hover:text-orange-400">
                +91 9827550629
              </a>
            </motion.p>

       <motion.p whileHover={{ scale: 1.05 }}>
  📍{" "}
  <a
    href="https://www.google.com/maps/place/Mochipura,+Nayapura,+Barnagar,+Madhya+Pradesh+456771/@23.0431397,75.3768661,18z/data=!3m1!4b1!4m6!3m5!1s0x3963bfb0f05fde97:0x252051bfaf464342!8m2!3d23.0434742!4d75.3781638!16s%2Fg%2F11b6b8n22q?entry=ttu&g_ep=EgoyMDI2MDIxNy4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-orange-400"
  >
    Toronto Colony,Barnagar
  </a>
</motion.p>
          </div>

          {/* Button */}
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+919876543210"
            className="inline-block mt-10 px-8 py-3 bg-orange-500 rounded-full text-white font-semibold shadow-lg hover:bg-orange-600 transition"
          >
            Call Now
          </motion.a>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
