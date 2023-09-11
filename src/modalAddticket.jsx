import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import NoImage from "./assets/icon/no-image.png";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { dataShowCustomer, showCustomerApi } from "./features/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalAddUser from "./components/user/drawerAddUser";
import Select from "react-select";

import {
  dataStatusTicketSelect,
  listStatusTickectAPI,
} from "./features/ticketStatusSlice";

import {
  dataTopicTicketSelect,
  listTopicTickectAPI,
} from "./features/ticketTopicSlice";
import {
  dataTypeTicketSelect,
  listTypeTickectAPI,
} from "./features/ticketTypeSlice";
import { ListUserApi, dataUserSelect } from "./features/usersSlice";
import { listTickectAPI, addTickectAPI } from "./features/ticketSlice";
import ModalAddStatus from "./components/tickets/modalAddStatus";
import ModalAddTTopic from "./components/tickets/modalAddTopic";
import ModalAddType from "./components/tickets/modalAddType";
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
const modalAddTicket = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panel1, setPanel1] = useState(true);
  const [panel2, setPanel2] = useState(true);
  const [panel3, setPanel3] = useState(true);

  const [title, settitle] = useState("");
  const [topic_id, setTopic_id] = useState("");
  const [ticket_type_id, setTicket_type_id] = useState("");
  const [note, setNote] = useState("");
  const [reminder_time, setReminder_time] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [ticket_status_id, setTicket_status_id] = useState("");
  const [check, setCheck] = useState(false);

  const [tab, settab] = useState(0);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    settab(newValue);
  };

  useEffect(() => {
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false;
    if (token != false) {
      dispatch(listStatusTickectAPI());
      dispatch(listTopicTickectAPI());
      dispatch(listTypeTickectAPI());
      dispatch(ListUserApi());
    }
  }, [isOpen]);

  const listStatus = useSelector(dataStatusTicketSelect);
  const listTopic = useSelector(dataTopicTicketSelect);
  const listType = useSelector(dataTypeTicketSelect);
  const listUsers = useSelector(dataUserSelect);

  let idUser = localStorage.getItem("idUser")
    ? JSON.parse(localStorage.getItem("idUser"))
    : -1;
  useEffect(() => {
    if (idUser == -1) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  }, [idUser]);

  const request = {
    title: title,
    topic_id: topic_id,
    ticket_type_id: ticket_type_id,
    note: note,
    reminder_time: reminder_time,
    employee_id: employee_id,
    ticket_status_id: ticket_status_id,
    customer_id: props?.customer_id ? props?.customer_id : null,
  };

  const handleSave = () => {
    // console.log(request);
    dispatch(addTickectAPI(request));
    setIsOpen(false);
    setTimeout(() => {
      dispatch(listTickectAPI());
      dispatch(getTicketByCustomerAPI(props?.customer_id));
    }, 500);
  };

  return (
    <>
      <main
        id="isOpen"
        className={
          "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0"
            : " transition-all delay-200 opacity-0 translate-x-full")
        }
      >
        <section
          id="checkModal"
          className={
            "w-screen right-0 top-1 rounded-xl border-l border-gray-400 absolute bg-transparent h-full max-w-2xl shadow-2xl delay-400 duration-500 ease-in-out transition-all transform " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative w-screen flex flex-col h-full max-w-2xl">
            <div className="flex justify-between items-center">
              <div className="p-2 px-10 font-semibold text-lg bg-[#f5f6fa] rounded-t-xl">
                <div className="">Thêm mới</div>
              </div>
              <div
                className="font-bold text-lg bg-[#f5f6fa] rounded-md mr-6 mt-2 "
                onClick={() => handleclose()}
              >
                <Button onClick={() => settab(0)} variant="text" size="small">
                  <ClearIcon />
                </Button>
              </div>
            </div>
            <div className="overflow-y-scroll h-full">
              <div //content
                className="bg-[#f5f6fa] border-t-4 border-4 h-auto"
              >
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={tab}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Phiếu ghi" {...a11yProps(0)} />
                      <Tab label="Thông tin khách hàng" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={tab} index={0}>
                    <div className=" relative">
                      <div className="">
                        <Accordion
                          expanded={panel1}
                          onChange={() => setPanel1(!panel1)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography component="p">
                              Thông tin phiếu ghi
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography component="div">
                              <div className="grid grid-cols-2 gap-4 justify-between">
                                <div className="col-span-2 w-full">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="title"
                                  >
                                    Tên phiếu ghi
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="first_name"
                                    type="text"
                                    defaultValue={title}
                                    onChange={(event) =>
                                      settitle(event.target.value)
                                    }
                                    placeholder="Nhập tên phiếu ghi"
                                  />
                                </div>
                                <div className="col-span-1 w-full">
                                  <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Chủ đề
                                  </label>
                                  <ButtonGroup
                                    className="w-full"
                                    variant="outlined"
                                  >
                                    <Select
                                      className="w-full"
                                      // value={listSources.filter(
                                      //   (item) => item.value == source_id
                                      // )}
                                      options={listTopic}
                                      styles={customStyles}
                                      onChange={(event) =>
                                        setTopic_id(event.value)
                                      }
                                      isSearchable={true}
                                      isClearable={true}
                                    />
                                    <ModalAddTTopic />
                                  </ButtonGroup>
                                </div>
                                <div className="col-span-1 w-full">
                                  <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Phân loại
                                  </label>
                                  <ButtonGroup
                                    className="w-full"
                                    variant="outlined"
                                  >
                                    <Select
                                      className="w-full"
                                      // value={listSources.filter(
                                      //   (item) => item.value == source_id
                                      // )}
                                      options={listType}
                                      styles={customStyles}
                                      onChange={(event) =>
                                        setTicket_type_id(event.value)
                                      }
                                      isSearchable={true}
                                      isClearable={true}
                                    />
                                    <ModalAddType />
                                  </ButtonGroup>
                                </div>
                                <div className="col-span-1 w-full">
                                  <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mức độ ưu tiên
                                  </label>
                                  <ButtonGroup
                                    className="w-full"
                                    variant="outlined"
                                  >
                                    <Select
                                      className="w-full"
                                      // value={listSources.filter(
                                      //   (item) => item.value == source_id
                                      // )}
                                      options={listStatus}
                                      styles={customStyles}
                                      onChange={(event) =>
                                        setTicket_status_id(event.value)
                                      }
                                      isSearchable={true}
                                      isClearable={true}
                                    />
                                    <ModalAddStatus />
                                  </ButtonGroup>
                                </div>
                                <div className="col-span-2 w-full">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="note"
                                  >
                                    Ghi chú
                                  </label>
                                  <textarea
                                    className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name=""
                                    id="note"
                                    cols="30"
                                    value={note}
                                    rows="5"
                                    onChange={(event) =>
                                      setNote(event.target.value)
                                    }
                                    placeholder="Nhập tên ghi chú"
                                  ></textarea>
                                </div>
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="">
                          <Accordion
                            expanded={panel2}
                            onChange={() => setPanel2(!panel2)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                              <Typography component="p">
                                Nhân viên & công việc
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography component="div">
                                <div className="grid grid-cols-2 gap-4 justify-between">
                                  <div className="col-span-2 w-full">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                      Nhân viên
                                    </label>
                                    <Select
                                      // value={listSources.filter(
                                      //   (item) => item.value == source_id
                                      // )}
                                      options={listUsers}
                                      styles={customStyles}
                                      onChange={(event) =>
                                        setEmployee_id(event.value)
                                      }
                                      isSearchable={true}
                                      isClearable={true}
                                    />
                                  </div>
                                </div>
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <div>
                          <Accordion
                            expanded={panel3}
                            onChange={() => setPanel3(!panel3)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                              <Typography component="p">
                                Thời gian nhắc hẹn
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography component="div">
                                <div className="col-span-2 w-full">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="time"
                                  >
                                    Thời gian nhắc hẹn
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="time"
                                    //type datatime

                                    type="datetime-local"
                                    onChange={(event) =>
                                      setReminder_time(event.target.value)
                                    }
                                    // placeholder="Nhập tên phiếu ghi"
                                  />
                                  {/* <Select
                            className="w-full"
                            // value={listSources.filter(
                            //   (item) => item.value == source_id
                            // )}
                            options={dataUsers}
                            styles={customStyles}
                            // onChange={handleChangeSource}
                            isSearchable={true}
                            isClearable={true}
                          /> */}
                                </div>
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </div>
                      <div className="w-full sticky bottom-0 h-12 bg-white justify-center items-center border border-gray-400">
                        <div className="flex gap-2 justify-center items-center pt-2">
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => setIsOpen(false)}
                          >
                            Đóng
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleSave()}
                          >
                            THÊM
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel value={tab} index={1}>
                    {check ? (
                      <div className="w-full bg-white rounded-2xl h-auto shadow">
                        <div className="relative">
                          <img
                            src="https://demo.smartvcc.vn//assets/images/card_profile.png"
                            alt=""
                            className="rounded-t-2xl w-full h-24 object-cover"
                          />
                          <div className="flex justify-center">
                            <div className="absolute flex justify">
                              <img
                                src={NoImage}
                                alt=""
                                className="bg-white border-4 border-solid border-gray-200 h-28 w-28 rounded-full -mt-14"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-14 pb-4">
                          <div className="flex justify-center text-xl text-gray-600 font-medium">
                            {idUser?.full_name ? idUser?.full_name : "Không có"}
                          </div>
                          <hr className="w-full border mt-2" />
                          <div className="grid grid-cols-2 mx-10 mt-3 gap-5">
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Ngày sinh
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                {idUser?.birthday
                                  ? idUser?.birthday
                                  : "Không có"}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Giới tính
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                {idUser?.gender ? idUser?.gender : "Không có"}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Email
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                {idUser?.email ? idUser?.email : "Không có"}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Điện thoại
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                {idUser?.phone ? idUser?.phone : "Không có"}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                CMND-Căn cước công dân
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                {idUser?.identity
                                  ? idUser?.identity
                                  : "Không có"}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Nhóm khách hàng
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                {idUser?.customers_group_id
                                  ? idUser?.customers_group_id
                                  : "Không có"}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Trạng thái
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                {idUser?.active_text
                                  ? idUser?.active_text
                                  : "Không có"}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Nguồn
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                {idUser?.source_name
                                  ? idUser?.source_name
                                  : "Không có"}
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="text-gray-700 font-semibold">
                                Địa chỉ
                              </div>
                              <div className="py-1 px-4 border rounded mt-1">
                                585 tổ 28 ấp Bình Hưng, xã Bình Long, huyện Châu
                                Phú, tỉnh An Giang
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col justify-center items-center mt-[30%]">
                        <div className="text-lg font-medium text-gray-600">
                          <img
                            src="https://demo.smartvcc.vn/uploads/company/83a019d037d001de077661d46e1e3fae.png"
                            alt=""
                            className="w-28"
                          />
                        </div>
                        <div className="text-xl font-medium text-gray-600 mt-3">
                          Người dùng chưa có trong hệ thống
                        </div>
                      </div>
                    )}
                  </TabPanel>
                </Box>
              </div>
            </div>
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer "
          onClick={() => {
            setIsOpen(false);
          }}
        ></section>
      </main>
    </>
  );
};

export default modalAddTicket;
