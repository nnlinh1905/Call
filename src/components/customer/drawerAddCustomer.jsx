import React, { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import No_img from "../../assets/icon/no-image.png";
import {
  addCustomerAPI,
  listCustomerGroupAPI,
  data,
  datasources,
  sourcesAPI,
  listCustomerAPI,
} from "../../features/customerSlice";
import Select from "react-select";
import {
  nationsAPI,
  datanations,
  provincesAPI,
  dataprovinces,
  dictrictsAPI,
  datadictricts,
} from "../../features/addressSlice";

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
} from "@material-tailwind/react";
import AvatarDefault from "../../assets/image/avatar_default.png";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
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

const drawerAddCustomer = () => {
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
  };

  const handleSave = () => {
    if (!first_name || !last_name || !phone || !email) {
      toast.error("Vui lòng nhập đầy đủ thông tin cần thiết!");
    } else {
      dispatch(addCustomerAPI(params));
      setIsOpen(false);
      setTimeout(() => {
        dispatch(listCustomerAPI());
      }, 500);
    }
    handleOpen();
  };

  //load customer group
  let listCustomerGroup = useSelector(data);
  let listSources = useSelector(datasources);
  let listNations = useSelector(datanations);
  let listProvinces = useSelector(dataprovinces);

  //console.log(listNations, listProvinces);
  useEffect(() => {
    dispatch(listCustomerGroupAPI());
    dispatch(sourcesAPI());
    dispatch(nationsAPI());
    dispatch(provincesAPI());
  }, [isOpen]);

  let listDistricts = useSelector(datadictricts);
  //console.log("listDistricts", listDistricts);
  const onChangeProvince = (id) => {
    setprovince_id(id);
    console.log("add khách hàng");
    dispatch(dictrictsAPI(id));
  };

  const onChangeNation_id = (id) => {
    setnation_id(id);
    setdistrict_id("");
    setprovince_id("");
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
        Thêm mới
      </Button>
      <Dialog size="md" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Thêm Khách hàng mới
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
                value={first_name}
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
                value={last_name}
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
                value={phone}
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
                value={email}
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
                value={identity}
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
                value={address}
                onChange={(event) => setaddress(event.target.value)}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className="col-span-2 w-full">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Nguồn
              </label>
              <Select
                // value={
                //   listSources &&
                //   listSources.length > 0 &&
                //   listSources.filter((item) => item.value == source_id)
                // }
                options={listSources}
                className="!border-gray-50 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                onChange={(event) => setsource_id(event.value)}
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
                // value={
                //   listCustomerGroup &&
                //   listCustomerGroup.length > 0 &&
                //   listCustomerGroup.filter((item) => item.value == source_id)
                // }
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
                // value={
                //   listProvinces &&
                //   listProvinces.length > 0 &&
                //   listProvinces.filter((item) => item.value == province_id)
                // }
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
                // value={
                //   listDistricts &&
                //   listDistricts.length > 0 &&
                //   listDistricts.filter((item) => item.value == district_id)
                // }
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
                // value={
                //   listNations &&
                //   listNations.length > 0 &&
                //   listNations.filter((item) => item.value == nation_id)
                // }
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
            Thêm mới
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default drawerAddCustomer;
