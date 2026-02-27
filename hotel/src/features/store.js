// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import menuReducer from "../features/menu/menuSlice";
import bookingReducer from "../features/booking/bookingSlice";
import adminReducer from "../features/admin/adminSlice";
import orderReducer from "../features/order/orderSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    booking: bookingReducer,
    admin: adminReducer,
    order: orderReducer
  },
});

export default store; 