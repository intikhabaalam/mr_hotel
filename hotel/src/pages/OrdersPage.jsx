import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchMyOrders } from "../features/order/orderSlice";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { myOrders = [], loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400/20 text-yellow-300";
      case "Completed":
        return "bg-green-400/20 text-green-300";
      case "Cancelled":
        return "bg-red-400/20 text-red-300";
      default:
        return "bg-gray-400/20 text-gray-300";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 bg-center bg-no-repeat bg-cover -z-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498654896293-37aacf113fd9')",
        }}
      />
      <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-30">
        <Navbar />
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full z-30">
        <Footer />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto pt-28 pb-28 p-6 max-w-4xl mx-auto">
        {!user ? (
          <div className="text-center py-12 flex flex-col items-center">
            <p className="text-xl">Please login to view your orders</p>
            <a
              href="/login"
              className="inline-block mt-4 bg-orange-600 px-6 py-2 rounded-lg hover:bg-orange-700"
            >
              Login
            </a>
          </div>
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center mb-8 text-orange-400"
            >
              My Orders
            </motion.h1>

            {loading ? (
              <div className="text-center py-12">
                <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : myOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
              >
                <p className="text-gray-300 mb-4">No orders yet</p>
                <a
                  href="/menu"
                  className="inline-block bg-orange-600 px-6 py-2 rounded-lg hover:bg-orange-700"
                >
                  Browse Menu
                </a>
              </motion.div>
            ) : (
              <div className="space-y-5">
                {myOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Order #{order._id?.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="border-t border-white/10 pt-4">
                      {order.items?.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm mb-2"
                        >
                          <span className="text-gray-200">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-white font-medium">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
                      <span className="text-gray-300 font-semibold">Total</span>
                      <span className="text-orange-400 font-bold text-lg">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}