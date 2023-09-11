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
import Autocomplete from "@mui/material/Autocomplete";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
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
import {
  listTickectAPI,
  editTickectAPI,
  dataShowTicket,
  showTickectAPI,
} from "../../features/ticketSlice";
import Edit from "../../assets/icon/edit.png";
import ModalAddStatus from "./modalAddStatus";
import ModalAddTTopic from "./modalAddTopic";
import ModalAddType from "./modalAddType";
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

const modalEditTicket = (props) => {
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
  const [customer_id, setCustomer_id] = useState("");
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listStatusTickectAPI());
    dispatch(listTopicTickectAPI());
    dispatch(listTypeTickectAPI());
    dispatch(ListUserApi());
    setTimeout(() => {
      dispatch(showTickectAPI(props?.id));
    }, 500);
    setIsOpen(true);
  }, [props?.isOpen]);

  const listStatus = useSelector(dataStatusTicketSelect);
  const listTopic = useSelector(dataTopicTicketSelect);
  const listType = useSelector(dataTypeTicketSelect);
  const listUsers = useSelector(dataUserSelect);
  const listShow = useSelector(dataShowTicket);

  useEffect(() => {
    settitle(listShow?.title);
    setTopic_id(listShow?.topic_id);
    setTicket_type_id(listShow?.ticket_type_id);
    setNote(listShow?.note);
    setReminder_time(listShow?.reminder_time);
    setEmployee_id(listShow?.employee_id);
    setTicket_status_id(listShow?.ticket_status_id);
    setId(listShow?.id);
    setCustomer_id(listShow?.customer_id);
  }, [listShow]);

  const style = {
    backgroundColor: "#2d50b2",
    color: "white",
    borderRadius: "10px",
  };

  const request = {
    title: title,
    topic_id: topic_id,
    ticket_type_id: ticket_type_id,
    note: note,
    reminder_time: reminder_time,
    employee_id: employee_id,
    ticket_status_id: ticket_status_id,
    customer_id: props?.customer_id ? props?.customer_id : customer_id,
    id: id,
  };

  const handleSave = () => {
    dispatch(editTickectAPI(request));
    setIsOpen(false);
    setTimeout(() => {
      dispatch(listTickectAPI());
    }, 500);
  };

  return (
    <>
      {/* <header className="flex justify-end">
        <Button
          //   style={style}
          onClick={() => setIsOpen(true)}
          variant="outlined"
        >
          <img src={Edit} alt="edit" className="w-5 h-5" />
        </Button>
      </header> */}
      <main
        className={
          "fixed overflow-hidden z-[50000] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out" +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-200 opacity-0 translate-x-full")
        }
      >
        <section
          className={
            "w-screen right-0 top-1 rounded-xl border-l border-gray-400 absolute bg-transparent h-full max-w-3xl shadow-2xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative w-screen flex flex-col overflow-y-scroll h-full max-w-3xl">
            <div className="flex justify-between items-center">
              <div className="p-2 px-10 font-semibold text-lg bg-[#f5f6fa] rounded-t-xl">
                <div className="">Sửa phiếu ghi yêu cầu</div>
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
                              <Select
                                className="w-full"
                                value={
                                  listTopic &&
                                  listTopic.length > 0 &&
                                  listTopic.filter(
                                    (item) => item.value == topic_id
                                  )
                                }
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
                              <Select
                                className="w-full"
                                value={
                                  listType &&
                                  listType.length > 0 &&
                                  listType.filter(
                                    (item) => item.value == ticket_type_id
                                  )
                                }
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
                              <Select
                                className="w-full"
                                value={
                                  listStatus &&
                                  listStatus.length > 0 &&
                                  listStatus.filter(
                                    (item) => item.value == ticket_status_id
                                  )
                                }
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
                              <Select
                                value={
                                  listUsers &&
                                  listUsers.length > 0 &&
                                  listUsers.filter(
                                    (item) => item.value == employee_id
                                  )
                                }
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
                        <Typography component="span">
                          Thời gian nhắc hẹn
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography component="span">
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
                              value={reminder_time}
                              type="datetime-local"
                              onChange={(event) =>
                                setReminder_time(event.target.value)
                              }
                              // placeholder="Nhập tên phiếu ghi"
                            />
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

export default modalEditTicket;
