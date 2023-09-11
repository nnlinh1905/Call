import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listCallPurpose,
  addCallPurpose,
  editCallPurpose,
  deleteCallPurpose,
} from "../services/call_purpose";
import { toast } from "react-toastify";

export const listCallPurposeAPI = createAsyncThunk(
  "Purpose/list",
  async (request) => {
    const data = await listCallPurpose(request);
    return data;
  }
);

export const addCallPurposeAPI = createAsyncThunk(
  "Purpose/add",
  async (request) => {
    const data = await addCallPurpose(request);
    return data;
  }
);

export const editCallPurposeAPI = createAsyncThunk(
  "Purpose/edit",
  async (request) => {
    const data = await editCallPurpose(request);
    return data;
  }
);

export const deleteCallPurposeAPI = createAsyncThunk(
  "Purpose/delete",
  async (id) => {
    const data = await deleteCallPurpose(id);
    return data;
  }
);

export const callPurposeSlice = createSlice({
  name: "Purpose",
  initialState: {
    dataCallPurpose: {},
    dataCallPurposeSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listCallPurposeAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataCallPurpose = action.payload.data;
        let data = action.payload.data;
        let dataCallPurposeSelect = [];
        data.forEach((item) => {
          dataCallPurposeSelect.push({ value: item.id, label: item.name });
        });
        state.dataCallPurposeSelect = dataCallPurposeSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addCallPurposeAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCallPurposeAPI();
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editCallPurposeAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteCallPurposeAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listCallPurposeAPI();
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataCallPurpose = (state) => state.Purpose.dataCallPurpose;
export const dataCallPurposeSelect = (state) =>
  state.Purpose.dataCallPurposeSelect;

export default callPurposeSlice.reducer;
