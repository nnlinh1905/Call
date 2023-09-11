import React, {useState, useEffect} from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import {
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const sidebar = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const Dispatch = useDispatch();

  let handleLogout = async () => {
    Dispatch(logout());
    checkCallCenter(22);
  };

  let userInfor = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  return (
    <Card className="h-[calc(100vh-0.5rem)] rounded-2xl bg-white w-full max-w-[15rem] py-4 pr-4 drop-shadow-lg shadow-blue-gray-900/5 text-xs border border-solid border-[#fefefe] border-l-8 border-t-8 border-l-[#2d50b2] border-t-[#2d50b2]">
      <div style={{ paddingLeft: "1rem" }}>
        <Typography variant="h5" color="blue-gray">
          <Link to="/system">
            <div className="flex items-center gap-1">
              <img
                src="https://demo.smartvcc.vn/uploads/company/83a019d037d001de077661d46e1e3fae.png"
                alt=""
                className="w-16 cursor-pointer max-h-[80px] max-w-[80px]"
              />
              <span className="text-[#2550b2]">Call center</span>
            </div>
          </Link>
        </Typography>
      </div>
      <List>
        <ListItem className="text-xs">
          {/* tổng quan */}
          <ListItemPrefix>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-[#2d50b2]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
              />
            </svg>
          </ListItemPrefix>
          <Link to="/system">Tổng quan</Link>
          {/* <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix> */}
        </ListItem>
        <Accordion //phiếu ghi
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#2d50b2]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-xs"
              >
                Phiếu ghi
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/ticket">Phiếu yêu cầu</Link>
              </ListItem>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/ticket/ticket-status">Trạng thái</Link>
              </ListItem>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/ticket/ticket-topic">Chủ đề</Link>
              </ListItem>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/ticket/ticket-type">Phân loại</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion //CSKH
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-[#2d50b2]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                  />
                </svg>
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-xs"
              >
                Chăm sóc khách hàng
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <ListItem className="text-xs">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <Button
                      style={{
                        background: "none",
                        padding: "0px",
                        color: "black",
                        fontWeight: "400",
                        boxShadow: "none",
                        textTransform: "capitalize",
                      }}
                    >
                      Cuộc gọi
                    </Button>
                  </ListItem>
                </MenuHandler>
                <MenuList>
                  <Link to="/system/cskh">
                    <MenuItem>Bảng điều kiền</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-note">
                    <MenuItem>Ghi chú</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-detail-no-answer">
                    <MenuItem>Chi tiết cuộc gọi chưa trả lời</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-callistation-partitions">
                    <MenuItem>Thống kê phân bổ cuộc gọi</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-incoming-report">
                    <MenuItem>Báo cáo cuộc gọi đến</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-outgoing-report">
                    <MenuItem>Báo cáo cuộc gọi đi</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-incoming-hour-report">
                    <MenuItem>Báo cáo cuộc gọi đến theo giờ</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-outgoing-hour-report">
                    <MenuItem>Báo cáo cuộc gọi đi theo giờ</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-report-by-queue">
                    <MenuItem>Báo cáo cuộc gọi theo hàng đợi</MenuItem>
                  </Link>
                  <Link to="/system/cskh/call-report-operator">
                    <MenuItem>Báo cáo cuộc gọi tổng đài viên</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/system/cskh/ticket">Phiếu yêu cầu</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion //Khách hàng
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 4 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#2d50b2]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-xs"
              >
                Khách hàng
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <ListItem className="text-xs">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <Button
                      style={{
                        background: "none",
                        padding: "0px",
                        color: "black",
                        fontWeight: "400",
                        boxShadow: "none",
                        textTransform: "capitalize",
                      }}
                    >
                      Khách hàng tiềm năng
                    </Button>
                  </ListItem>
                </MenuHandler>
                <MenuList>
                  <Link to="/system/customer/potential-dashbord">
                    <MenuItem>Bảng điều kiền</MenuItem>
                  </Link>
                  <Link to="/system/customer/potential-list">
                    <MenuItem>Danh sách</MenuItem>
                  </Link>
                  <Link to="/system/customer/potential-src">
                    <MenuItem>Nguồn</MenuItem>
                  </Link>
                  <Link to="/system/customer/potential-status">
                    <MenuItem>Trạng thái</MenuItem>
                  </Link>
                </MenuList>
              </Menu>

              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <ListItem className="text-xs">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <Button
                      style={{
                        background: "none",
                        padding: "0px",
                        color: "black",
                        fontWeight: "400",
                        boxShadow: "none",
                        textTransform: "capitalize",
                      }}
                    >
                      Khách hàng
                    </Button>
                  </ListItem>
                </MenuHandler>
                <MenuList>
                  <Link to="/system/customer/client-list">
                    <MenuItem>Danh sách</MenuItem>
                  </Link>
                  <Link to="/system/customer/client-groups">
                    <MenuItem>Nhóm</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion //Nhân viên
          open={open === 5}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 5 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 5}>
            <AccordionHeader
              onClick={() => handleOpen(5)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#2d50b2]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-xs"
              >
                Nhân viên
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/user">Bảng điều kiển</Link>
              </ListItem>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to={`/system/user/list`}>Danh sách</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <Accordion //Danh mục
          open={open === 6}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 6 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 6}>
            <AccordionHeader
              onClick={() => handleOpen(6)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#2d50b2]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-xs"
              >
                Danh mục
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/category">Phòng ban</Link>
              </ListItem>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/category/user-status">Trạng thái</Link>
              </ListItem>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/category/user-position">Chức năng</Link>
              </ListItem>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/category/user-academic-level">
                  Trình độ học vấn
                </Link>
              </ListItem>
              <ListItem className="text-xs">
                <ListItemPrefix>
                  <ChevronRightIcon
                    strokeWidth={3}
                    className="h-3 w-5 text-white"
                  />
                </ListItemPrefix>
                <Link to="/system/category/call-purpose">
                  Mục đích cuộc gọi
                </Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem className="text-xs">
          <ListItemPrefix>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-[#2d50b2]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </ListItemPrefix>
          <Link to="/system/settings">Cài đặt</Link>
        </ListItem>
        <ListItem className="text-xs" onClick={() => handleLogout()}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 text-[#2d50b2]" />
          </ListItemPrefix>
          Đăng xuất
        </ListItem>
      </List>
    </Card>
  );
};
export default sidebar;



// import React, { useState } from "react";
// import Home from "../../assets/icon/home.png";
// import Setting from "../../assets/icon/setting.png";
// import Users from "../../assets/icon/users.png";
// import Ticket from "../../assets/icon/ticket.png";
// import Phone from "../../assets/icon/phone.png";
// import UserWhite from "../../assets/icon/user_white.png";
// import { Link } from "react-router-dom";
// import CategoryWhite from "../../assets/icon/categoryWhite.png";

// const sidebar = () => {
//   const [customer, setCustomer] = useState(null);
//   const handlePopoverOpenCustomer = (event) => {
//     setCustomer(event.currentTarget);
//   };
//   const openCustomer = Boolean(customer);

//   return (
//     <>
//       <div className="w-full h-full bg-[#121b2a] rounded-2xl text-gray-200 py-4 flex flex-col justify-between">
//         <div className="flex justify-center">
//           <Link to="/system">
//             <img src={Home} alt="" width="18px" className="mt-2" />
//           </Link>
//         </div>
//         <div className="flex flex-col justify-center items-center gap-4 relative">
//           <Link to="/system/customer">
//             <img src={Users} alt="" width="18px" />
//           </Link>
//           <Link to="/system/ticket">
//             <img src={Ticket} alt="" width="18px" />
//           </Link>
//           <Link to="/system/cskh">
//             <img src={Phone} alt="" width="18px" />
//           </Link>
//           <Link to="/system/user">
//             <img src={UserWhite} alt="" width="18px" />
//           </Link>
//           <hr className="border w-[40%] border-gray-500" />
//           <Link to="/system/category">
//             <img src={CategoryWhite} alt="" width="18px" />
//           </Link>
//         </div>
//         <div className="flex justify-center">
//           <Link to="/system/settings">
//             <img src={Setting} alt="" width="18px" />
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default sidebar;
