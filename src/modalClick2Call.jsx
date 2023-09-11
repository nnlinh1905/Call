import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import TabPanel from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import Tab, { tabClasses } from "@mui/base/Tab";
import Man from "./assets/image/man.png";
import ClearIcon from "@mui/icons-material/Clear";
import { dataShowByPhone, ShowByPhoneAPI } from "./features/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { addCustomerPotentialAPI } from "./features/customerSlice";
import { addCallNoteAPI } from "./features/callNoteSlice";
import {
  dataCallPurposeSelect,
  listCallPurposeAPI,
} from "./features/callPurposeSlice";
import ModalAddTicket from "./components/tickets/modalAddTicket";
// import { async } from "safe/lib/safe";

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

const modalClick2Call = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalSmall, setShowModalSmall] = useState(false);
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [active, setactive] = useState(true);
  const [call, setcall] = useState("");
  const [statusCall, setstatusCall] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [purpose_id, setPurpose_id] = useState("");
  const [customer_id, setCustomer_id] = useState("");
  const [client_id, setClient_id] = useState("");
  const [call_id, setCall_id] = useState("");
  const [checkSocket, setCheckSocket] = useState(true);
  const [checkSocketOff, setCheckSocketOff] = useState(true);

  // const [answerOnVss, setanswerOnVss] = useState(0);

  const dispatch = useDispatch();
  const handletransfer = () => {
    setShowModal(false);
    setShowModalSmall(true);
  };

  const tmp = useSelector(dataShowByPhone);

  useEffect(() => {
    var channel = pusher.subscribe("callin");
    channel.bind("callin", function (data) {
      // if(data.)
      let settingCallClickToCall = localStorage.getItem(
        "settingCallClickToCall"
      );
      if (settingCallClickToCall == 1) {
        // bằng 1 sẽ là hiện: clicktocall
        console.log("Clicktocall");
        let userInfo = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : false;
        setcall("Cuộc gọi đến");
        setClient_id(userInfo?.id);
        setCall_id(data?.call_id);
        // console.log("data", data);
        if (data?.event == "Ring") {
          setstatusCall("Đang đỗ chuông...");
        }

        if (data?.event == "Answer") {
          setstatusCall("Đang trong cuộc gọi");
        }

        if (userInfo?.extension == data?.ip_phone) {
          localStorage.setItem("callin", JSON.stringify(data));
          setShowModal(true);
          setphone(data?.phone);
          const param = {
            phone: data?.phone,
            all: 1,
            type: "callin",
          };
          dispatch(ShowByPhoneAPI(param));
        }
      } else {
        console.log("data no Click to call:", data);
        if (data?.event == "Ring") {
          localStorage.setItem("checkStream", JSON.stringify(data));
        } else {
          if (data?.event == "AnswerOnWss" && data?.answer_on_wss == 1) {
            console.log(
              "Clicktocall Kickkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
            );
          }

          if (data?.event == "Answer") {
            // bằng 1 sẽ là hiện: clicktocall
            console.log("Clicktocall");
            let userInfo = localStorage.getItem("userInfo")
              ? JSON.parse(localStorage.getItem("userInfo"))
              : false;
            setcall("Cuộc gọi đến");
            setClient_id(userInfo?.id);
            setCall_id(data?.call_id);
            // console.log("data", data);

            if (data?.event == "Answer") {
              setstatusCall("Đang trong cuộc gọi");
            }

            console.log(
              "userInfo?.extension == data?.ip_phone",
              userInfo?.extension,
              data?.ip_phone
            );
            if (userInfo?.extension == data?.ip_phone) {
              localStorage.setItem("callin", JSON.stringify(data));
              setShowModal(true);
              setphone(data?.phone);
              const param = {
                phone: data?.phone,
                all: 1,
                type: "callin",
              };
              dispatch(ShowByPhoneAPI(param));
            }
          }
        }
      }
    });
    var channel2 = pusher.subscribe("callout");
    channel2.bind("callout", function (data) {
      let settingCallClickToCall = localStorage.getItem(
        "settingCallClickToCall"
      );
      console.log(
        "callOutcallOutcallOutcallOutcallOutcallOutcallOutcallOutcallOut"
      );
      if (settingCallClickToCall == 1) {
        let userInfo = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : false;
        // console.log("data12", data);
        setClient_id(userInfo?.id);
        setcall("Cuộc gọi đi");
        setCall_id(data?.call_id);
        if (data?.event == "Ring") {
          setstatusCall("Đang đỗ chuông...");
        }
        if (data?.event == "Answer") {
          setstatusCall("Đang trong cuộc gọi");
        }
        if (userInfo?.extension == data?.extension) {
          localStorage.setItem("callin", JSON.stringify(data));
          setShowModal(true);
          setphone(data?.to_number);
          const param = {
            phone: data?.to_number,
            all: 1,
            type: "callout",
          };
          dispatch(ShowByPhoneAPI(param));
        }
      }
    });
    var channel3 = pusher.subscribe("Hangup");
    channel3.bind("Hangup", function (data) {
      // if (checkSocketOff) {
      // setCheckSocketOff(false);
      let settingCallClickToCall = localStorage.getItem(
        "settingCallClickToCall"
      );
      console.log(
        "HangupHangupHangupHangupHangupHangupHangupHangupHangupHangup"
      );
      // if (settingCallClickToCall == 1) {
      let dataCall = localStorage.getItem("callin")
        ? JSON.parse(localStorage.getItem("callin"))
        : false;
      if (data?.call_id == dataCall?.call_id) {
        setstatusCall("Cuộc gọi đã kết thúc");
      }
      // }
      // }
    });
  }, []);

  const handleAddCustomerPotential = () => {
    const request = {
      name: name,
      phone: phone,
      email: email,
    };
    const param = {
      phone: phone,
      all: 1,
    };
    dispatch(addCustomerPotentialAPI(request));
    dispatch(ShowByPhoneAPI(param));
  };

  const closeModal = () => {
    setShowModal(false);
    setname("");
    setphone("");
    setemail("");
    setcall("");
  };

  useEffect(() => {
    setCustomer_id(tmp?.id);
  }, [tmp]);

  const handleSaveCallNote = () => {
    const request = {
      title: title,
      content: content,
      purpose_id: purpose_id,
      customer_id: customer_id,
      client_id: client_id,
      call_id: call_id,
    };
    dispatch(addCallNoteAPI(request));
  };

  const listSelect = useSelector(dataCallPurposeSelect);
  useEffect(() => {
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false;
    if (token != false) {
      dispatch(listCallPurposeAPI());
    }
  }, [showModal]);

  return (
    <>
      {showModal ? (
        <>
          <div
            data-aos="fade-left"
            className="justify-end items-end flex overflow-x-hidden overflow-y-auto fixed z-[100000] outline-none focus:outline-none right-2 bottom-0 pl-14"
          >
            <div className="relative w-auto my-2 max-w-3xl">
              {/*content*/}
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-[#f8f8ff] outline-none focus:outline-none border border-gray-300">
                <div className="relative p-2 flex-auto">
                  <div className="border border-gray-300 absolute -left-12 -top-1 h-8 w-8 bg-[#f8f8ff] rounded shadow z-[500001] flex justify-center items-center cursor-pointer">
                    <ClearIcon
                      className="text-gray-600"
                      onClick={() => closeModal()}
                    />
                  </div>
                  <div className="my-0 text-slate-500 leading-relaxed justify-center w-[600px]">
                    <div className="mb-3 flex justify-between items-center">
                      <div className="flex justify-start items-center gap-2">
                        <img src={Man} alt="" className="w-9 h-9" />
                        <div className="flex flex-col">
                          <div className="text-gray-800">
                            {tmp == null
                              ? "Không xác định"
                              : tmp?.full_name
                              ? tmp?.full_name
                              : tmp?.name}
                          </div>
                          <div>{phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center border py-1 px-4 rounded shadow bg-[#1e3150] gap-3">
                        <div className="flex flex-col">
                          <div className="text-white">{call}</div>
                          <div className="text-gray-300 text-xs">
                            {statusCall}
                          </div>
                        </div>
                      </div>

                      <div className="hs-dropdown relative inline-flex">
                        <div className="p-0">
                          <div className="dropdown inline-block relative">
                            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                              <span className="mr-1">Tạo nhanh</span>
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                              </svg>
                            </button>
                            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 z-[10000000]">
                              <li className="">
                                <a
                                  className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                  href="#"
                                >
                                  Chuyển đổi
                                </a>
                              </li>
                              <li className="">
                                <a
                                  className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                  href="#"
                                >
                                  <ModalAddTicket customer_id={customer_id} />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Tabs component="span" defaultValue={0}>
                      <StyledTabsList component="span">
                        <StyledTab component="span" value={0}>
                          Tiểu sử
                        </StyledTab>
                        <StyledTab component="span" value={1}>
                          Ghi chú cuộc gọi
                        </StyledTab>
                        <StyledTab component="span" value={2}>
                          Lịch sự cuộc gọi
                        </StyledTab>
                      </StyledTabsList>
                      <StyledTabPanel
                        component="span"
                        value={0}
                        className="bg-white -mt-3 p-2 rounded border border-gray-300 h-[215px]"
                      >
                        {!tmp ? (
                          active ? (
                            <div className="flex flex-col gap-4 pt-16 justify-center items-center">
                              <div>Khách hàng mới! bạn có muốn thêm mới?</div>
                              <Button
                                variant="outlined"
                                size="small"
                                style={{
                                  backgroundColor: "#007fff",
                                  color: "#ffffff",
                                }}
                                onClick={() => setactive(false)}
                              >
                                Thêm mới
                              </Button>
                            </div>
                          ) : (
                            <div className="relative pt-10">
                              <div className="col-span-3 grid grid-cols-3 gap-3">
                                <div className="col-span-1 w-full">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                  >
                                    Tên
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    defaultValue={name}
                                    type="text"
                                    onChange={(event) =>
                                      setname(event.target.value)
                                    }
                                    placeholder="Nhập tên"
                                  />
                                </div>
                                <div className="col-span-1 w-full">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="phone"
                                  >
                                    Điện thoại
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    defaultValue={phone}
                                    disabled
                                    type="text"
                                    onChange={(event) =>
                                      setphone(event.target.value)
                                    }
                                    placeholder="Nhập số điện thoại"
                                  />
                                </div>
                                <div className="col-span-1 w-full">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                  >
                                    Email
                                  </label>
                                  <input
                                    className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    defaultValue={email}
                                    type="text"
                                    onChange={(event) =>
                                      setemail(event.target.value)
                                    }
                                    placeholder="Nhập email"
                                  />
                                </div>
                                <Button
                                  className="col-span-3 mt-3"
                                  variant="outlined"
                                  size="small"
                                  style={{
                                    backgroundColor: "#007fff",
                                    color: "#ffffff",
                                  }}
                                  onClick={() => handleAddCustomerPotential()}
                                >
                                  Thêm mới
                                </Button>
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Họ và tên
                              </div>
                              <div className="py-1 px-2 border rounded mt-1 bg-white">
                                {tmp?.full_name
                                  ? tmp?.full_name
                                  : tmp?.name
                                  ? tmp?.name
                                  : "..."}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Giới tính
                              </div>
                              <div className="py-1 px-2 border rounded mt-1 bg-white">
                                {tmp?.gender ? tmp?.genderName : "..."}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Email
                              </div>
                              <div className="py-1 px-2 border rounded mt-1 bg-white">
                                {tmp?.email ? tmp?.email : "..."}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Phone
                              </div>
                              <div className="py-1 px-2 border rounded mt-1 bg-white">
                                {tmp?.phone ? tmp?.phone : "..."}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Nhóm khách hàng
                              </div>
                              <div className="py-1 px-2 border rounded mt-1 bg-white">
                                {tmp?.customers_group_id
                                  ? tmp?.customers_group_id
                                  : "..."}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <div className="text-gray-700 font-semibold">
                                Nguồn
                              </div>
                              <div className="py-1 px-2 border rounded mt-1 bg-white">
                                {tmp?.source_name ? tmp?.source_name : "..."}
                              </div>
                            </div>
                            <div className="col-span-3">
                              <div className="text-gray-700 font-semibold">
                                Địa chỉ
                              </div>
                              <div className="py-1 px-2 border rounded mt-1 bg-white">
                                {tmp?.address ? tmp?.address : "..."}
                              </div>
                            </div>
                          </div>
                        )}
                      </StyledTabPanel>
                      <StyledTabPanel
                        component="span"
                        value={1}
                        className="bg-white -mt-3 p-2 rounded border border-gray-300 h-[215px]"
                      >
                        <div className="grid grid-cols-12 justify-center items-center gap-2">
                          <div className="col-span-3">Mục đich cuộc gọi</div>
                          <div className="col-span-9">
                            <Select
                              options={listSelect}
                              styles={customStyles}
                              onChange={(event) => setPurpose_id(event.value)}
                              isSearchable={true}
                              isClearable={true}
                            />
                          </div>
                          <div className="col-span-3">Tiêu đề</div>
                          <div className="col-span-9">
                            <input
                              type="text"
                              placeholder="Nhập tiêu đề"
                              onChange={() => setTitle(event.target.value)}
                              className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </div>
                          <div className="col-span-3">Nội dung</div>
                          <div className="col-span-9">
                            <textarea
                              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-[65px] min-h-[65px]"
                              cols="30"
                              placeholder="Nhập nội dung"
                              onChange={() => setContent(event.target.value)}
                              rows="4"
                            ></textarea>
                          </div>
                          <div className="col-span-12 flex justify-center items-center">
                            <Button
                              variant="outlined"
                              size="small"
                              style={{
                                backgroundColor: "#007fff",
                                color: "#ffffff",
                              }}
                              onClick={() => handleSaveCallNote()}
                            >
                              Lưu lại
                            </Button>
                          </div>
                        </div>
                      </StyledTabPanel>
                      <StyledTabPanel
                        component="span"
                        value={2}
                        className="bg-white -mt-3 p-2 rounded border border-gray-300 h-[215px]"
                      >
                        Lịch sử cuộc gọi
                      </StyledTabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
        </>
      ) : null}

      {showModalSmall ? (
        <>
          <div
            data-aos="fade-left"
            className="justify-end items-end flex overflow-x-hidden overflow-y-auto fixed z-[100000] outline-none focus:outline-none right-0 bottom-0 pl-14"
          >
            <div className="relative w-auto my-2 max-w-3xl">
              {/*content*/}
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-[#f8f8ff] outline-none focus:outline-none border border-gray-300">
                <div className="relative p-2 flex-auto">
                  <div className="border border-gray-300 absolute -left-12 -top-1 h-8 w-8 bg-[#f8f8ff] rounded shadow z-[500001] flex justify-center items-center cursor-pointer">
                    <ClearIcon
                      className="text-gray-600"
                      onClick={() => handletransfer()}
                    />
                  </div>
                  <div className="my-0 text-slate-500 leading-relaxed justify-center w-[600px]">
                    <div className="mb-3 flex justify-between items-center">
                      <div className="flex justify-start items-center gap-2">
                        <img src={Man} alt="" className="w-9 h-9" />
                        <div className="flex flex-col">
                          <div className="text-gray-800">Nguyễn Nhựt Linh</div>
                          <div>0123456789</div>
                        </div>
                      </div>
                      <div className="flex flex-col mr-5">
                        <div className="text-gray-800">Cuộc gọi đi</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
        </>
      ) : null}
    </>
  );
};

export default modalClick2Call;

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
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 7px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);
