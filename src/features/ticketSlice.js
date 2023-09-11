import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listTickect,
  addTickect,
  editTickect,
  deleteTickect,
  showTickect,
  getTicketByCustomer,
} from "../services/ticket";
import { toast } from "react-toastify";

export const listTickectAPI = createAsyncThunk(
  "Ticket/list",
  async (request) => {
    const data = await listTickect(request);
    return data;
  }
);

export const getTicketByCustomerAPI = createAsyncThunk(
  "Ticket/getTicketByCustomer",
  async (request) => {
    const data = await getTicketByCustomer(request);
    return data;
  }
);

export const showTickectAPI = createAsyncThunk(
  "Ticket/show",
  async (request) => {
    const data = await showTickect(request);
    return data;
  }
);

export const addTickectAPI = createAsyncThunk("Ticket/add", async (request) => {
  const data = await addTickect(request);
  return data;
});

export const editTickectAPI = createAsyncThunk(
  "Ticket/edit",
  async (request) => {
    const data = await editTickect(request);
    return data;
  }
);

export const deleteTickectAPI = createAsyncThunk(
  "Ticket/delete",
  async (id) => {
    const data = await deleteTickect(id);
    return data;
  }
);

export const TicketSlice = createSlice({
  name: "Ticket",
  initialState: {
    dataTicket: [],
    dataShowTicket: [],
    dataTicketDashboard: [],
    getAllTicketByCustomer: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataTicket = action.payload.data;
        let data = action.payload.data;
        let dataDashboard = [];
        data.map((item) => {
          dataDashboard.push({
            id: item.id,
            title: item.title,
            start: item.start_date,
            end: item.end_date,
            data: item,
          });
        });
        state.dataTicketDashboard = dataDashboard;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(getTicketByCustomerAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.getAllTicketByCustomer = action.payload.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(showTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataShowTicket = action.payload.data;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteTickectAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataTicket = (state) => state.Ticket.dataTicket;
export const dataShowTicket = (state) => state.Ticket.dataShowTicket;
export const dataTicketDashboard = (state) => state.Ticket.dataTicketDashboard;
export const getAllTicketByCustomer = (state) =>
  state.Ticket.getAllTicketByCustomer;

export default TicketSlice.reducer;
