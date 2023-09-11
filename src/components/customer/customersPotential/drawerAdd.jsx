import React, { useState, useEffect } from "react";
// import { Button } from "@material-tailwind/react";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import No_img from "../../../assets/icon/no-image.png";
import {
  addCustomerAPI,
  datasources,
  sourcesAPI,
  listCustomerAPI,
  dataStatus,
  dataStatusSelect,
  listStatusAPI,
  listCustomerPotentialAPI,
  addCustomerPotentialAPI,
} from "../../../features/customerSlice";
import Select from "react-select";
import {
  nationsAPI,
  datanations,
  provincesAPI,
  dataprovinces,
  dictrictsAPI,
  datadictricts,
} from "../../../features/addressSlice";

import {
  dataListUser,
  ListUserApi,
  dataUserSelect,
} from "../../../features/usersSlice";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
  Avatar,
  Input,
  Textarea,
} from "@material-tailwind/react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const drawerAdd = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const dispatch = useDispatch();

  //tab
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [districts_id, setdistricts_id] = useState();
  const [province_id, setprovince_id] = useState();
  const [nation_id, setnation_id] = useState();
  const [source_id, setsource_id] = useState();
  const [name, setname] = useState();
  const [websize, setwebsite] = useState();
  const [company, setcompany] = useState();
  const [postal_code, setpostal_code] = useState();
  const [position, setposition] = useState();
  const [customer_potential_status_id, setcustomer_potential_status_id] =
    useState();
  const [employee_charge_id, setemployee_charge_id] = useState();
  const [description, setdescription] = useState();

  const params = {
    name: name,
    phone: phone,
    email: email,
    position: position,
    address: address,
    source_id: source_id,
    websize: websize,
    company: company,
    description: description,
    employee_charge_id: employee_charge_id,
    province_id: province_id,
    districts_id: districts_id,
    nation_id: nation_id,
    postal_code: postal_code,
    customer_potential_status_id: customer_potential_status_id,
  };

  const handleSave = () => {
    // console.log(params);
    dispatch(addCustomerPotentialAPI(params));
    setIsOpen(false);
    setTimeout(() => {
      dispatch(listCustomerPotentialAPI());
    }, 500);

    handleOpen()
  };

  //load customer group
  let listSources = useSelector(datasources);
  let listNations = useSelector(datanations);
  let listProvinces = useSelector(dataprovinces);
  let listStatus = useSelector(dataStatusSelect);
  let listUser = useSelector(dataUserSelect);
  //console.log(listNations, listProvinces);
  useEffect(() => {
    dispatch(sourcesAPI());
    dispatch(nationsAPI());
    dispatch(provincesAPI());
    dispatch(listStatusAPI());
    dispatch(ListUserApi());
  }, [isOpen]);

  let listDistricts = useSelector(datadictricts);
  //console.log("listDistricts", listDistricts);
  const onChangeProvince = (id) => {
    setprovince_id(id);
    console.log("Hello");
    dispatch(dictrictsAPI(id));
  };

  const onChangeNation_id = (id) => {
    setnation_id(id);
    setdistricts_id("");
    setprovince_id("");
  };

  const style = {
    backgroundColor: "#2d50b2",
    color: "white",
    borderRadius: "10px",
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "10px",
      borderColor: state.isFocused ? "none" : "none",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 118, 255, 0.3)" : null,
      "&:hover": {
        borderColor: state.isFocused ? "none" : "none",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted gray",
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#0070f3" : "white",
      "&:hover": {
        backgroundColor: "#0070f3",
        color: "white",
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <>
      <Button
        className="flex items-center gap-3"
        color="blue"
        size="sm"
        onClick={handleOpen}
      >
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
        Khách hàng tiềm năng mới
      </Button>
      <Dialog size="md" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Thêm khách hàng tiềm năng mới
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <hr className="w-full" />
        <DialogBody className="overflow-y-scroll pr-2 h-[80%]">
          <div className="text-slate-500 text-xs leading-relaxed grid grid-cols-3 gap-5 justify-center">
            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Trạng thái
              </label>
              <Select
                // value={listStatus.filter(
                //   (item) => item.value == customer_potential_status_id
                // )}
                options={listStatus}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) =>
                  setcustomer_potential_status_id(event.value)
                }
                isSearchable={true}
                isClearable={true}
                menuPlacement="auto"
              />
            </div>

            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Nguồn
              </label>
              <Select
                // value={listSources.filter(
                //   (item) => item.value == source_id
                // )}
                options={listSources}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) => setsource_id(event.value)}
                isSearchable={true}
                isClearable={true}
                menuPlacement="auto"
              />
            </div>

            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Nhân viên tiếp nhận
              </label>
              <Select
                // value={listUser.filter(
                //   (item) => item.value == employee_charge_id
                // )}
                options={listUser}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) => setemployee_charge_id(event.value)}
                isSearchable={true}
                isClearable={true}
                menuPlacement="auto"
              />
            </div>
            <hr className="col-span-3" />
            <div className="col-span-3 grid grid-cols-3 gap-3">
              <div className="col-span-1 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Tên
                </label>
                <Input
                  type="text"
                  placeholder="Nhập tên"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={name ?? ""}
                  onChange={(event) => setname(event.target.value)}
                  containerProps={{ className: "!min-w-[100px]" }}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  value={name}
                  type="text"
                  onChange={(event) => setname(event.target.value)}
                  placeholder="Nhập tên"
                /> */}
              </div>
              <div className="col-span-1 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phone"
                >
                  Điện thoại
                </label>
                <Input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={phone ?? ""}
                  onChange={(event) => setphone(event.target.value)}
                  containerProps={{ className: "!min-w-[100px]" }}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  value={phone}
                  type="text"
                  onChange={(event) => setphone(event.target.value)}
                  placeholder="Nhập số điện thoại"
                /> */}
              </div>
              <div className="col-span-1 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="Nhập email"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={email ?? ""}
                  onChange={(event) => setemail(event.target.value)}
                  containerProps={{ className: "!min-w-[100px]" }}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  value={email}
                  type="text"
                  onChange={(event) => setemail(event.target.value)}
                  placeholder="Nhập email"
                /> */}
              </div>
              <div className="col-span-1 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="web"
                >
                  Website
                </label>
                <Input
                  type="text"
                  placeholder="Nhập website"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={websize ?? ""}
                  onChange={(event) => setwebsite(event.target.value)}
                  containerProps={{ className: "!min-w-[100px]" }}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="web"
                  value={websize}
                  type="text"
                  onChange={(event) => setwebsite(event.target.value)}
                  placeholder="Nhập website"
                /> */}
              </div>
              <div className="col-span-1 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="company"
                >
                  Công ty
                </label>
                <Input
                  type="text"
                  placeholder="Nhập công ty"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={company ?? ""}
                  onChange={(event) => setcompany(event.target.value)}
                  containerProps={{ className: "!min-w-[100px]" }}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="company"
                  value={company}
                  type="text"
                  onChange={(event) => setcompany(event.target.value)}
                  placeholder="Nhập công ty"
                /> */}
              </div>
              <div className="col-span-1 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Địa chỉ
                </label>
                <Input
                  type="text"
                  placeholder="Nhập địa chỉ"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={address ?? ""}
                  onChange={(event) => setaddress(event.target.value)}
                  containerProps={{ className: "!min-w-[100px]" }}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  value={address}
                  type="text"
                  onChange={(event) => setaddress(event.target.value)}
                  placeholder="Nhập địa chỉ"
                /> */}
              </div>
              <div className="col-span-1 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="postal"
                >
                  Mã bưu chính
                </label>
                <Input
                  type="text"
                  placeholder="Nhập mã bưu chính"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={postal_code ?? ""}
                  onChange={(event) => setpostal_code(event.target.value)}
                  containerProps={{ className: "!min-w-[100px]" }}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="postal"
                  value={postal_code}
                  type="text"
                  onChange={(event) => setpostal_code(event.target.value)}
                  placeholder="Nhập mã bưu chính"
                /> */}
              </div>
              <div className="col-span-1 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="position"
                >
                  Vị trí
                </label>
                <Input
                  type="text"
                  placeholder="Nhập vị trí"
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  labelProps={{
                    className: "hidden",
                  }}
                  value={position ?? ""}
                  onChange={(event) => setposition(event.target.value)}
                  containerProps={{ className: "!min-w-[100px]" }}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="position"
                  value={position}
                  type="text"
                  onChange={(event) => setposition(event.target.value)}
                  placeholder="Nhập vị trí"
                /> */}
              </div>
              <div className="col-span-1 w-full">
                <label className="block text-gray-700 text-xs font-bold mb-2">
                  Tỉnh / Thành phố
                </label>
                <Select
                  // value={listProvinces.filter(
                  //   (item) => item.value == province_id
                  // )}
                  options={listProvinces}
                  className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  onChange={(event) => onChangeProvince(event.value)}
                  isSearchable={true}
                  isClearable={true}
                  menuPlacement="auto"
                />
              </div>
              <div className="col-span-1 w-full">
                <label className="block text-gray-700 text-xs font-bold mb-2">
                  Quận / Huyện
                </label>
                <Select
                  // value={listDistricts.filter(
                  //   (item) => item.value == districts_id
                  // )}
                  options={listDistricts}
                  className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  onChange={(event) => setdistricts_id(event.value)}
                  isSearchable={true}
                  isClearable={true}
                  menuPlacement="auto"
                />
              </div>

              <div className="col-span-1 w-full">
                <label className="block text-gray-700 text-xs font-bold mb-2">
                  Quốc gia
                </label>
                <Select
                  // value={listNations.filter(
                  //   (item) => item.value == nation_id
                  // )}
                  options={listNations}
                  className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  onChange={(event) => onChangeNation_id(event.value)}
                  isSearchable={true}
                  isClearable={true}
                  menuPlacement="auto"
                />
              </div>
              <div className="col-span-3 w-full">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Mô tả
                </label>
                <Textarea
                  // className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                  color="blue"
                  label="Nhập mô tả"
                  onChange={(event) => setdescription(event.target.value)}
                />
                {/* <textarea
                  className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="description"
                  id=""
                  cols="30"
                  onChange={(event) => setdescription(event.target.value)}
                  rows="5"
                ></textarea> */}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-end gap-2 border-t border-blue-gray-50">
          <Button size="sm" color="red" onClick={handleOpen}>
            Đóng
          </Button>
          <Button size="sm" color="green" onClick={() => handleSave()}>
            Thêm mới
          </Button>
        </DialogFooter>
      </Dialog>
      {/* <header className="flex justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          color="green"
          style={{ padding: "5px 10px", textTransform: "capitalize" }}
        >
          Khách hàng tiềm năng mới
        </Button>
      </header>
      <main
        className={
          "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out" +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-200 opacity-0 translate-x-full")
        }
      >
        <section
          className={
            "w-screen right-0 top-1 rounded-xl border-l border-gray-400 absolute bg-transparent h-full max-w-2xl shadow-2xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative w-screen flex flex-col overflow-y-scroll h-full max-w-2xl">
            <div className="flex justify-between items-center">
              <div className="p-2 px-10 font-semibold text-lg bg-[#f5f6fa] rounded-t-xl">
                <div className="">Thêm khách hàng tiềm năng</div>
              </div>
              <div className="font-bold text-lg bg-[#f5f6fa] rounded-md mr-6 mt-2">
                <Button onClick={() => setIsOpen(false)} variant="text">
                  <ClearIcon />
                </Button>
              </div>
            </div>
            <div //content
              className="p-4 bg-[#f5f6fa] border-t-4 border-4 h-full"
            >
              <div className="text-slate-500 text-xs leading-relaxed grid grid-cols-3 gap-5 justify-center">
                <div className="col-span-1 w-full">
                  <label className="block text-gray-700 text-xs font-bold mb-2">
                    Trạng thái
                  </label>
                  <Select
                    // value={listStatus.filter(
                    //   (item) => item.value == customer_potential_status_id
                    // )}
                    className="w-full"
                    options={listStatus}
                    className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                    onChange={(event) =>
                      setcustomer_potential_status_id(event.value)
                    }
                    isSearchable={true}
                    isClearable={true}
                  />
                </div>

                <div className="col-span-1 w-full">
                  <label className="block text-gray-700 text-xs font-bold mb-2">
                    Nguồn
                  </label>
                  <Select
                    // value={listSources.filter(
                    //   (item) => item.value == source_id
                    // )}
                    className="w-full"
                    options={listSources}
                    className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                    onChange={(event) => setsource_id(event.value)}
                    isSearchable={true}
                    isClearable={true}
                  />
                </div>

                <div className="col-span-1 w-full">
                  <label className="block text-gray-700 text-xs font-bold mb-2">
                    Nhân viên tiếp nhận
                  </label>
                  <Select
                    // value={listUser.filter(
                    //   (item) => item.value == employee_charge_id
                    // )}
                    className="w-full"
                    options={listUser}
                    className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                    onChange={(event) => setemployee_charge_id(event.value)}
                    isSearchable={true}
                    isClearable={true}
                  />
                </div>
                <hr className="col-span-3" />
                <div className="col-span-3 grid grid-cols-3 gap-3">
                  <div className="col-span-1 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Tên
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      value={name}
                      type="text"
                      onChange={(event) => setname(event.target.value)}
                      placeholder="Nhập tên"
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Điện thoại
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      value={phone}
                      type="text"
                      onChange={(event) => setphone(event.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      value={email}
                      type="text"
                      onChange={(event) => setemail(event.target.value)}
                      placeholder="Nhập email"
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="web"
                    >
                      Website
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="web"
                      value={websize}
                      type="text"
                      onChange={(event) => setwebsite(event.target.value)}
                      placeholder="Nhập website"
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="company"
                    >
                      Công ty
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="company"
                      value={company}
                      type="text"
                      onChange={(event) => setcompany(event.target.value)}
                      placeholder="Nhập công ty"
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="address"
                    >
                      Địa chỉ
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="address"
                      value={address}
                      type="text"
                      onChange={(event) => setaddress(event.target.value)}
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="postal"
                    >
                      Mã bưu chính
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="postal"
                      value={postal_code}
                      type="text"
                      onChange={(event) => setpostal_code(event.target.value)}
                      placeholder="Nhập mã bưu chính"
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="position"
                    >
                      Vị trí
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="position"
                      value={position}
                      type="text"
                      onChange={(event) => setposition(event.target.value)}
                      placeholder="Nhập vị trí"
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label className="block text-gray-700 text-xs font-bold mb-2">
                      Tỉnh / Thành phố
                    </label>
                    <Select
                      // value={listProvinces.filter(
                      //   (item) => item.value == province_id
                      // )}
                      options={listProvinces}
                      className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                      onChange={(event) => onChangeProvince(event.value)}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </div>
                  <div className="col-span-1 w-full">
                    <label className="block text-gray-700 text-xs font-bold mb-2">
                      Quận / Huyện
                    </label>
                    <Select
                      // value={listDistricts.filter(
                      //   (item) => item.value == districts_id
                      // )}
                      options={listDistricts}
                      className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                      onChange={(event) => setdistricts_id(event.value)}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </div>

                  <div className="col-span-1 w-full">
                    <label className="block text-gray-700 text-xs font-bold mb-2">
                      Quốc gia
                    </label>
                    <Select
                      // value={listNations.filter(
                      //   (item) => item.value == nation_id
                      // )}
                      options={listNations}
                      className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                      onChange={(event) => onChangeNation_id(event.value)}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </div>
                  <div className="col-span-3 w-full">
                    <label
                      className="block text-gray-700 text-xs font-bold mb-2"
                      htmlFor="description"
                    >
                      Mô tả
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="description"
                      id=""
                      cols="30"
                      onChange={(event) => setdescription(event.target.value)}
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 h-12 border-t z-50 border-gray-400 flex justify-center items-center gap-4 shadow-xl w-full bg-white rounded-t-lg">
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsOpen(false)}
              >
                Đóng
              </Button>
              <Button variant="outlined" onClick={() => handleSave()}>
                THÊM
              </Button>
            </div>
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer "
          onClick={() => {
            setIsOpen(false);
          }}
        ></section>
      </main> */}
    </>
  );
};

export default drawerAdd;
