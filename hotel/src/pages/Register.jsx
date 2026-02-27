import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, phone, password }));
  };

  useEffect(() => {
    if (isSuccess && user) {
      navigate(user.isAdmin ? "/admin" : "/");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-xl shadow w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          {isError && <p className="text-red-600 text-sm text-center mb-2">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full p-2 border rounded" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-2 border rounded" required />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone (10 digits)" className="w-full p-2 border rounded" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" required />

            <button disabled={isLoading} className="w-full bg-green-600 text-white p-2 rounded">
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-sm mt-3 text-center">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
