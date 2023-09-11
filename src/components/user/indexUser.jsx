import React, { useState } from "react";
import fullScreen from "../../assets/icon/full-screen.png";
import NoneScreen from "../../assets/icon/normal-screen.png";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Potential from "../../assets/icon/potential.png";
import ComboChart from "../../assets/icon/comboChart.png";
import Timer from "../../assets/icon/timer.png";
import ListUser from "./listUser";
import RouteInfoUser from "./routeInfoUser";
import User from "../../assets/icon/user.png";
import IndexChart from "./chart/indexChart";
import Routeindividual from "./routeindividual";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const indexUser = () => {
  let location = useLocation();
  let userInfor = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [user, setUser] = useState(null);
  const openUser = Boolean(user);

  const handleClickUser = (event) => {
    setUser(event.currentTarget);
  };

  console.log(userInfor);
  return (
    <>
      <div className="pb-1 w-full h-full overflow-auto relative mt-2">
        <div className="sticky top-0 z-10 bg-white">
          <div className="w-full bg-[#f5f6fa] rounded px-4 shadow flex justify-start items-center gap-5">
            <Menu
              id="basic-menu"
              anchorEl={user}
              open={openUser}
              onClose={() => setUser(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => setUser(null)}>
                <Link to="/system/user">Bảng điều kiển</Link>
              </MenuItem>
              <MenuItem onClick={() => setUser(null)}>
                <Link
                  to={`/system/user/Administrators-individual/${userInfor?.id}`}
                >
                  Hồ sơ cá nhân
                </Link>
              </MenuItem>
              <MenuItem onClick={() => setUser(null)}>
                <Link to="/system/user/Administrators-list">Danh sách</Link>
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="h-auto min-h-full w-full rounded-2xl bg-[#f5f6fa] p-2 gap-2">
          <Routes>
            <Route path="/list/*" element={<RouteInfoUser />} />
            <Route
              path="/Administrators-individual/*"
              element={<Routeindividual />}
            />
            <Route path="/" index element={<IndexChart />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default indexUser;
