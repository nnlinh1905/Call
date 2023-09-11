import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
// import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import No_img from "../../assets/icon/no-image.png";
import {
  addCustomerAPI,
  dataShowCustomer,
  showCustomerApi,
  listCustomerGroupAPI,
  data,
  datasources,
  sourcesAPI,
  editCustomerAPI,
  listCustomerAPI,
  historyCustomerApi,
} from "../../features/customerSlice";
import Edit from "../../assets/icon/edit.png";
import Select from "react-select";
import {
  nationsAPI,
  datanations,
  provincesAPI,
  dataprovinces,
  dictrictsAPI,
  datadictricts,
} from "../../features/addressSlice";
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
} from "@material-tailwind/react";
import AvatarDefault from "../../assets/image/avatar_default.png";
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
          <Typography component="span">{children}</Typography>
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

const drawerEditCustomer = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setIsOpen((cur) => !cur);

  //tab
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //
  const [customers_group_id, setcustomers_group_id] = useState();
  const [avatar, setavatar] = useState();
  const [first_name, setfirst_name] = useState();
  const [last_name, setlast_name] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [identity, setidentity] = useState();
  const [address, setaddress] = useState();
  const [district_id, setdistrict_id] = useState();
  const [province_id, setprovince_id] = useState();
  const [nation_id, setnation_id] = useState();
  const [id, setid] = useState();
  const [source_id, setsource_id] = useState();

  const params = {
    customers_group_id: customers_group_id,
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    identity: identity,
    address: address,
    district_id: district_id,
    province_id: province_id,
    nation_id: nation_id,
    source_id: source_id,
    id: id,
  };

  const handleSave = () => {
    if (!first_name || !last_name || !phone || !email) {
      toast.error("Vui lòng nhập đầy đủ thông tin cần thiết!");
    } else {
      dispatch(editCustomerAPI(params));

      setTimeout(() => {
        dispatch(listCustomerAPI());
        dispatch(historyCustomerApi(id));
      }, 200);
      setIsOpen(false);
    }
    handleOpen()
  };

  let tmp = useSelector(dataShowCustomer);
  console.log("1231234234234234324234",tmp);

  useEffect(() => {
    dispatch(showCustomerApi(props?.id));
    dispatch(listCustomerGroupAPI());
    dispatch(sourcesAPI());
    dispatch(nationsAPI());
    dispatch(provincesAPI());
    setIsOpen(true);
  }, [props?.isOpen]);

  useEffect(() => {
    setcustomers_group_id(tmp?.customers_group_id);
    setavatar(tmp?.avatar);
    setfirst_name(tmp?.first_name);
    setlast_name(tmp?.last_name);
    setemail(tmp?.email);
    setphone(tmp?.phone);
    setidentity(tmp?.identity);
    setaddress(tmp?.address);
    setdistrict_id(tmp?.districts_id);
    setprovince_id(tmp?.province_id);
    setnation_id(tmp?.nation_id);
    setsource_id(tmp?.source_id);
    setid(tmp?.id);
  }, [tmp]);

  let listCustomerGroup = useSelector(data);
  let listSources = useSelector(datasources);
  let listNations = useSelector(datanations);
  let listProvinces = useSelector(dataprovinces);
  let listDistricts = useSelector(datadictricts);
  //console.log("listDistricts", listDistricts);
  const onChangeProvince = (id) => {
    setprovince_id(id);
    console.log("edit khách hàng");
    dispatch(dictrictsAPI(id));
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

  const handleChangeNguon = (e) => {
    console.log("đâsdasdad", e.value)
  }

  return (
    <>
      <Dialog size="md" open={isOpen} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Sửa thông tin khách hàng
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
          <div className="text-slate-500 text-xs leading-relaxed grid grid-cols-4 gap-2 justify-center">
            <div className="col-span-2 w-full">
              <label
                className="block text-gray-700 text-xs font-bold mb-2"
                htmlFor="first_name"
              >
                Ảnh đại diện
              </label>
              <Avatar
                size="xl"
                alt="avatar"
                src={AvatarDefault}
                className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
              />
            </div>
            <div className="col-span-3"></div>
            <hr className="col-span-4" />
            <div className="col-span-2 w-full">
              <label
                className="block text-gray-700 text-xs font-bold mb-2"
                htmlFor="first_name"
              >
                Họ
              </label>
              <Input
                type="text"
                placeholder="Nhập họ"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                labelProps={{
                  className: "hidden",
                }}
                value={first_name ?? ""}
                onChange={(event) => setfirst_name(event.target.value)}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className="col-span-2 w-full">
              <label
                className="block text-gray-700 text-xs font-bold mb-2"
                htmlFor="last_name"
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
                value={last_name ?? ""}
                onChange={(event) => setlast_name(event.target.value)}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className="col-span-2 w-full">
              <label
                className="block text-gray-700 text-xs font-bold mb-2"
                htmlFor="phone"
              >
                Số điện thoại
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
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className="col-span-2 w-full">
              <label
                className="block text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                type="email"
                placeholder="Nhập Email"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                labelProps={{
                  className: "hidden",
                }}
                value={email ?? ""}
                onChange={(event) => setemail(event.target.value)}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className="col-span-2 w-full">
              <label
                className="block text-gray-700 text-xs font-bold mb-2"
                htmlFor="identity"
              >
                CCCD/CMND
              </label>
              <Input
                type="text"
                placeholder="Nhập CCCD"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                labelProps={{
                  className: "hidden",
                }}
                value={identity ?? ""}
                onChange={(event) => setidentity(event.target.value)}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className="col-span-2 w-full">
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
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className="col-span-2 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Nguồn
              </label>
              <Select
                value={listSources[4]}
                options={listSources}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) => handleChangeNguon(event)}
                isSearchable={true}
                isClearable={true}
                menuPlacement="auto"
              />
            </div>
            <div className="col-span-2 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Nhóm khách hàng
              </label>
              <Select
                value={
                  listCustomerGroup &&
                  listCustomerGroup.length > 0 &&
                  listCustomerGroup.filter(
                    (item) => item.id == customers_group_id
                  )
                }
                options={listCustomerGroup}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) => setcustomers_group_id(event.value)}
                isSearchable={true}
                isClearable={true}
                menuPlacement="auto"
              />
            </div>
            <div className="col-span-2 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Tỉnh / Thành phố
              </label>
              <Select
                value={
                  listProvinces &&
                  listProvinces.length > 0 &&
                  listProvinces.filter((item) => item.id == province_id)
                }
                options={listProvinces}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) => onChangeProvince(event.value)}
                isSearchable={true}
                isClearable={true}
                menuPlacement="auto"
              />
            </div>
            <div className="col-span-2 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Quận / Huyện
              </label>
              <Select
                value={
                  listDistricts &&
                  listDistricts.length > 0 &&
                  listDistricts.filter((item) => item.id == district_id)
                }
                options={listDistricts}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) => setdistrict_id(event.value)}
                isSearchable={true}
                isClearable={true}
                menuPlacement="auto"
              />
            </div>
            <div className="col-span-2 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Quốc gia
              </label>
              <Select
                value={
                  listNations &&
                  listNations.length > 0 &&
                  listNations.filter((item) => item.id == nation_id)
                }
                options={listNations}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) => onChangeNation_id(event.value)}
                isSearchable={true}
                isClearable={true}
                menuPlacement="auto"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-end gap-2 border-t border-blue-gray-50">
          <Button size="sm" color="red" onClick={handleOpen}>
            Đóng
          </Button>
          <Button size="sm" color="green" onClick={handleSave}>
            Xác nhận
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default drawerEditCustomer;
