import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user && isSuccess) {
      navigate("/admin");
    }
  }, [user, isSuccess, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-xl shadow w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />

            <button className="w-full bg-blue-600 text-white p-2 rounded">
              Login
            </button>
          </form>

          <p className="text-sm mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
