import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ListUser,
  AddUser,
  CheckIsLogin,
  showUser,
  updateUser,
  deleteUser,
} from "../services/users";
import { toast } from "react-toastify";

export const ListUserApi = createAsyncThunk("User/list", async (request) => {
  const data = await ListUser(request);
  return data;
});

export const AddUserApi = createAsyncThunk("User/add", async (request) => {
  const data = await AddUser(request);
  //console.log("data", data);
  return data;
});

export const CheckIsLoginApi = createAsyncThunk(
  "User/check",
  async (request) => {
    const data = await CheckIsLogin(request);
    //console.log("data", data);
    return data;
  }
);

export const showUserApi = createAsyncThunk("User/show", async (request) => {
  const data = await showUser(request);
  //console.log("data", data);
  return data;
});
export const updateUserApi = createAsyncThunk(
  "User/update",
  async (request) => {
    const data = await updateUser(request);
    //console.log("data", data);
    return data;
  }
);
export const deleteUserApi = createAsyncThunk(
  "User/delete",
  async (request) => {
    const data = await deleteUser(request);
    //console.log("data", data);
    return data;
  }
);

export const usersSlice = createSlice({
  name: "User",
  initialState: {
    dataUser: [],
    dataShowUser: [],
    dataUserSelect: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ListUserApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataUser = action.payload.data;
        let data = action.payload.data;
        let dataUserSelect = [];
        data.map((item) => {
          dataUserSelect.push({
            value: item.id,
            label: item.full_name,
          });
        });
        state.dataUserSelect = dataUserSelect;
      }
    });
    builder.addCase(AddUserApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success("Thêm thành công");
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(CheckIsLoginApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(showUserApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        state.dataShowUser = action.payload.data;
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(updateUserApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(deleteUserApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        toast.success(action.payload.message);
        // ListUserApi();
      } else {
        toast.error(action.payload.message);
      }
    });
  },
});
export const dataListUser = (state) => state.User.dataUser;
export const dataShowUser = (state) => state.User.dataShowUser;
export const dataUserSelect = (state) => state.User.dataUserSelect;
export default usersSlice.reducer;
