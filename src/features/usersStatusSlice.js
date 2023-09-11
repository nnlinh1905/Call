import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listUserStatus,
  addUserStatus,
  editUserStatus,
  deleteUserStatus,
} from "../services/users_status";
import { toast } from "react-toastify";

export const listUserStatusAPI = createAsyncThunk(
  "UserStatus/list",
  async (request) => {
    const data = await listUserStatus(request);
    return data;
  }
);

export const addUserStatusAPI = createAsyncThunk(
  "UserStatus/add",
  async (request) => {
    const data = await addUserStatus(request);
    return data;
  }
);

export const editUserStatusAPI = createAsyncThunk(
  "UserStatus/edit",
  async (request) => {
    const data = await editUserStatus(request);
    return data;
  }
);

export const deleteUserStatusAPI = createAsyncThunk(
  "UserStatus/delete",
  async (id) => {
    const data = await deleteUserStatus(id);
    return data;
  }
);

export const userStatusSlice = createSlice({
  name: "UserStatus",
  initialState: {
    dataUserStatus: {},
    dataUserStatusSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listUserStatusAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataUserStatus = action.payload.data;
        let data = action.payload.data;
        let dataUserStatusSelect = [];
        data.forEach((item) => {
          dataUserStatusSelect.push({ value: item.id, label: item.name });
        });
        state.dataUserStatusSelect = dataUserStatusSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addUserStatusAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listUserStatusAPI();
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editUserStatusAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteUserStatusAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listUserStatusAPI();
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataUserStatus = (state) => state.UserStatus.dataUserStatus;
export const dataUserStatusSelect = (state) =>
  state.UserStatus.dataUserStatusSelect;

export default userStatusSlice.reducer;
