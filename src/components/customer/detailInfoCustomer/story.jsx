import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { style } from "@mui/system";
import TextField from "@mui/material/TextField";
import {
  dictrictsAPI,
  provincesAPI,
  nationsAPI,
  datadictricts,
  dataprovinces,
  datanations,
} from "../../../features/addressSlice";
import {
  dataHistoryCustomer,
  historyCustomerApi,
  data,
  listCustomerGroupAPI,
  historyCustomerUpdateApi,
} from "../../../features/customerSlice";
import { useDispatch, useSelector } from "react-redux";

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
const story = (props) => {
  const [company, setcompany] = useState();
  const [website, setwebsite] = useState();
  const [phone, setphone] = useState();
  const [group, setgroup] = useState();
  const [currency, setcurrency] = useState();
  const [address, setaddress] = useState();

  const dispatch = useDispatch();

  let listNations = useSelector(datanations);
  let listProvinces = useSelector(dataprovinces);
  let listCustomerGroup = useSelector(data);
  useEffect(() => {
    dispatch(nationsAPI());
    dispatch(provincesAPI());
    dispatch(listCustomerGroupAPI());
  }, []);

  const [district_id, setdistrict_id] = useState();
  const [province_id, setprovince_id] = useState();
  const [nation_id, setnation_id] = useState();

  // console.log(district_id, province_id, nation_id);

  let listDistricts = useSelector(datadictricts);
  //console.log("listDistricts", listDistricts);
  const onChangeProvince = (id) => {
    setprovince_id(id);
    console.log("story");
    dispatch(dictrictsAPI(id));
  };

  const onChangeNation_id = (id) => {
    setnation_id(id);
  };

  let tmp = useSelector(dataHistoryCustomer);
  // console.log();
  useEffect(() => {
    dispatch(historyCustomerApi(props.id));
  }, [props.id]);

  useEffect(() => {
    setcompany(tmp?.company);
    setwebsite(tmp?.website);
    setphone(tmp?.phone);
    setgroup(tmp?.group);
    setcurrency(tmp?.currency);
    setaddress(tmp?.address);
    setdistrict_id(tmp?.district_id);
    setprovince_id(tmp?.province_id);
    setnation_id(tmp?.nation_id);
  }, [tmp]);

  const request = {
    company: company,
    website: website,
    phone: phone,
    group: group,
    currency: currency,
    address: address,
    district_id: district_id,
    province_id: province_id,
    nation_id: nation_id,
    id: props.id,
  };

  const handleSave = () => {
    dispatch(historyCustomerUpdateApi(request));
  };

  return (
    <>
      <div className="py-2 border-b px-4 w-full text-gray-600 font-medium flex justify-between items-center">
        <div className="">Tiểu xử</div>
        <div className="">
          <Button className="" variant="outlined" onClick={() => handleSave()}>
            Xác nhận
          </Button>
        </div>
      </div>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="p-4 grid grid-cols-2 gap-4"
      >
        <div className="flex flex-col gap-4">
          <TextField
            id="outlined-basic"
            label="Tên doanh nghiệp"
            variant="outlined"
            value={company}
            onChange={(event) => setcompany(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Điện thoại"
            variant="outlined"
            value={phone}
            onChange={(event) => setphone(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Website"
            variant="outlined"
            value={website}
            onChange={(event) => setwebsite(event.target.value)}
          />
          <FormControl className="col-span-3 w-full">
            <InputLabel id="demo-simple-select-label">
              Nhóm Khách hàng
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Nhóm Khách hàng"
              value={group}
              onChange={(event) => setgroup(event.target.value)}
            >
              {listCustomerGroup &&
                listCustomerGroup.length > 0 &&
                listCustomerGroup.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Đơn vị tiền"
            variant="outlined"
            value={currency}
            onChange={(event) => setcurrency(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <TextField
            id="outlined-multiline-static"
            label="Địa chỉ"
            multiline
            value={address}
            onChange={(event) => setaddress(event.target.value)}
            rows={4}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Thành Phố-Tỉnh
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Thành phố-Tỉnh"
              value={province_id}
              onChange={(event) => onChangeProvince(event.target.value)}
              MenuProps={MenuProps}
            >
              {listProvinces &&
                listProvinces.length > 0 &&
                listProvinces.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.type} {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Quận huyện</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Quận huyện"
              value={district_id}
              onChange={(event) => setdistrict_id(event.target.value)}
              MenuProps={MenuProps}
            >
              {listDistricts &&
                listDistricts.length > 0 &&
                listDistricts.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.type} {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Quốc gia</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Quốc gia"
              defaultValue={nation_id}
              onChange={(event) => onChangeNation_id(event.target.value)}
              MenuProps={MenuProps}
            >
              {listNations &&
                listNations.length > 0 &&
                listNations.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
      </Box>

      {/* <div className="flex justify-start items-center py-4 px-4 gap-2">
        <div
          onClick={() => setValue(1)}
          className={
            "py-1 px-3 rounded cursor-pointer " +
            (value == 1 ? "bg-[#2d50b2] border text-white" : "")
          }
        >
          Thông tin khách hàng
        </div>
        <div
          onClick={() => setValue(3)}
          className={
            "py-1 px-3 rounded cursor-pointer " +
            (value == 3 ? "bg-[#2d50b2] border text-white" : "")
          }
        >
          Quản trị khách hàng
        </div>
        <div
          onClick={() => setValue(4)}
          className={
            "py-1 px-3 rounded cursor-pointer " +
            (value == 4 ? "bg-[#2d50b2] border text-white" : "")
          }
        >
          Đơn mua hàng
        </div>
      </div> */}
    </>
  );
};

export default story;
