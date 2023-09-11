import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/auth";
import { toast } from "react-toastify";
import { json } from "body-parser";

export const LoginApi = createAsyncThunk("Auth/login", async (request) => {
  const data = await login(request);
  //console.log("data", data);
  return data;
});

export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    dataLogin: [],
    check: false,
  },
  reducers: {
    logout(state) {
      window.location.reload();
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("settingCall");
      localStorage.removeItem("settingCallClickToCall");
      localStorage.removeItem("extensionUser");
      localStorage.removeItem("setTimeToken");
      localStorage.removeItem("idUser");
      localStorage.removeItem("call_id");
      localStorage.removeItem("callin");
      localStorage.removeItem("pusherTransportTLS");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginApi.fulfilled, (state, action) => {
      if (action?.payload?.result) {
        console.log("data login", action.payload.data);
        // toast.info("Đang kết nối với tổng đài");
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("setTimeToken", new Date().getTime());
        localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
        localStorage.setItem("settingCall", action.payload.active);
        localStorage.setItem(
          "settingCallClickToCall",
          action.payload.click_to_call
        );
        localStorage.setItem("extensionUser", action.payload.data.extension);
        state.check = !state.check;
        window.location.reload();
        // setTimeout(() => {}, 1000);
      } else {
        // console.log(action.payload);
        toast.error(action.payload.message);
        state.check = false;
      }
    });
  },
});

export const dataCheck = (state) => state.Auth.check;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
