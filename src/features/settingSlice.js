import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updatePBX,
  showPBX,
  updateActive,
  ShowByPhone,
  updateActiveClickToCall,
} from "../services/setting";
import { toast } from "react-toastify";

export const updatePBXAPI = createAsyncThunk("Setting/PBX", async (request) => {
  const data = await updatePBX(request);
  return data;
});

export const ShowByPhoneAPI = createAsyncThunk(
  "Setting/ShowByPhone",
  async (request) => {
    // console.log("request", request);
    const data = await ShowByPhone(request);
    // console.log("data", data);
    return data;
  }
);

export const showPBXAPI = createAsyncThunk("Setting/ShowPBX", async () => {
  const data = await showPBX();
  console.log("dâtádads", data);
  return data;
});

export const updateActiveAPI = createAsyncThunk(
  "Setting/active",
  async (request) => {
    const data = await updateActive(request);
    return data;
  }
);

export const updateActiveClickToCallAPI = createAsyncThunk(
  "Setting/updateActiveClickToCall",
  async (request) => {
    const data = await updateActiveClickToCall(request);
    return data;
  }
);

export const settingSlice = createSlice({
  name: "Setting",
  initialState: {
    dataPBX: {},
    dataShowByPhone: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePBXAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success("đã cập nhật");
      } else {
        toast.error("cập nhật thất bại: " + action.payload.message);
      }
    });

    builder.addCase(showPBXAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataPBX = action.payload;
      } else {
        toast.error("load thất bại");
      }
    });

    builder.addCase(ShowByPhoneAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataShowByPhone = action.payload.data;
      } else {
        toast.error("load thất bại");
      }
    });

    builder.addCase(updateActiveAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        // toast.success("đã cập nhật");
      } else {
        toast.error("cập nhật thất bại: " + action.payload.message);
      }
    });

    builder.addCase(updateActiveClickToCallAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        // toast.success("đã cập nhật");
      } else {
        toast.error("cập nhật thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataPBX = (state) => state.Setting.dataPBX;
export const dataShowByPhone = (state) => state.Setting.dataShowByPhone;

export default settingSlice.reducer;
