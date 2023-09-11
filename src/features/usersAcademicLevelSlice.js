import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listAcademicLevel,
  addAcademicLevel,
  editAcademicLevel,
  deleteAcademicLevel,
} from "../services/users_academic_lever";
import { toast } from "react-toastify";

export const listAcademicLevelAPI = createAsyncThunk(
  "AcademicLevel/list",
  async (request) => {
    const data = await listAcademicLevel(request);
    return data;
  }
);

export const addAcademicLevelAPI = createAsyncThunk(
  "AcademicLevel/add",
  async (request) => {
    const data = await addAcademicLevel(request);
    return data;
  }
);

export const editAcademicLevelAPI = createAsyncThunk(
  "AcademicLevel/edit",
  async (request) => {
    const data = await editAcademicLevel(request);
    return data;
  }
);

export const deleteAcademicLevelAPI = createAsyncThunk(
  "AcademicLevel/delete",
  async (id) => {
    const data = await deleteAcademicLevel(id);
    return data;
  }
);

export const userStatusSlice = createSlice({
  name: "AcademicLevel",
  initialState: {
    dataAcademicLevel: {},
    dataAcademicLevelSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listAcademicLevelAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataAcademicLevel = action.payload.data;
        let data = action.payload.data;
        let dataAcademicLevelSelect = [];
        data.forEach((item) => {
          dataAcademicLevelSelect.push({ value: item.id, label: item.name });
        });
        state.dataAcademicLevelSelect = dataAcademicLevelSelect;
      } else {
        toast.error("Không lấy được dữ liệu");
      }
    });
    builder.addCase(addAcademicLevelAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listAcademicLevelAPI();
      } else {
        toast.error("Thêm thất bại: " + action.payload.message);
      }
    });
    builder.addCase(editAcademicLevelAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error("Sửa thất bại: " + action.payload.message);
      }
    });
    builder.addCase(deleteAcademicLevelAPI.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        listAcademicLevelAPI();
      } else {
        toast.error("Xóa thất bại: " + action.payload.message);
      }
    });
  },
});
export const dataAcademicLevel = (state) =>
  state.AcademicLevel.dataAcademicLevel;
export const dataAcademicLevelSelect = (state) =>
  state.AcademicLevel.dataAcademicLevelSelect;

export default userStatusSlice.reducer;
