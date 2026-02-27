import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const user = JSON.parse(localStorage.getItem("user"));

// Fetch bookings
export const fetchBookings = createAsyncThunk("booking/fetchBookings", async (_, thunkAPI) => {
  try {
    const token = user?.token;
    return await bookingService.getBookings(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Add booking
export const addBooking = createAsyncThunk("booking/addBooking", async (bookingData, thunkAPI) => {
  try {
    const token = user?.token;
    return await bookingService.addBooking(bookingData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Delete booking
export const deleteBooking = createAsyncThunk("booking/deleteBooking", async (id, thunkAPI) => {
  try {
    const token = user?.token;
    return await bookingService.deleteBooking(id, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

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
