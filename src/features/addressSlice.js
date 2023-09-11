import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nations, provinces, dictricts } from "../services/address";
import { toast } from "react-toastify";

export const nationsAPI = createAsyncThunk("Address/nation", async () => {
  const data = await nations();
  return data;
});

export const provincesAPI = createAsyncThunk("Address/province", async () => {
  const data = await provinces();
  return data;
});

export const dictrictsAPI = createAsyncThunk(
  "Address/dictrict",
  async (request) => {
    const data = await dictricts(request);
    return data;
  }
);

export const addressSlice = createSlice({
  name: "Address",
  initialState: {
    datanations: {},
    dataprovinces: {},
    datadictricts: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(nationsAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        // state.datanations = action.payload.data;
        const data = action.payload.data;
        const datanations = [];
        data.map((item) => {
          datanations.push({ value: item.id, label: item.name });
        });
        state.datanations = datanations;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(provincesAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        // state.dataprovinces = action.payload.data;
        const data = action.payload.data;
        const dataprovinces = [];
        data.map((item) => {
          dataprovinces.push({ value: item.id, label: item.name });
        });
        state.dataprovinces = dataprovinces;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(dictrictsAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        // state.datadictricts = action.payload.data;
        const data = action.payload.data;
        const datadictricts = [];
        data.map((item) => {
          datadictricts.push({ value: item.id, label: item.name });
        });
        state.datadictricts = datadictricts;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
  },
});
export const datanations = (state) => state.Address.datanations;
export const dataprovinces = (state) => state.Address.dataprovinces;
export const datadictricts = (state) => state.Address.datadictricts;

export default addressSlice.reducer;
