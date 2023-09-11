import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Potential from "../../assets/icon/potential.png";
import Users_black from "../../assets/icon/users_black.png";
import CustomerGroup from "./CustomerGroup/listCustomerGroup";
import DashboardCustomer from "./customersPotential/dashboard";
import RouteInfoCustomer from "./routeInfoCustomer";
import ListPotential from "./customersPotential/list";
import ListPotentialStatus from "./customersPotential/status/list";
import ListSrc from "./CustomerSrc/listCustomerSrc";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

const indexCustomer = () => {
  let location = useLocation();

  const [potential, setPotential] = useState(null);
  const openPotential = Boolean(potential);

  const handleClickPotential = (event) => {
    setPotential(event.currentTarget);
  };

  const [customer, setCustomer] = useState(null);
  const openCustomer = Boolean(customer);

  const handleClickCustomer = (event) => {
    setCustomer(event.currentTarget);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //     console.log(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
    
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const menuItems = [
    {
      title: "@material-tailwind/html",
      description:
        "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
    },
    {
      title: "@material-tailwind/react",
      description:
        "Learn how to use @material-tailwind/react, packed with rich components for React.",
    },
    {
      title: "Material Tailwind PRO",
      description:
        "A complete set of UI Elements for building faster websites in less time.",
    },
  ];

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className="pb-1 w-full h-full overflow-auto relative">
        <div className="sticky top-0 z-1 bg-white">
          <div className="w-full bg-white px-4 shadow flex justify-between items-center gap-5">
            <div className="flex justify-start items-center gap-5">
              {/* <Button
                id="basic-button"
                aria-controls={openPotential ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openPotential ? "true" : undefined}
                onClick={handleClickPotential}
                style={
                  location.pathname.includes("potential") ||
                  location.pathname == "/system/customer"
                    ? { color: "green", borderBottom: "1px solid green" }
                    : { color: "green" }
                }
              >
                <ConfirmationNumberOutlinedIcon
                  style={{ marginRight: "3px" }}
                />
                Khách hàng tiềm năng
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={potential}
                open={openPotential}
                onClose={() => setPotential(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => setPotential(null)}>
                  <Link to="/system/customer">Bảng điều kiển</Link>
                </MenuItem>
                <MenuItem onClick={() => setPotential(null)}>
                  <Link to="/system/customer/potential-list">Danh sách</Link>
                </MenuItem>
                <MenuItem onClick={() => setPotential(null)}>
                  <Link to="/system/customer/potential-src">Nguồn</Link>
                </MenuItem>
                <MenuItem onClick={() => setPotential(null)}>
                  <Link to="/system/customer/potential-status-list">
                    Trạng thái
                  </Link>
                </MenuItem>
              </Menu>

              <Button
                id="basic-button"
                aria-controls={openCustomer ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openCustomer ? "true" : undefined}
                onClick={handleClickCustomer}
                style={
                  location.pathname.includes("client")
                    ? { color: "green", borderBottom: "1px solid green" }
                    : { color: "green" }
                }
              >
                <ConfirmationNumberOutlinedIcon
                  style={{ marginRight: "3px" }}
                />
                Khách hàng
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={customer}
                open={openCustomer}
                onClose={() => setCustomer(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => setCustomer(null)}>
                  <Link to="/system/customer/client-list">Danh sách</Link>
                </MenuItem>
                <MenuItem onClick={() => setCustomer(null)}>
                  <Link to="/system/customer/client-groups">Nhóm</Link>
                </MenuItem>
              </Menu> */}
            </div>
          </div>
        </div>
        <div className="h-auto min-h-full max-w-screen-2xl mx-auto grid grid-cols-12 p-2 gap-2">
          <div //content
            className="col-span-12"
          >
            <Routes>
              <Route
                path="/potential-dashbord"
                element={<DashboardCustomer />}
              />
              <Route path="/client-list/*" element={<RouteInfoCustomer />} />
              <Route path="/client-groups" element={<CustomerGroup />} />
              <Route path="/potential-list" element={<ListPotential />} />
              <Route path="/potential-src" element={<ListSrc />} />
              <Route
                path="/potential-status"
                element={<ListPotentialStatus />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default indexCustomer;
