import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

// Get user token
const getUserToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// ---------------- FETCH BOOKINGS ----------------
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, thunkAPI) => {
    try {
      const token = getUserToken();
      return await bookingService.getBookings(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ---------------- ADD BOOKING ----------------
export const addBooking = createAsyncThunk(
  "booking/addBooking",
  async (bookingData, thunkAPI) => {
    try {
      const token = getUserToken();
      return await bookingService.addBooking(bookingData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ---------------- DELETE BOOKING ----------------
export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (id, thunkAPI) => {
    try {
      const token = getUserToken();
      return await bookingService.deleteBooking(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ---------------- SLICE ----------------
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch bookings
      .addCase(fetchBookings.pending, (state) => { state.isLoading = true; })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add booking
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      // Delete booking
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b._id !== action.payload._id);
      });
  },
});

export default bookingSlice.reducer;