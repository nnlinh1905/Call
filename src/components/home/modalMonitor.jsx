import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import WifiCalling3OutlinedIcon from "@mui/icons-material/WifiCalling3Outlined";
import SearchIcon from "@mui/icons-material/Search";
import NoImg from "../../assets/icon/no-image.png";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import PhoneDisabledOutlinedIcon from "@mui/icons-material/PhoneDisabledOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  callMonitorAPI,
  dataCallMonitor,
  spyCallAPI,
  dataSpyCall,
} from "../../features/callMonitorSlice";
import { toast } from "react-toastify";

// const ArrUser = [
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn A",
//     extension: 100,
//     status: 1,
//     status_name: "Chưa sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn B",
//     extension: 101,
//     status: 2,
//     status_name: "Sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn C",
//     extension: 102,
//     status: 1,
//     status_name: "Chưa sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn D",
//     extension: 103,
//     status: 1,
//     status_name: "Chưa sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn E",
//     extension: 104,
//     status: 1,
//     status_name: "Chưa sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn F",
//     extension: 105,
//     status: 2,
//     status_name: "Sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn G",
//     extension: 106,
//     status: 2,
//     status_name: "Sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn A",
//     extension: 100,
//     status: 1,
//     status_name: "Chưa sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn B",
//     extension: 101,
//     status: 2,
//     status_name: "Sẵn sàng",
//   },
//   {
//     img: NoImg,
//     full_name: "Nguyễn Văn C",
//     extension: 102,
//     status: 1,
//     status_name: "Chưa sẵn sàng",
//   },
// ];

