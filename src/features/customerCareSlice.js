import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  incomingCallReport,
  outgoingCallReport,
  incomingCallHourReport,
  outgoingCallHourReport,
  callReportByQueue,
  reportOperatorCall,
  detaiNoAnswerCall,
  callistationPartions,
} from "../services/customer_care";
import { toast } from "react-toastify";

export const incomingCallReportAPI = createAsyncThunk(
  "CustomerCare/incomingCallReport",
  async (request) => {
    const data = await incomingCallReport(request);
    return data;
  }
);

export const outgoingCallReportAPI = createAsyncThunk(
  "CustomerCare/outgoingCallReport",
  async (request) => {
    const data = await outgoingCallReport(request);
    return data;
  }
);

export const incomingCallHourReportAPI = createAsyncThunk(
  "CustomerCare/incomingCallHourReport",
  async (request) => {
    const data = await incomingCallHourReport(request);
    return data;
  }
);

export const outgoingCallHourReportAPI = createAsyncThunk(
  "CustomerCare/outgoingCallHourReport",
  async (request) => {
    const data = await outgoingCallHourReport(request);
    return data;
  }
);

export const callReportByQueueAPI = createAsyncThunk(
  "CustomerCare/callReportByQueue",
  async (request) => {
    const data = await callReportByQueue(request);
    return data;
  }
);

export const reportOperatorCallAPI = createAsyncThunk(
  "CustomerCare/reportOperatorCall",
  async (request) => {
    const data = await reportOperatorCall(request);
    return data;
  }
);

export const detaiNoAnswerCallAPI = createAsyncThunk(
  "CustomerCare/detaiNoAnswerCall",
  async (request) => {
    const data = await detaiNoAnswerCall(request);
    // console.log("data", data);
    return data;
  }
);

export const callistationPartionsAPI = createAsyncThunk(
  "CustomerCare/callistationPartions",
  async (request) => {
    const data = await callistationPartions(request);
    // console.log("data", data);
    return data;
  }
);

export const customerCareSlice = createSlice({
  name: "CustomerCare",
  initialState: {
    dataIncoming: {},
    dataOutgoing: {},
    dataIncomingHour: {},
    dataOutgoingHour: {},
    dataByQueue: {},
    dataOperatorCall: {},
    dataNoAnswerCall: {},
    dataCallisttion: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(incomingCallReportAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataIncoming = action.payload;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(outgoingCallReportAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataOutgoing = action.payload;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(incomingCallHourReportAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataIncomingHour = action.payload;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(outgoingCallHourReportAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataOutgoingHour = action.payload;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(callReportByQueueAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataByQueue = action.payload?.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(reportOperatorCallAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataOperatorCall = action.payload?.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(detaiNoAnswerCallAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataNoAnswerCall = action.payload?.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(callistationPartionsAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataCallisttion = action.payload;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
  },
});

export const dataIncoming = (state) => state.CustomerCare.dataIncoming;
export const dataOutgoing = (state) => state.CustomerCare.dataOutgoing;
export const dataIncomingHour = (state) => state.CustomerCare.dataIncomingHour;
export const dataOutgoingHour = (state) => state.CustomerCare.dataOutgoingHour;
export const dataByQueue = (state) => state.CustomerCare.dataByQueue;
export const dataOperatorCall = (state) => state.CustomerCare.dataOperatorCall;
export const dataNoAnswerCall = (state) => state.CustomerCare.dataNoAnswerCall;
export const dataCallisttion = (state) => state.CustomerCare.dataCallisttion;
export default customerCareSlice.reducer;
