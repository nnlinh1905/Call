import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { Block } from "notiflix/build/notiflix-block-aio";
import { callMonitor, spyCall } from "../services/call_monitor";
import { toast } from "react-toastify";

export const callMonitorAPI = createAsyncThunk(
  "CallMonitor/callMonitor",
  async () => {
    const request = {
      a: "1",
    };
    const data = await callMonitor(request);
    console.log("callMonitorAPI", data);
    return data;
  }
);

export const spyCallAPI = createAsyncThunk(
  "CallMonitor/spyCall",
  async (request) => {
    const data = await spyCall(request);
    return data;
  }
);
export const callMonitorSlice = createSlice({
  name: "CallMonitor",
  initialState: {
    dataCallMonitor: [],
    dataSpyCall: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(callMonitorAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        let dataCallMonitor = [];
        let data = action.payload.data;
        data.map((item, index) => {
          let obj = {};
          obj.id = item.id;
          obj.img = null;
          obj.full_name = item.name;
          obj.extension = item.extension;
          obj.status = item.status_ext;
          obj.status_name = item.status_ext_name;
          dataCallMonitor.push(obj);
        });
        state.dataCallMonitor = dataCallMonitor;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(spyCallAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataSpyCall = action.payload;
        toast.success("Thao tác thành công");
      } else {
        toast.error(action?.payload?.message);
        Notiflix.Block.remove(".notiflix-" + action.payload.data);
      }
    });
  },
});

export const dataCallMonitor = (state) => state.CallMonitor.dataCallMonitor;
export const dataSpyCall = (state) => state.CallMonitor.dataSpyCall;

export default callMonitorSlice.reducer;