const modalMonitor = (props) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const tmp = useSelector(dataCallMonitor);
  useEffect(() => {
    setShowModal(true);
    dispatch(callMonitorAPI());
  }, [props?.isOpen]);

  const spy = useSelector(dataSpyCall);

  useEffect(() => {
    if (spy?.result == true) {
      handleClickMonitor(spy);
    }
  }, [spy]);

  const handleSpy = (extension, mode) => {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : false;

    const request = {
      extension_spy: extension * 1,
      mode: mode,
    };

    if (userInfo.extension == extension) {
      toast.warn("Bạn không can thiệp cuộc gọi của chính mình");
      Notiflix.Block.remove(".notiflix-" + extension);
    } else {
      Notiflix.Block.pulse(".notiflix-" + extension, "vui lòng đợi...", {
        backgroundColor: "#cdcdcd6b",
      });
      dispatch(spyCallAPI(request));
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            className="h-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="h-[80%] relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="relative flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t  bg-gradient-to-r from-[#2d50b2] to-[#91a3eb]">
                  <div className=" text-sm w-full text-white">
                    Giám sát hệ thống cuộc gọi
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className=" absolute right-0 top-0 px-4 py-1 rounded-sm flex justify-center items-center transition ease-in-out bg-white hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300"
                  >
                    <CloseOutlinedIcon
                      className="text-[#2d50b2]"
                      style={{ fontSize: "18px" }}
                    />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto bg-[#f2f4f6] rounded-b">
                  <div className="my-0 text-slate-700 leading-relaxed grid grid-cols-12 gap-2 justify-center ">
                    <div className="col-span-7 bg-white p-2 px-3 grid grid-cols-4 rounded-lg gap-5 shadow">
                      <div className="col-span-1 flex items-center gap-2 min-w-max">
                        <div className="p-1 rounded-full bg-sky-50">
                          <LocalPhoneOutlinedIcon className="w-5 text-sky-600" />
                        </div>
                        <div className="text-xs">Chỉ nghe</div>
                      </div>
                      <div className="col-span-1 flex items-center gap-2 min-w-max">
                        <div className="p-1 rounded-full bg-green-50">
                          <WifiCalling3OutlinedIcon className="w-5 text-green-600" />
                        </div>
                        <div className="text-xs">Nói cả hai</div>
                      </div>
                      <div className="col-span-1 flex items-center gap-2 min-w-max">
                        <div className="p-1 rounded-full bg-orange-50">
                          <MicNoneOutlinedIcon className="w-5 text-orange-600" />
                        </div>
                        <div className="text-xs">Nói với người gọi</div>
                      </div>
                      <div className="col-span-1 flex items-center gap-2 min-w-max">
                        <div className="p-1 rounded-full bg-red-50">
                          <PhoneDisabledOutlinedIcon className="w-5 text-red-600" />
                        </div>
                        <div className="text-xs">nói với người nghe</div>
                      </div>
                    </div>
                    <div className="col-span-5 flex justify-center items-center shadow rounded-lg w-full bg-white px-5">
                      <div className="relative shadow rounded border w-full px-5">
                        <div className="absolute top-2 left-3">
                          <SearchIcon className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="h-10 w-full pl-10 pr-20 rounded-lg z-0 outline-0"
                          placeholder="tìm kiếm..."
                        />
                      </div>
                    </div>
                    <div className="col-span-12 grid grid-cols-4 gap-2">
                      {tmp &&
                        tmp.length > 0 &&
                        tmp.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                "col-span-1 bg-white rounded-lg p-2 !h-24 shadow" +
                                " notiflix-" +
                                item?.extension
                              }
                            >
                              <div className="flex flex-col">
                                <div className="grid grid-cols-5 gap-2 justify-center items-center">
                                  <div className="col-span-1 py-1">
                                    <div className="flex border-2 justify-center items-center rounded-full">
                                      <img
                                        src={!item?.img ? NoImg : item?.img}
                                        alt=""
                                        width="40px"
                                        height="40px"
                                        className="rounded-full"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-span-4 flex flex-col text-sm">
                                    <div className=" font-semibold">
                                      {item?.full_name}
                                    </div>
                                    <div className="text-gray-400">
                                      {item?.extension}
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-10 justify-between">
                                  <div className="col-span-5 flex">
                                    <div //
                                      className={
                                        item?.status == 0
                                          ? "bg-gray-50 text-gray-600 flex text-xs p-1 px-3 rounded w-auto"
                                          : item?.status == 1
                                          ? "bg-green-50 text-green-600 flex text-xs p-1 px-3 rounded w-auto"
                                          : item?.status == 2
                                          ? "bg-sky-50 text-sky-600 flex text-xs p-1 px-3 rounded w-auto"
                                          : item?.status == 3
                                          ? "bg-green-50 text-green-800 flex text-xs p-1 px-3 rounded w-auto"
                                          : ""
                                      }
                                    >
                                      {item?.status_name}
                                    </div>
                                  </div>
                                  <div className="col-span-5 grid grid-cols-4 justify-between items-center">
                                    <LocalPhoneOutlinedIcon
                                      style={{
                                        fontSize: "16px",
                                      }}
                                      onClick={() =>
                                        handleSpy(item?.extension, 1)
                                      }
                                      className="text-sky-600 cursor-pointer"
                                    />
                                    <WifiCalling3OutlinedIcon
                                      style={{
                                        fontSize: "16px",
                                      }}
                                      onClick={() =>
                                        handleSpy(item?.extension, 2)
                                      }
                                      className="text-green-600 cursor-pointer"
                                    />
                                    <MicNoneOutlinedIcon
                                      style={{
                                        fontSize: "16px",
                                      }}
                                      onClick={() =>
                                        handleSpy(item?.extension, 3)
                                      }
                                      className="text-orange-600 cursor-pointer"
                                    />
                                    <PhoneDisabledOutlinedIcon
                                      style={{
                                        fontSize: "16px",
                                      }}
                                      onClick={() =>
                                        handleSpy(item?.extension, 4)
                                      }
                                      className="text-red-600 cursor-pointer"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end gap-2 p-[7px] border-t border-solid border-slate-200 rounded-b">
                  
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleSave()}
                  >
                    THÊM
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default modalMonitor;
