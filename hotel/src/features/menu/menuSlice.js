import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuService from "./menuService";

const user = JSON.parse(localStorage.getItem("user"));

// Fetch menu
export const fetchMenu = createAsyncThunk("menu/fetchMenu", async (_, thunkAPI) => {
  try {
    return await menuService.getMenu();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Add menu
export const addMenuItem = createAsyncThunk("menu/addMenuItem", async (menuData, thunkAPI) => {
  try {
    const token = user?.token;
    return await menuService.createMenu(menuData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Update menu
export const updateMenuItem = createAsyncThunk("menu/updateMenuItem", async ({ id, menuData }, thunkAPI) => {
  try {
    const token = user?.token;
    return await menuService.updateMenu(id, menuData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Delete menu
export const deleteMenuItem = createAsyncThunk("menu/deleteMenuItem", async (id, thunkAPI) => {
  try {
    const token = user?.token;
    return await menuService.deleteMenu(id, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMenu.pending, (state) => { state.isLoading = true; })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add
      .addCase(addMenuItem.fulfilled, (state, action) => {
         console.log(action.payload);
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // Delete
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload._id);
      });
  },
});

export default menuSlice.reducer;