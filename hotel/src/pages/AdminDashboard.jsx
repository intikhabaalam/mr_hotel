import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { updateOrderStatus } from "../features/order/orderSlice";

// MENU
import {
  fetchMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../features/menu/menuSlice";

// BOOKINGS
import {
  fetchBookings,
  deleteBooking,
} from "../features/booking/bookingSlice";

// ORDERS
import { fetchAllOrders } from "../features/order/orderSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { items = [] } = useSelector((state) => state.menu);
  const { bookings = [] } = useSelector((state) => state.booking);
  const { orders: allOrders = [] } = useSelector((state) => state.order);

  const [activeTab, setActiveTab] = useState("menu");
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchBookings());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setImage("");
  };

  const handleSave = () => {
    if (!name || !price || !image) {
      alert("All fields required");
      return;
    }

    if (editingId) {
      dispatch(
        updateMenuItem({
          id: editingId,
          menuData: { name, price: Number(price), image },
        })
      );
    } else {
      dispatch(
        addMenuItem({
          name,
          price: Number(price),
          image,
          description: "Delicious food",
          category: "General",
        })
      );
    }
    resetForm();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-600";
      case "Cancelled":
        return "bg-red-600";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 bg-center bg-no-repeat bg-cover -z-20"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/background/20230716/pngtree-3d-rendering-of-online-food-ordering-and-delivery-app-image_3877884.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/30 -z-10"></div>

      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="pt-28 p-6 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-200">
            Admin Dashboard
          </h1>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["menu", "bookings", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded transition ${
                  activeTab === tab
                    ? "bg-orange-600 scale-105"
                    : "bg-white/10 backdrop-blur hover:bg-white/20"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* ================= MENU ================= */}
          {activeTab === "menu" && (
            <>
              <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl mb-10 border border-white/20">
                <h2 className="text-2xl mb-4 text-center">
                  {editingId ? "Update Item" : "Add Menu Item"}
                </h2>

                <input
                  placeholder="Food Name"
                  className="w-full p-2 mb-3 bg-black/40 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="w-full p-2 mb-3 bg-black/40 rounded"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <input
                  placeholder="Image URL"
                  className="w-full p-2 mb-4 bg-black/40 rounded"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />

                <button
                  onClick={handleSave}
                  className="w-full bg-orange-600 py-2 rounded hover:bg-orange-700 transition"
                >
                  Save
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex gap-4 border border-white/20 hover:scale-105 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded object-cover"
                    />

                    <div className="flex-1">
                      <h3>{item.name}</h3>
                      <p className="text-orange-400 font-bold">₹{item.price}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        className="bg-blue-400 px-3 py-1 rounded"
                        onClick={() => {
                          setEditingId(item._id);
                          setName(item.name);
                          setPrice(item.price);
                          setImage(item.image);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 px-3 py-1 rounded"
                        onClick={() => dispatch(deleteMenuItem(item._id))}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ================= BOOKINGS ================= */}
          {activeTab === "bookings" && (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex justify-between border border-white/20"
                >
                  <div>
                    <p>{b.user?.name}</p>
                    <p>{b.user?.email}</p>
                    <p>{new Date(b.date).toLocaleDateString()}</p>
                  </div>

                  <button
                    onClick={() => dispatch(deleteBooking(b._id))}
                    className="bg-red-500 px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ================= ORDERS ================= */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {allOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
                >
                  <div className="flex justify-between mb-3">
                    <div>
                      <p>Order #{order._id.slice(-6)}</p>
                      <p>{order.user?.name}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded text-xs ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {order.items?.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  <div className="mt-4 flex justify-between">
                    <span>Total</span>
                    <span className="text-orange-400 font-bold">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}