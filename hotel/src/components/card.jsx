
import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../features/order/orderSlice";

export default function Card({ title, price, img, badge, children, itemId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.order);

  const handleOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const orderData = {
      items: [
        {
          menuItem: itemId,
          name: title,
          price: Number(price),
          quantity: 1
        }
      ],
      totalAmount: Number(price)
    };

    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      if (result) {
        navigate("/orders");
      }
    } catch (error) {
      alert(error || "Failed to place order. Please try again.");
    }
  };

  return (
    <motion.div whileHover={{ y: -6 }} className="bg-white/20 rounded-2xl shadow-lg overflow-hidden">
      {img && <img src={img} alt={title} className="w-full h-44 object-cover" />}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {badge && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{badge}</span>}
        </div>
        <p className="mt-2 text-gray-200">{children}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold">₹{price}</div>
          <button 
            onClick={handleOrder}
            disabled={loading}
            className={`bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Placing Order...' : 'Order Now'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}