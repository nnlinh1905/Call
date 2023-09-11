import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Widget, CallReport } from "../services/dashboard";
import { toast } from "react-toastify";

export const WidgetAPI = createAsyncThunk(
  "Dashboard/widget",
  async (request) => {
    const data = await Widget(request);
    return data;
  }
);

export const CallReportAPI = createAsyncThunk(
  "Dashboard/CallReport",
  async (request) => {
    const data = await CallReport(request);
    return data;
  }
);

export const departmentSlice = createSlice({
  name: "Dashboard",
  initialState: {
    dataWidget: [],
    dataCallReport: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(WidgetAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataWidget = action.payload.statistical;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });

    builder.addCase(CallReportAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataCallReport = action.payload;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
  },
});

export const dataWidget = (state) => state.Dashboard.dataWidget;
export const dataCallReport = (state) => state.Dashboard.dataCallReport;

export default departmentSlice.reducer;
