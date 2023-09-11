import React, { useState } from "react";
import Button from "@mui/material/Button";
// import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  listStatusTickectAPI,
  addStatusTickectAPI,
} from "../../features/ticketStatusSlice";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import Select from "react-select";
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

const modalAddStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setname] = useState("");
  const [color, setcolor] = useState("");

  const dispatch = useDispatch();
  const request = {
    name: name,
    color: color,
    active: 1,
  };
  const handleSave = () => {
    if (!request.name) {
      toast.success("Vui lòng nhập tên nhóm khách hàng");
    } else {
      dispatch(addStatusTickectAPI(request));
      console.log(request);
      setTimeout(() => {
        dispatch(listStatusTickectAPI());
      }, 500);
      setShowModal(false);
    }
  };

  const style = {
    borderRadius: "10px",
  };

  const options = [
    { value: "#FF0000", label: "Đỏ" },
    { value: "#FFFF00", label: "Vàng" },
    { value: "#008000", label: "Xanh" },
    { value: "#0000FF", label: "Xanh Dương" },
    { value: "#330066", label: "Tím" },
    { value: "#EE7600", label: "Cam" },
    { value: "#EE1289", label: "Hồng" },
    { value: "#000000", label: "Đen" },
  ];
  return (
    <>
      <Button
        style={style}
        variant="outlined"
        onClick={() => setShowModal(true)}
      >
        <AddIcon />
      </Button>
      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t  bg-gradient-to-r from-[#2d50b2] to-[#91a3eb]">
                  <div className=" text-base w-full text-white">
                    Thêm trạng thái phiếu ghi
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto">
                  <div className="my-0 text-slate-500 leading-relaxed grid grid-cols-2 gap-4 justify-center">
                    <div className="col-span-1 w-80">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Trạng thái
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        onChange={(event) => setname(event.target.value)}
                        placeholder="Nhập trạng thái"
                      />
                    </div>
                    <div className="col-span-1 w-80">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Màu sắc
                      </label>
                      <Select
                        options={options}
                        styles={customStyles}
                        onChange={(event) => setcolor(event.value)}
                        isSearchable={true}
                        isClearable={true}
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-2 p-[7px] border-t border-solid border-slate-200 rounded-b">
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => setShowModal(false)}
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
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default modalAddStatus;
