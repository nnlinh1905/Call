import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
// import "./navbar.css";
// import "./navbar.js";
import Monitor from "../../assets/icon/monitor.png";
import ModalMonitor from "./modalMonitor";
import Index from "./index";
import IndexSetting from "../callCenter/setting/indexSetting";
import ListCustomer from "../customer/indexCustomer";
import IndexTicket from "../tickets/indexTicket";
import IndexUser from "../user/indexUser";
import Category from "../category/category";
import CSKH from "../cskh/indexCSKH";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const navar = () => {
  // đồng hồ
  // let time = new Date().toLocaleTimeString();
  // const [ctime, setTime] = useState(time);
  // const UpdateTime = () => {
  //   time = new Date().toLocaleTimeString();
  //   setTime(time);
  // };
  // setInterval(UpdateTime);

  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      checkCallCenter(22);
    }
  }, []);

  let Dispatch = useDispatch();
  let handleLogout = async () => {
    Dispatch(logout());
    checkCallCenter(22);
  };

  let userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLoadModal = () => {
    setIsOpen(!isOpen);
    setModal(true);
  };

  //navbar mới
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a
          href="#"
          className="flex items-center"
          onClick={() => handleLoadModal()}
        >
          <img src={Monitor} alt="" className="w-10 h-10 cursor-pointer" />
        </a>
      </Typography>
      <ProfileMenu />
    </ul>
  );

  //profile menu
  const profileMenuItems = [
    {
      id: 1,
      label: "Thông tin ngươi dùng",
      icon: UserCircleIcon,
    },
    {
      id: 2,
      label: "Sửa thông tin người dùng",
      icon: Cog6ToothIcon,
    },
    {
      id: 3,
      label: "Hổ trợ",
      icon: LifebuoyIcon,
    },
    {
      id: 4,
      label: "đăng xuất",
      icon: PowerIcon,
    },
  ];

  let userInfor = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <span className="text-xs font-normal">
              {userInfo?.employees?.full_name}
            </span>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ id, label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                  onClick={() => (id == 4 ? handleLogout() : null)}
                >
                  {id == 1 ? (
                    <Link
                      to={`/system/user/Administrators-individual/${userInfor?.id}`}
                    >
                      {label}
                    </Link>
                  ) : (
                    label
                  )}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  return (
    <>
      {modal && <ModalMonitor isOpen={isOpen} />}
      <div className="max-h-[calc(100vh-0.5rem)] w-full overflow-y-auto">
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-1 px-2 lg:px-4 lg:py-2">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium text-white"
            >
              (Đường dẫn)
            </Typography>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
        </Navbar>
        <div className="w-full min-h-[calc(100vh-5.5rem)]">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/settings/*" element={<IndexSetting />} />
            <Route path="/customer/*" element={<ListCustomer />} />
            <Route path="/ticket/*" element={<IndexTicket />} />
            <Route path="/user/*" element={<IndexUser />} />
            <Route path="/category/*" element={<Category />} />
            <Route path="/cskh/*" element={<CSKH />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default navar;
