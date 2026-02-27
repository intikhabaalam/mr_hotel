import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/card";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../features/menu/menuSlice";

export default function Menu() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const menuItems = Array.isArray(items) ? items : [];

  return (
    <div className="relative min-h-screen text-white flex flex-col">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 bg-center bg-no-repeat bg-cover -z-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        }}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/40 -z-10"></div>

      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="max-w-6xl mx-auto p-8">
          {/* Heading */}
          <h1 className="text-4xl font-bold mb-8 text-center text-orange-400">
            Our Menu
          </h1>

          {/* Glass Container */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="grid md:grid-cols-3 gap-6">
              {menuItems.map((it, index) => (
                <div
                  key={it._id || index}
                  className="transform hover:scale-105 transition duration-300"
                >
                  <Card
                    title={it.name}
                    price={it.price}
                    img={it.image || "/images/hero.jpg"}
                    badge={index < 4 ? "Popular" : null}
                  >
                    Taste our delicious {it.name?.toLowerCase()} made with fresh spices.
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}