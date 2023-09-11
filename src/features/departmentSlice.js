import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../services/department";
import { toast } from "react-toastify";

export const listDepartmentAPI = createAsyncThunk(
  "Department/list",
  async (request) => {
    const data = await listDepartment(request);
    return data;
  }
);

export const addDepartmentAPI = createAsyncThunk(
  "Department/add",
  async (request) => {
    const data = await addDepartment(request);
    return data;
  }
);

export const editDepartmentAPI = createAsyncThunk(
  "Department/edit",
  async (request) => {
    const data = await editDepartment(request);
    return data;
  }
);

export const deleteDepartmentAPI = createAsyncThunk(
  "Department/delete",
  async (id) => {
    const data = await deleteDepartment(id);
    return data;
  }
);

export const departmentSlice = createSlice({
  name: "Department",
  initialState: {
    dataDepartment: {},
    dataDepartmentSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listDepartmentAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataDepartment = action.payload.data;
        let data = action.payload.data;
        let dataDepartmentSelect = [];
        data.forEach((item) => {
          dataDepartmentSelect.push({ value: item.id, label: item.name });
        });
        state.dataDepartmentSelect = dataDepartmentSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addDepartmentAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listDepartmentAPI();
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editDepartmentAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteDepartmentAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listDepartmentAPI();
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const data = (state) => state.Department.dataDepartment;
export const dataDepartmentSelect = (state) =>
  state.Department.dataDepartmentSelect;

export default departmentSlice.reducer;
