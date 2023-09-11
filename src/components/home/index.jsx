import React, { useState, useEffect } from "react";
import Widget from "./widget";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  listTickectAPI,
  dataTicketDashboard,
  addTickectAPI,
} from "../../features/ticketSlice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Topic from "../../assets/icon/topic.png";
import Priority from "../../assets/icon/priority.png";
import Transfer from "../../assets/icon/transfer.png";
import interactionPlugin from "@fullcalendar/interaction";

import ReactSelect from "react-select";
import {
  dataStatusTicketSelect,
  listStatusTickectAPI,
} from "../../features/ticketStatusSlice";

import {
  dataTopicTicketSelect,
  listTopicTickectAPI,
} from "../../features/ticketTopicSlice";
import {
  dataTypeTicketSelect,
  listTypeTickectAPI,
} from "../../features/ticketTypeSlice";
import { ListUserApi, dataUserSelect } from "../../features/usersSlice";
import ModalAddStatus from "../tickets/modalAddStatus";
import ModalAddTTopic from "../tickets/modalAddTopic";
import ModalAddType from "../tickets/modalAddType";
import ClearIcon from "@mui/icons-material/Clear";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonGroup from "@mui/material/ButtonGroup";

import { styled } from "@mui/system";
import { buttonClasses } from "@mui/base/Button";
import Tabs from "@mui/base/Tabs";
import Tab, { tabClasses } from "@mui/base/Tab";
import TabsList from "@mui/base/TabsList";

