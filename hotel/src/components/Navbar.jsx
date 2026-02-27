import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md font-medium ${
        pathname === to ? "text-orange-600" : "text-gray-700 hover:text-orange-600"
      }`}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-white/70 backdrop-blur sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <img src="logo" alt="" />
            <Link to="/" className="text-2xl font-bold text-orange-600">
              M R Hotel
            </Link>
            <p className="hidden md:block text-sm text-gray-500">
              Best Non-Veg Food
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/booking">Booking</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            {user ? (
              <>
                <span className="px-3 py-2 font-medium text-gray-700">
                  Welcome, {user.name}
                </span>
                {user.isAdmin && <NavLink to="/admin">Admin</NavLink>}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col gap-1">
              <NavLink to="/menu">Menu</NavLink>
              <NavLink to="/booking">Booking</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              {user ? (
                <>
                  {user.isAdmin && <NavLink to="/admin">Admin</NavLink>}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

