import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import FullScreen from "../../assets/icon/full-screen.png";
import NoneScreen from "../../assets/icon/normal-screen.png";
import Departmenticon from "../../assets/icon/department.png";
import User from "../../assets/icon/user.png";
import Department from "./department/department";
import CallPurpose from "./callPurpose/callPurpose";
import UserStatus from "./userStatus/list";
import UserPosition from "./userPosition/list";
import UserAcademicLevel from "./userAcademicLevel/list";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const category = () => {
  let location = useLocation();
  const [user, setUser] = useState(null);
  const openUser = Boolean(user);

  const handleClickUser = (event) => {
    setUser(event.currentTarget);
    setCall(null);
  };

  const [call, setCall] = useState(null);
  const openCall = Boolean(call);

  const handleClickCall = (event) => {
    setCall(event.currentTarget);
    setUser(null);
  };
  return (
    <>
      <div className="pt-2 pb-1 w-full h-full overflow-auto relative">
        <div className="h-auto min-h-full w-full rounded-2xl bg-[#f5f6fa] p-2 gap-2">
          <Routes>
            <Route path="/" index element={<Department />} />
            <Route path="/call-purpose" element={<CallPurpose />} />
            <Route path="/user-status" element={<UserStatus />} />
            <Route path="/user-position" element={<UserPosition />} />
            <Route
              path="/user-academic-level"
              element={<UserAcademicLevel />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default category;
