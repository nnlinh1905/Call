import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Routes, Route } from "react-router-dom";
//
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import {
  updatePBXAPI,
  dataPBX,
  showPBXAPI,
  updateActiveAPI,
  updateActiveClickToCallAPI,
} from "../../../features/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { TenMp } from "@mui/icons-material";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
//tabs
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

//switch
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
const settingPBX = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //check Accordion

  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [domain, setdomain] = useState(" ");
  const [password, setpassword] = useState(" ");
  const [wss, setwss] = useState(" ");
  const [LenghtArr, setLenghtArr] = useState(1);
  const [phone, setphone] = useState([]);
  const [name, setname] = useState([]);
  const [key, setkey] = useState([]);
  const [checkDefault, setcheckDefault] = useState(" ");
  const [dataListPhone, setdataListPhone] = useState([]);
  const [active, setactive] = useState(0);
  const [clickToCall, setclickToCall] = useState(0);
  const [link_portal, setlink_portal] = useState(" ");
  const [key_crm, setkey_crm] = useState(" ");
  const [domain_click_to_call, setdomain_click_to_call] = useState(" ");

  const dispatch = useDispatch();

  const handleSetPhone = (val, index) => {
    let arr = [...phone];
    let dataList = [...dataListPhone];
    if (arr.length < index) {
      arr.push(val);
    } else {
      arr[index] = val;
      dataList[index].phone = val;
    }
    setdataListPhone(dataList);
    setphone(arr);
  };

  const handleSetName = (val, index) => {
    let arr = [...name];
    let dataList = [...dataListPhone];
    if (arr.length < index) {
      arr.push(val);
    } else {
      //console.log(index);
      arr[index] = val;
      //console.log("var", val);
      //console.log("bien", dataList[index].name_group);
      dataList[index].name_group = val;
      //console.log("dataList", dataList);
    }
    //console.log("arr", arr);
    setdataListPhone(dataList);
    setname(arr);
  };

  const handleSetKey = async (val, index) => {
    let arr = [...key];
    let dataList = [...dataListPhone];
    if (arr.length < index) {
      arr.push(val);
    } else {
      arr[index] = val;
      dataList[index].key = val;
    }
    setdataListPhone(dataList);
    setkey(arr);
  };

  const request = {
    link_portal: link_portal,
    key_crm: key_crm,
    domain_click_to_call: domain_click_to_call,
    domain: domain,
    password: password,
    wss: wss,
    phone: phone,
    name: name,
    key: key,
    checkDefault: checkDefault,
    click_to_call: clickToCall,
  };

  const tmp = useSelector(dataPBX);

  useEffect(() => {
    dispatch(showPBXAPI());
  }, []);

  console.log("tmp", tmp);
  useEffect(() => {
    setdataListPhone(tmp?.phone);
    setdomain(tmp?.domain);
    setpassword(tmp?.password);
    setwss(tmp?.wss);
    setactive(tmp?.active);
    setclickToCall(tmp?.click_to_call);
    setlink_portal(tmp?.link_portal);
    setkey_crm(tmp?.key_crm);
    setdomain_click_to_call(tmp?.domain_click_to_call);
  }, [tmp]);

  useEffect(() => {
    //console.log(dataListPhone);
    setphone(dataListPhone?.map((item) => item.phone));
    setname(dataListPhone?.map((item) => item.name_group));
    setkey(dataListPhone?.map((item) => item.key));
  }, [dataListPhone]);

  const handleAdd = () => {
    let arr = [...dataListPhone];
    for (let index = 0; index < arr.length; index++) {
      if (!arr[index].phone || !arr[index].name_group || !arr[index].key) {
        toast.error("Vui lòng nhập đầy đủ thông tin");
        return;
      }
    }

    arr = arr.map((item) => ({ ...item, in_call: "0" }));

    let obj = {};
    obj.phone = "";
    obj.name_group = "";
    obj.key = "";
    obj.in_call = "1";
    arr.push(obj);
    setdataListPhone(arr);
  };

  const handlUpdate = () => {
    let arr = [...dataListPhone];

    for (let index = 0; index < arr.length; index++) {
      if (!arr[index].phone || !arr[index].name_group || !arr[index].key) {
        toast.error("Vui lòng nhập đầy đủ thông tin");
        return;
      }
    }
    dispatch(updatePBXAPI(request));
  };
  const handleSetDefault = (index) => {
    let arr = [...dataListPhone];
    arr = arr?.map((item) => ({ ...item, in_call: "0" }));
    arr[index].in_call = "1";
    //console.log("first", arr);
    setdataListPhone(arr);
    setcheckDefault(phone[index]);
  };

  const handleDelete = (id) => {
    let arr = [...dataListPhone];
    arr = arr.filter((item) => item.id != id);
    setdataListPhone(arr);
  };

  const handleChangeActive = () => {
    if (clickToCall == 1) {
      dispatch(updateActiveClickToCallAPI({ click_to_call: 0 }));
      setclickToCall(0);
      localStorage.setItem("settingCallClickToCall", 0);
    }
    const request = {
      active: active == 1 ? 0 : 1,
    };
    loadCall();
    localStorage.setItem("settingCall", active == 1 ? 0 : 1);
    dispatch(updateActiveAPI(request));
    toast.success("đã cập nhật");
    setactive(active == 1 ? 0 : 1); // 0 là tắt, 1 là bật
    handleClose();
  };

  const handleChangeActiveClickToCall = () => {
    if (active == 1) {
      localStorage.setItem("settingCall", 0);
      dispatch(updateActiveAPI({ active: 0 }));
      setactive(0);
    }
    dispatch(
      updateActiveClickToCallAPI({ click_to_call: clickToCall == 1 ? 0 : 1 })
    );
    localStorage.setItem("settingCallClickToCall", clickToCall == 1 ? 0 : 1);
    toast.success("đã cập nhật");
    setclickToCall(clickToCall == 1 ? 0 : 1);
    handleCloseClickToCall();
  };

  //modal

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openClickToCall, setOpenClickToCall] = useState(false);
  const handleOpenClickToCall = () => setOpenClickToCall(true);
  const handleCloseClickToCall = () => setOpenClickToCall(false);

  const handlUpdateClickToCall = () => {
    const request = {
      link_portal: link_portal,
      key_crm: key_crm,
      domain_click_to_call: domain_click_to_call,
      domain: domain,
      password: password,
      wss: wss,
      phone: phone,
      name: name,
      key: key,
      checkDefault: checkDefault,
      click_to_call: clickToCall,
    };
    dispatch(updatePBXAPI(request));
  };
  console.log("active", active);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Xác nhận
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Dữ liệu sẽ được thay đổi và ảnh hưởng đến Click to call! Bạn có chắc
            muốn thay không?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex justify-end gap-4">
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={handleClose}
              >
                Bỏ qua
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleChangeActive}
              >
                Đông ý
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openClickToCall}
        onClose={handleCloseClickToCall}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Xác nhận
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Dữ liệu sẽ được thay đổi và ảnh hưởng đến SmartVCC! Bạn có chắc muốn
            thay không?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex justify-end gap-4">
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={handleCloseClickToCall}
              >
                Bỏ qua
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleChangeActiveClickToCall}
              >
                Đông ý
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <div className="text-white">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="SmartVCC" {...a11yProps(0)} />
              <Tab label="Click to call" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div //check off
              className="px-5 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={active == 1 ? true : false}
                    onClick={handleOpen}
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-black">SmartVCC</span>
              </div>
              <Button
                variant="outlined"
                className="w-1/5"
                onClick={() => handlUpdate()}
                disabled={active == 1 ? false : true}
              >
                Cập nhật
              </Button>
            </div>

            <div className="text-black mt-5 rounded-xl">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChangeAccordion("panel1")}
                className="py-0"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className="border-b border-gray-500"
                >
                  <Typography
                    component="span"
                    sx={{ width: "33%", flexShrink: 0 }}
                  >
                    Thông số chính
                  </Typography>
                  <Typography component="span" sx={{ color: "text.secondary" }}>
                    Bao gồm các thông số cấu hình cơ bản
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="div">
                    <div className="px-3 pb-3 grid-cols-7 flex justify-between gap-4 items-center">
                      <TextField
                        id="outlined-textarea"
                        label="Domain"
                        required
                        placeholder="abc.vn"
                        value={domain}
                        multiline
                        size="small"
                        className="col-span-2 w-full"
                        onChange={(e) => setdomain(e.target.value)}
                      />
                      <FormControl
                        variant="outlined"
                        className="col-span-2 w-full"
                        size="small"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password *
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password *"
                        />
                      </FormControl>
                      <TextField
                        className="col-span-2 w-full"
                        id="outlined-textarea"
                        label="Wss"
                        required
                        placeholder="wss://..."
                        value={wss}
                        size="small"
                        multiline
                        onChange={(e) => setwss(e.target.value)}
                      />
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChangeAccordion("panel2")}
                className="py-0"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Typography
                    component="span"
                    sx={{ width: "33%", flexShrink: 0 }}
                  >
                    Số điện thoại
                  </Typography>
                  <Typography component="span" sx={{ color: "text.secondary" }}>
                    Thêm các đầu số
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="span">
                    <hr className="-mt-3" />

                    <div className="mt-4 px-7">
                      {dataListPhone &&
                        dataListPhone?.length > 0 &&
                        dataListPhone.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex justify-between items-center gap-5 mx-auto mt-4"
                            >
                              <HighlightOffOutlinedIcon
                                className="text-red-500 w-[14%] cursor-pointer"
                                onClick={() => handleDelete(item?.id)}
                              />
                              <TextField
                                id="outlined-textarea"
                                label="Số điện thoại"
                                required
                                placeholder="0123456789"
                                multiline
                                value={item?.phone}
                                size="small"
                                className="w-[25%]"
                                onChange={(e) =>
                                  handleSetPhone(e.target.value, index)
                                }
                              />
                              <TextField
                                id="outlined-textarea"
                                label="Name"
                                required
                                placeholder="Name"
                                multiline
                                value={item?.name_group}
                                size="small"
                                className="w-[25%]"
                                onChange={(e) =>
                                  handleSetName(e.target.value, index)
                                }
                              />
                              <TextField
                                id="outlined-textarea"
                                label="Key"
                                required
                                placeholder="123"
                                multiline
                                value={item?.key}
                                size="small"
                                className="w-[25%]"
                                onChange={(e) =>
                                  handleSetKey(e.target.value, index)
                                }
                              />
                              <div className="flex items-center justify-center gap-3 w-[24%] pl-2">
                                <input
                                  type="radio"
                                  id="vehicle1"
                                  name="check"
                                  value="Bike"
                                  checked={item?.in_call == 1 ? true : false}
                                  onClick={() => handleSetDefault(index)}
                                />
                                <label htmlFor="vehicle1">
                                  Mặc định gọi ra
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      {dataListPhone?.length < 0 && (
                        <div className="flex justify-between items-center gap-5 mx-auto mt-4">
                          <HighlightOffOutlinedIcon className="text-red-500 w-[14%]" />
                          <TextField
                            id="outlined-textarea"
                            label="Số điện thoại"
                            required
                            placeholder="0123456789"
                            multiline
                            size="small"
                            className="w-[25%]"
                            onChange={(e) => handleSetPhone(e.target.value, 0)}
                          />
                          <TextField
                            id="outlined-textarea"
                            label="Name"
                            required
                            placeholder="Name"
                            multiline
                            size="small"
                            className="w-[25%]"
                            onChange={(e) => handleSetName(e.target.value, 0)}
                          />
                          <TextField
                            id="outlined-textarea"
                            label="Key"
                            required
                            placeholder="123"
                            multiline
                            size="small"
                            className="w-[25%]"
                            onChange={(e) => handleSetKey(e.target.value, 0)}
                          />
                          <div className="flex items-center justify-center gap-3 w-[24%] pl-2">
                            <input
                              type="radio"
                              id="vehicle1"
                              name="check"
                              value="Bike"
                              onClick={() => handleSetDefault(0)}
                            />
                            <label htmlFor="vehicle1">Mặc định gọi ra</label>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-full mt-4 px-10 gap-4">
                      <Button
                        variant="outlined"
                        className="w-full"
                        onClick={() => handleAdd()}
                      >
                        Thêm mới
                      </Button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div //check off
              className="px-5 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={clickToCall == 1 ? true : false}
                    onClick={handleOpenClickToCall}
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-black">Click to call</span>
              </div>
              <Button
                variant="outlined"
                className="w-1/5"
                onClick={() => handlUpdateClickToCall()}
                disabled={clickToCall == 1 ? false : true}
              >
                Cập nhật
              </Button>
            </div>
            <div className="text-black mt-5 rounded-xl">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChangeAccordion("panel1")}
                className="py-0"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className="border-b border-gray-500"
                >
                  <Typography
                    component="span"
                    sx={{ width: "33%", flexShrink: 0 }}
                  >
                    Thông số chính
                  </Typography>
                  <Typography component="span" sx={{ color: "text.secondary" }}>
                    Bao gồm các thông số cấu hình cơ bản
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component="div">
                    <div className="px-3 pb-3 grid-cols-6 flex justify-between gap-4 items-center">
                      <TextField
                        id="outlined-textarea"
                        label="Domain click to call"
                        required
                        placeholder="abc.vn"
                        value={domain_click_to_call}
                        multiline
                        size="small"
                        className="col-span-2 w-full"
                        onChange={(e) =>
                          setdomain_click_to_call(e.target.value)
                        }
                      />
                      <TextField
                        className="col-span-2 w-full"
                        id="outlined-textarea"
                        label="Link portal"
                        required
                        placeholder="..."
                        value={link_portal}
                        size="small"
                        multiline
                        onChange={(e) => setlink_portal(e.target.value)}
                      />
                      <TextField
                        className="col-span-2 w-full"
                        id="outlined-textarea"
                        label="Key crm"
                        required
                        placeholder="..."
                        value={key_crm}
                        size="small"
                        multiline
                        onChange={(e) => setkey_crm(e.target.value)}
                      />
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default settingPBX;
