import React, { useState, useEffect } from "react";
import CustomerGroup from "../../assets/icon/user-groups.png";
import CustomerCheck from "../../assets/icon/user-check.png";
import CustomerDelete from "../../assets/icon/delete-user.png";
import PhoneIcon from "../../assets/icon/phoneIcon.png";
import PhoneOut from "../../assets/icon/call-out.png";
import LoginIcon from "../../assets/icon/login-icon.png";
// import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import MUIDataTable from "mui-datatables";
import DrawerAddCustomer from "./drawerAddCustomer";
import DrawerEditCustomer from "./drawerEditCustomer";
import Edit from "../../assets/icon/edit.png";
import { useDispatch, useSelector } from "react-redux";
import {
  listCustomerAPI,
  dataCustomer,
  checkActiveApi,
} from "../../features/customerSlice";
import Delete from "../../assets/icon/delete.png";
import Phone_black from "../../assets/icon/phone_black.png";
import { Link } from "react-router-dom";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import avatarMen from "../../assets/image/man.png";
import { CustomerSyncAPI } from "../../features/SynchronizedSlice";

const listCustomer = () => {

  const [dataUser, setDataUser] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [nextPage, setNextPage] = useState("");
  const [backPage, setBackPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [lastPage, setLastPage] = useState(1);


  const dispatch = useDispatch();

  const tmp = useSelector(dataCustomer) ? useSelector(dataCustomer) : [];
  console.log(tmp);
  useEffect(() => {
    dispatch(listCustomerAPI());
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [tmp]);

  const handleConfixData = async () => {
    const arrTmp = await tmp;
    setBackPage(arrTmp.prev_page_url);
    setNextPage(arrTmp.next_page_url);
    setCurrentPage(arrTmp.current_page);
    setLastPage(arrTmp.last_page);
    const arr = [];
    let obj = {};
    console.log("first", arrTmp);
    arrTmp && arrTmp.data &&
      arrTmp.data.length > 0 &&
      arrTmp.data.map((element) => {
        obj = {};
        obj.id = element.id;
        obj.full_name = element.full_name;
        obj.phone = element.phone;
        obj.email = element.email;
        obj.address = element.address;
        obj.active_name = element.active_text;
        obj.active_id = element.active;
        obj.source_id = element.source_id;
        obj.source_name = element.source_name;
        obj.avatar = element.avatar;
        arr.push(obj);
      });
    setDataUser(arr);
  };

  const handleCall = (id, call) => {
    console.log("id, call", id, call);
    let checkCall = localStorage.getItem("settingCall");
    let checkClickToCall = localStorage.getItem("settingCallClickToCall");

    console.log(checkCall, checkClickToCall);
    if (checkCall == 0 && checkClickToCall == 0) {
      alert("Bạn chưa cài đặt tính năng gọi điện");
    }

    if (checkCall == 1 && checkClickToCall == 0) {
      csInterFacePhoneClient(id, call);
      console.log("modal");
    }

    if (checkCall == 0 && checkClickToCall == 1) {
      let userPhone = localStorage.getItem("extensionUser");
      console.log("csClickToCall");
      csClickToCall(call, userPhone);
    }
  };

  const handleCheckActive = (id, active) => {
    const data = {
      id: id,
      active: active == 1 ? 0 : 1,
    };
    dispatch(checkActiveApi(data));

    setTimeout(() => {
      dispatch(listCustomerAPI());
    }, 500);
  };

  const handleEdit = (id) => {
    setId(id);
    setModal(true);
    setIsOpen(!isOpen);
  };

  const TABLE_HEAD = [
    "STT",
    "Họ và tên",
    "Số điện thoại",
    "Email",
    "Hoạt động",
    "Nguồn",
    ""
  ];

  const [openComfirm, setOpenComfirm] = useState(false);
  const [crm, setCrm] = useState(true)
  const [giatri, setgiatri] = useState(100);

  const handleOpenComfirm = () => setOpenComfirm(!openComfirm);
  const handleDongBo = () => {
    handleOpenComfirm();
    let request = {
      src: crm?4:1,
      giatri: giatri,
    };
    dispatch(CustomerSyncAPI(request));
  }

  return (
    <>
      <Dialog open={openComfirm} size="sm" handler={handleOpenComfirm}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Đồng bộ dữ liệu
          </Typography>
        </DialogHeader>
        <DialogBody divider className="text-black">
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              Đồng bộ dữ liệu từ nguồn:
              <div className="disabled">
                <input
                  className="mr-2"
                  type="checkbox"
                  id="crm"
                  defaultChecked={crm}
                  onClick={() => setCrm(!crm)}
                />
                <label className="rounded-sm p-1" htmlFor="crm">
                  CRM
                </label>
              </div>
              {/* <div>
                <input className="mr-2" type="checkbox" id="kiotviet" />
                <label className="rounded-sm p-1" htmlFor="kiotviet">
                  KiotViet
                </label>
              </div> */}
            </div>
            <div className="col-span-1">
              Mức dữ liệu:
              <Select
                variant="outlined"
                label="Chọn mức đồng bộ"
                value={giatri.toString()}
                onChange={(e) => setgiatri(e)}
              >
                <Option value="100">100</Option>
                <Option value="200">200</Option>
                <Option value="500">500</Option>
                <Option value="9999999">Tất cả</Option>
              </Select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpenComfirm}>
            Đóng
          </Button>
          <Button variant="gradient" color="green" onClick={handleDongBo}>
            Xác nhận
          </Button>
        </DialogFooter>
      </Dialog>
      {modal && <DrawerEditCustomer id={id} isOpen={isOpen} />}
      <div className="h-16 w-full bg-white rounded-md border border-solid border-[#f2f2f2] grid grid-cols-5 p-2 px-4 shadow items-center">
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={CustomerGroup}
                className="w-5 border rounded-full bg-[#f6fcfc]"
                alt=""
              />
              <div className="text-lg">87</div>
            </div>
            <div className="text-[#4fc2c5] text-[14px]">Tổng số khách hàng</div>
          </div>
        </div>
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={CustomerCheck}
                className="w-5 border rounded-full bg-[#f6fcf7]"
                alt=""
              />
              <div className="text-lg">87</div>
            </div>
            <div className="text-green-600 text-[14px]">
              Khách hàng đang hoạt động
            </div>
          </div>
        </div>
        <div //
          className="col-span-1 hidden"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={CustomerDelete}
                className="w-5 border rounded-full bg-[#fcf6f6]"
                alt=""
              />
              <div className="text-lg">0</div>
            </div>
            <div className="text-red-500 text-[14px]">
              Khách hàng không hoạt động
            </div>
          </div>
        </div>
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={PhoneIcon}
                className="w-5 border rounded-full bg-[#f6fbfc]"
                alt=""
              />
              <div className="text-lg">87</div>
            </div>
            <div className="text-[#3bdaed] text-[14px]">
              Liên hệ đang hoạt động
            </div>
          </div>
        </div>
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={PhoneOut}
                className="w-5 border rounded-full bg-[#fcfaf6]"
                alt=""
              />
              <div className="text-lg">0</div>
            </div>
            <div className=" text-orange-500 text-[14px]">
              Liên hệ ít hoạt động
            </div>
          </div>
        </div>
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={LoginIcon}
                className="w-5 border rounded-full bg-[#f6fcfc]"
                alt=""
              />
              <div className="text-lg">44</div>
            </div>
            <div className="text-gray-500 text-[14px]">
              Đã liên hệ trong hôm nay
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full">
        <Card className="h-full w-full border border-solid border-[#f2f2f2] mt-2 rounded-md">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <DrawerAddCustomer />
                <Button
                  variant="outlined"
                  size="sm"
                  className="flex items-center gap-3"
                  onClick={() => handleOpenComfirm()}
                >
                  Đồng bộ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </Button>
              </div>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0 pt-4">
            <table className="w-full min-w-max table-auto text-left border border-solid border-[#f2f2f2]">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataUser.map(
                  (
                    {
                      id,
                      full_name,
                      phone,
                      email,
                      address,
                      active_name,
                      active_id,
                      source_id,
                      source_name,
                      avatar,
                    },
                    index
                  ) => {
                    const isLast = index === dataUser.length - 1;
                    const classes = isLast
                      ? "px-3 py-2"
                      : "px-3 py-2 border-b border-blue-gray-50";

                    return (
                      <tr key={id} className="even:bg-blue-gray-50/50">
                        <td className={classes}>
                          <div className="flex items-center ml-2 gap-3">
                            {index + 1}
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={avatar ?? avatarMen}
                              alt=""
                              size="sm"
                            />
                            <div className="flex flex-col">
                              <Link to={`/system/customer/client-list/${id}`}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {full_name}
                                </Typography>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal cursor-pointer flex items-center gap-1"
                              onClick={() => handleCall(id, phone)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                />
                              </svg>

                              {phone??''}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal cursor-pointer flex items-center gap-1"
                            >
                              {email??''}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={active_name}
                              className="cursor-pointer"
                              onClick={() => handleCheckActive(id, active_id)}
                              color={active_id == 1 ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={source_name??''}
                              color={"blue"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Sửa thông tin khách hàng">
                            <IconButton
                              variant="text"
                              onClick={() => handleEdit(id)}
                            >
                              <PencilIcon className="h-4 w-4" color="Orange" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 mr-12">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Trang {currentPage} của {tmp.last_page}
            </Typography>
            {/*<Pagination
              count={lastPage}
              onClick={(e) => handlePagination(e)}
              variant="outlined"
              color="primary"
            />*/}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default listCustomer;
