import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listTypeTickect,
  addTypeTickect,
  editTypeTickect,
  deleteTypeTickect,
} from "../services/type_ticket";
import { toast } from "react-toastify";

export const listTypeTickectAPI = createAsyncThunk(
  "TicketType/list",
  async (request) => {
    const data = await listTypeTickect(request);
    return data;
  }
);

export const addTypeTickectAPI = createAsyncThunk(
  "TicketType/add",
  async (request) => {
    const data = await addTypeTickect(request);
    return data;
  }
);

export const editTypeTickectAPI = createAsyncThunk(
  "TicketType/edit",
  async (request) => {
    const data = await editTypeTickect(request);
    return data;
  }
);

export const deleteTypeTickectAPI = createAsyncThunk(
  "TicketType/delete",
  async (id) => {
    const data = await deleteTypeTickect(id);
    return data;
  }
);

export const ticketTypeSlice = createSlice({
  name: "TicketType",
  initialState: {
    dataTypeTicket: [],
    dataTypeTicketSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listTypeTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataTypeTicket = action.payload.data;
        let dataTypeTicketSelect = [];
        let data = action.payload.data;
        data.forEach((item) => {
          dataTypeTicketSelect.push({ value: item.id, label: item.name });
        });
        state.dataTypeTicketSelect = dataTypeTicketSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addTypeTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editTypeTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteTypeTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataTypeTicket = (state) => state.TicketType.dataTypeTicket;
export const dataTypeTicketSelect = (state) =>
  state.TicketType.dataTypeTicketSelect;

export default ticketTypeSlice.reducer;
