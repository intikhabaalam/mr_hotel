// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import orderService from './orderService';

// const initialState = {
//   orders: [],        // For admin (all orders)
//   myOrders: [],      // For user (my orders)
//   loading: false,
//   error: null,
//   success: false
// };

// // Create order - POST /api/admin
// export const createOrder = createAsyncThunk(
//   'order/create',
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const response = await orderService.createOrder(orderData);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to create order');
//     }
//   }
// );

// // Get user's orders - GET /api/admin/my
// export const fetchMyOrders = createAsyncThunk(
//   'order/fetchMyOrders',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await orderService.getMyOrders();
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to fetch your orders');
//     }
//   }
// );

// // Get all orders (admin) - GET /api/admin
// export const fetchAllOrders = createAsyncThunk(
//   'order/fetchAllOrders',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await orderService.getAllOrders();
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to fetch all orders');
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     clearOrderError: (state) => {
//       state.error = null;
//     },
//     clearOrderSuccess: (state) => {
//       state.success = false;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Order
//       .addCase(createOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.myOrders = [action.payload, ...state.myOrders];
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })

//       // Fetch My Orders
//       .addCase(fetchMyOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMyOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.myOrders = action.payload;
//       })
//       .addCase(fetchMyOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch All Orders (Admin)
//       .addCase(fetchAllOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchAllOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { clearOrderError, clearOrderSuccess } = orderSlice.actions;
// export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  orders: [],
  myOrders: [],
  loading: false,
  error: null,
  success: false,
};

// CREATE ORDER
export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue }) => {
    try {
      return await orderService.createOrder(orderData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// MY ORDERS
export const fetchMyOrders = createAsyncThunk(
  "order/my",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getMyOrders();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ALL ORDERS
export const fetchAllOrders = createAsyncThunk(
  "order/all",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getAllOrders();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ UPDATE STATUS
export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await orderService.updateOrderStatus(id, { status });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ DELETE ORDER
export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (id, { rejectWithValue }) => {
    try {
      await orderService.deleteOrder(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // MY ORDERS
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })

      // ALL ORDERS
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      // ✅ UPDATE
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      // ✅ DELETE
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (o) => o._id !== action.payload
        );
      });
  },
});

export default orderSlice.reducer;
