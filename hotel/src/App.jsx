// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import Booking from "./pages/Booking";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/AdminDashboard";
// import OrdersPage from "./pages/OrdersPage";
// import { ProtectedRoute } from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/menu" element={<Menu />} />
//       <Route path="/booking" element={<Booking />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
      
//       {/* Orders page - accessible to any logged-in user */}
//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute adminOnly={false}>
//             <OrdersPage />
//           </ProtectedRoute>
//         }
//       />
      
//       {/* Admin page - only for admin users */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute adminOnly={true}>
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import OrdersPage from "./pages/OrdersPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const location = useLocation();

  const fullText = "Welcome to MR Hotel";

  // 🔥 Typing Effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 60);
  }, []);

  // 🔥 First Load Loader
  useEffect(() => {
    setTimeout(() => {
      const loader = document.querySelector(".loader");
      if (loader) loader.classList.add("fade-out");

      setTimeout(() => {
        setLoading(false);
      }, 700);
    }, 2500);
  }, []);

  // 🔥 Route Change Loader (real website feel)
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, [location.pathname]);

if (loading) {
  return (
    <div className="loader">
      <div className="loader-content">
        <h1 className="logo-text">MR HOTEL</h1>
        <div className="line"></div>
        <p className="tagline">Luxury & Comfort</p>
      </div>
    </div>
  );
}

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Orders page */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute adminOnly={false}>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      {/* Admin page */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}