import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MiscellaneousServicesOutlinedIcon from "@mui/icons-material/MiscellaneousServicesOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import { dataWidget, WidgetAPI } from "../../features/dashboardSlice";
import sip from 'sip'
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
const index = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const dataEvents = useSelector(dataTicketDashboard);
  // sip.

  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;
  useEffect(() => {
    if (token) {
      setTimeout(() => {
        dispatch(listTickectAPI());
      }, 500);
    }
  }, []);

  const [detail, setDetail] = useState();

  const handleEventClick = (eventInfo) => {
    setShowModal(true);
    let data = [...dataEvents];
    let tmp = data.find((item) => item.id == eventInfo.event.id);
    console.log(tmp);
    setDetail(tmp);
  };

  /// ticket
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
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  useEffect(() => {
    setTimeout(() => {
      if (token != false) {
        dispatch(listStatusTickectAPI());
        dispatch(listTopicTickectAPI());
        dispatch(listTypeTickectAPI());
        dispatch(ListUserApi());
      }
    }, 500);
  }, [isOpen]);

  const listStatus = useSelector(dataStatusTicketSelect);
  const listTopic = useSelector(dataTopicTicketSelect);
  const listType = useSelector(dataTypeTicketSelect);
  const listUsers = useSelector(dataUserSelect);

  const style = {
    backgroundColor: "#2d50b2",
    color: "white",
    borderRadius: "10px",
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }

  const handleDateSelect = (arg) => {
    const startDate = arg.startStr; // Selected start date
    const endDate = arg.endStr; // Selected end date

    // Do something with the selected dates
    console.log(
      "Selected dates:",
      formatDate(new Date(startDate), formatDate(new Date(endDate)))
    );
    setStart_date(formatDate(new Date(startDate)));
    setEnd_date(formatDate(new Date(endDate)));
    setIsOpen(true);
  };

  const request = {
    title: title,
    topic_id: topic_id,
    ticket_type_id: ticket_type_id,
    note: note,
    reminder_time: reminder_time,
    employee_id: employee_id,
    ticket_status_id: ticket_status_id,
    customer_id: -1,
    start_date: start_date,
    end_date: end_date,
  };

  const handleSave = () => {
    // console.log(request);
    dispatch(addTickectAPI(request));
    setIsOpen(false);
    setTimeout(() => {
      dispatch(listTickectAPI());
      // dispatch(getTicketByCustomerAPI(props?.customer_id));
    }, 500);
  };

  // localStorage.setItem("tabsWidget", 1);

  const [tabWidget, setTabWidget] = useState(1);
  const handleTabChange = (event, newValue) => {
    setTabWidget(newValue);
    // localStorage.setItem("tabsWidget", newValue);
  };
  return (
    <>
      <div className="pt-2 pb-1 w-full h-full overflow-auto relative">
        <div className="h-auto min-h-full w-full rounded-2xl bg-[#f5f6fa] grid grid-cols-12 gap-2 p-2">
          <div className="col-span-3 sticky top-0">
            <div className="h-[650px] max-h-[800px] w-full rounded-2xl p-2 flex justify-between bg-white shadow">
              <div className="flex flex-col justify-between w-full">
                <Tabs
                  defaultValue={1}
                  aria-label="Tabs where selection follows focus"
                  selectionFollowsFocus
                  onChange={handleTabChange}
                >
                  <StyledTabsList>
                    <StyledTab value={1}>Theo tuần</StyledTab>
                    <StyledTab value={2}>Theo tháng</StyledTab>
                    <StyledTab value={3}>Theo năm</StyledTab>
                  </StyledTabsList>
                </Tabs>
                <Widget type="customer" tabWidget={tabWidget} />
                <Widget type="client" />
                <Widget type="call" />
                <Widget type="ticket" />
              </div>
            </div>
          </div>
          <div className="col-span-9">
            <div className="bg-white shadow p-2 rounded-2xl">
              <FullCalendar
                id="index"
                className="full-calendar"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  listPlugin,
                  interactionPlugin,
                ]}
                defaultView="month"
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                selectable={true}
                events={dataEvents}
                locale={viLocale}
                contentHeight="570px"
                aspectRatio={2}
                eventClick={handleEventClick}
                select={handleDateSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-5 flex-auto">
                  <div
                    className="absolute top-1 right-1 bg-slate-200 rounded h-7 w-7 flex justify-center items-center cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </div>

                  <div className="my-0 text-slate-500 leading-relaxed grid grid-cols-1 gap-4 justify-center mt-3 w-[350px]">
                    <div className="grid grid-cols-11">
                      <div className="col-span-11 justify-center items-start gap-4 grid grid-cols-11">
                        <div className="col-span-1 w-2 h-2 rounded-sm border border-gray-400 bg-green-500 mt-3"></div>
                        <div className="col-span-10 text-gray-600 font-semibold text-xl flex flex-col">
                          {detail?.title}
                          <div className="text-gray-600 font-semibold text-xs">
                            {detail?.start}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-11 gap-4 grid grid-cols-11 mt-3 justify-center items-center">
                        <div className="col-span-1">
                          <img src={Priority} alt="" className="w-5 h-5" />
                        </div>
                        <div className="col-span-10 text-gray-600 text-sm flex flex-col">
                          {detail?.data?.ticket_status?.name}
                        </div>
                      </div>

                      <div className="col-span-11 gap-4 grid grid-cols-11 mt-3 justify-center items-center">
                        <div className="col-span-1">
                          <img src={Topic} alt="" className="w-5 h-5" />
                        </div>
                        <div className="col-span-10 text-gray-600 text-sm flex flex-col">
                          {detail?.data?.ticket_topic?.name}
                        </div>
                      </div>

                      <div className="col-span-11 gap-4 grid grid-cols-11 mt-3 justify-center items-center">
                        <div className="col-span-1">
                          <EditNoteIcon className="w-3 h-3" />
                        </div>
                        <div className="col-span-10 text-gray-600 text-sm flex flex-col">
                          {detail?.data?.note}
                        </div>
                      </div>

                      <div className="col-span-11 gap-4 grid grid-cols-11 mt-3 justify-center items-center">
                        <div className="col-span-1">
                          <img src={Transfer} alt="" className="w-5 h-5" />
                        </div>
                        <div className="col-span-10 text-gray-600 text-sm flex flex-col">
                          {detail?.data?.ticket_employee?.full_name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

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
                <div className="">Thêm mới</div>
              </div>
              <div className="font-bold text-lg bg-[#f5f6fa] rounded-md mr-6 mt-2">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="text"
                  size="small"
                >
                  <ClearIcon />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div //content
                className="p-4 bg-[#f5f6fa] border-t-4 border-4 h-full"
              >
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
                      <Typography component="span">
                        Thông tin phiếu ghi
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component="span">
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
                              value={title}
                              onChange={(event) => settitle(event.target.value)}
                              placeholder="Nhập tên phiếu ghi"
                            />
                          </div>
                          <div className="col-span-1 w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Chủ đề
                            </label>
                            <ButtonGroup className="w-full" variant="outlined">
                              <ReactSelect
                                className="w-full"
                                // value={listSources.filter(
                                //   (item) => item.value == source_id
                                // )}
                                options={listTopic}
                                styles={customStyles}
                                onChange={(event) => setTopic_id(event.value)}
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
                            <ButtonGroup className="w-full" variant="outlined">
                              <ReactSelect
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
                            <ButtonGroup className="w-full" variant="outlined">
                              <ReactSelect
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
                              onChange={(event) => setNote(event.target.value)}
                              placeholder="Nhập tên ghi chú"
                            ></textarea>
                          </div>
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="col-span-2">
                    <Accordion
                      expanded={panel2}
                      onChange={() => setPanel2(!panel2)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography component="span">
                          Nhân viên & công việc
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component="span">
                          <div className="grid grid-cols-2 gap-4 justify-between">
                            <div className="col-span-2 w-full">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nhân viên
                              </label>
                              <ReactSelect
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

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
  1000: "#2d50b2",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTab = styled(Tab)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  background-color: transparent;
  width: 100%;
  padding: 5px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[900]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[300]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[1000]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 100%;
  background-color: ${blue[1000]};
  border-radius: 12px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);

export default index;
