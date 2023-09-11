import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listUserPosition,
  addUserPosition,
  editUserPosition,
  deleteUserPosition,
} from "../services/users_position";
import { toast } from "react-toastify";

export const listUserPositionAPI = createAsyncThunk(
  "UserPosition/list",
  async (request) => {
    const data = await listUserPosition(request);
    return data;
  }
);

export const addUserPositionAPI = createAsyncThunk(
  "UserPosition/add",
  async (request) => {
    const data = await addUserPosition(request);
    return data;
  }
);

export const editUserPositionAPI = createAsyncThunk(
  "UserPosition/edit",
  async (request) => {
    const data = await editUserPosition(request);
    return data;
  }
);

export const deleteUserPositionAPI = createAsyncThunk(
  "UserPosition/delete",
  async (id) => {
    const data = await deleteUserPosition(id);
    return data;
  }
);

export const userStatusSlice = createSlice({
  name: "UserPosition",
  initialState: {
    dataUserPosition: {},
    dataUserPositionSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listUserPositionAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataUserPosition = action.payload.data;
        let data = action.payload.data;
        let dataUserPositionSelect = [];
        data.forEach((item) => {
          dataUserPositionSelect.push({ value: item.id, label: item.name });
        });
        state.dataUserPositionSelect = dataUserPositionSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addUserPositionAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listUserPositionAPI();
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editUserPositionAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteUserPositionAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listUserPositionAPI();
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataUserPosition = (state) => state.UserPosition.dataUserPosition;
export const dataUserPositionSelect = (state) =>
  state.UserPosition.dataUserPositionSelect;

export default userStatusSlice.reducer;
