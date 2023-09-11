import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listCallNote,
  addCallNote,
  getCallNoteByCustomerId,
} from "../services/call_note";
import { toast } from "react-toastify";

export const listCallNoteAPI = createAsyncThunk(
  "CallNote/list",
  async (request) => {
    const data = await listCallNote(request);
    return data;
  }
);

export const addCallNoteAPI = createAsyncThunk(
  "CallNote/add",
  async (request) => {
    const data = await addCallNote(request);
    return data;
  }
);

export const getCallNoteByCustomerIdAPI = createAsyncThunk(
  "CallNote/getCallNoteByCustomerId",
  async (request) => {
    const data = await getCallNoteByCustomerId(request);
    return data;
  }
);

export const callNoteSlice = createSlice({
  name: "CallNote",
  initialState: {
    dataCallNote: {},
    getAllCallNoteByCustomer: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listCallNoteAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataCallNote = action.payload.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(getCallNoteByCustomerIdAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.getAllCallNoteByCustomer = action.payload.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addCallNoteAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataCallNote = (state) => state.CallNote.dataCallNote;
export const getAllCallNoteByCustomer = (state) =>
  state.CallNote.getAllCallNoteByCustomer;
export default callNoteSlice.reducer;
