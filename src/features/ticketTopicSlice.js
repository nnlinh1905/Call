import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listTopicTickect,
  addTopicTickect,
  editTopicTickect,
  deleteTopicTickect,
} from "../services/topic_ticket";
import { toast } from "react-toastify";

export const listTopicTickectAPI = createAsyncThunk(
  "TicketTopic/list",
  async (request) => {
    const data = await listTopicTickect(request);
    return data;
  }
);

export const addTopicTickectAPI = createAsyncThunk(
  "TicketTopic/add",
  async (request) => {
    const data = await addTopicTickect(request);
    return data;
  }
);

export const editTopicTickectAPI = createAsyncThunk(
  "TicketTopic/edit",
  async (request) => {
    const data = await editTopicTickect(request);
    return data;
  }
);

export const deleteTopicTickectAPI = createAsyncThunk(
  "TicketTopic/delete",
  async (id) => {
    const data = await deleteTopicTickect(id);
    return data;
  }
);

export const TicketTopicSlice = createSlice({
  name: "TicketTopic",
  initialState: {
    dataTopicTicket: [],
    dataTopicTicketSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listTopicTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataTopicTicket = action.payload.data;
        let dataTopicTicketSelect = [];
        let data = action.payload.data;
        data.forEach((item) => {
          dataTopicTicketSelect.push({ value: item.id, label: item.name });
        });
        state.dataTopicTicketSelect = dataTopicTicketSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addTopicTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editTopicTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteTopicTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataTopicTicket = (state) => state.TicketTopic.dataTopicTicket;
export const dataTopicTicketSelect = (state) =>
  state.TicketTopic.dataTopicTicketSelect;

export default TicketTopicSlice.reducer;
