import React, { useState, useEffect } from "react";
import background from "../../assets/background/7822.jpg";
import logo from "../../assets/logo/logo.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginApi, dataCheck } from "../../features/authSlice";
const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //////////////////////////////

  const params = {
    api: "http://cct.smartvcc.vn",
  };

  const request = {
    email,
    password,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let FunctionLogin = () => {
    dispatch(LoginApi(request));
  };

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;

  const dataCheckLogin = useSelector(dataCheck);

  useEffect(() => {
    if (token) {
      navigate("/system");
      checkCallCenter(-1);
      window.location.reload();
    }
  }, [dataCheckLogin]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="bg-fixed object-cover h-screen max-h-screen flex justify-center items-center w-screen z-50 bg-white"
      >
        <div className="h-94 w-1/4 border border-solid shadow-2xl py-4 backdrop-blur-sm border-white rounded-lg">
          <div className="h-12">
            <img src={logo} alt="" className="h-12 mx-auto" />
          </div>
          <div className=" px-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 mt-3 text-sm font-medium text-gray-900"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>
            <div className="flex justify-center items-center ">
              <button
                type="button"
                onClick={() => FunctionLogin()}
                className="text-white mt-4 w-full bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Đăng nhập
              </button>
            </div>
            <div className="text-sm text-[#2d50b2] mt-3">Quên mật khẩu?</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
