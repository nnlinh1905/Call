import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerSync, CustomerPotentialsSync } from "../services/dongbo";
import { toast } from "react-toastify";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export const CustomerSyncAPI = createAsyncThunk(
  "Synchronized/dongbo",
  async (request) => {
    const data = await CustomerSync(request);
    return data;
  }
);

export const CustomerPotentialsSyncAPI = createAsyncThunk(
  "Synchronized/dongbokhachhangtiemnag",
  async (request) => {
    const data = await CustomerPotentialsSync(request);
    return data;
  }
);

export const SynchronizedSlice = createSlice({
  name: "Synchronized",
  initialState: {
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CustomerSyncAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        Notify.success(action?.payload?.message);
      } else {
        console.log(action?.payload?.message);
        Notify.failure(action?.payload?.message);
      }
    });
    builder.addCase(CustomerPotentialsSyncAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        Notify.success(action?.payload?.message);
      } else {
        console.log(action?.payload?.message);
        Notify.failure(action?.payload?.message);
      }
    });
  },
});

export default SynchronizedSlice.reducer;
