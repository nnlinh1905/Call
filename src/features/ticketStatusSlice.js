import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listStatusTickect,
  addStatusTickect,
  editStatusTickect,
  deleteStatusTickect,
} from "../services/status_ticket";
import { toast } from "react-toastify";

export const listStatusTickectAPI = createAsyncThunk(
  "TicketStatusSlice/list",
  async (request) => {
    const data = await listStatusTickect(request);
    return data;
  }
);

export const addStatusTickectAPI = createAsyncThunk(
  "TicketStatusSlice/add",
  async (request) => {
    const data = await addStatusTickect(request);
    return data;
  }
);

export const editStatusTickectAPI = createAsyncThunk(
  "TicketStatusSlice/edit",
  async (request) => {
    const data = await editStatusTickect(request);
    return data;
  }
);

export const deleteStatusTickectAPI = createAsyncThunk(
  "TicketStatusSlice/delete",
  async (id) => {
    const data = await deleteStatusTickect(id);
    return data;
  }
);

export const ticketStatusSlice = createSlice({
  name: "TicketStatusSlice",
  initialState: {
    dataStatusTicket: [],
    dataStatusTicketSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listStatusTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataStatusTicket = action.payload.data;
        let dataStatusTicketSelect = [];
        let data = action.payload.data;
        data.forEach((item) => {
          dataStatusTicketSelect.push({ value: item.id, label: item.name });
        });
        state.dataStatusTicketSelect = dataStatusTicketSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addStatusTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editStatusTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteStatusTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataStatusTicket = (state) =>
  state.TicketStatusSlice.dataStatusTicket;
export const dataStatusTicketSelect = (state) =>
  state.TicketStatusSlice.dataStatusTicketSelect;

export default ticketStatusSlice.reducer;
