import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  addStatusAPI,
  listStatusAPI,
} from "../../../../features/customerSlice";
import { toast } from "react-toastify";

const modalAdd = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setname] = useState("");

  const dispatch = useDispatch();
  const request = {
    name: name,
  };
  const handleSave = () => {
    if (!request.name) {
      toast.success("Vui lòng nhập trạng thái");
    } else {
      dispatch(addStatusAPI(request));
      setTimeout(() => {
        dispatch(listStatusAPI());
      }, 500);
      setShowModal(false);
    }
  };

  const style = {
    backgroundColor: "#2d50b2",
    color: "white",
    borderRadius: "10px",
  };

  return (
    <>
      <Button
        variant="outlined"
        style={style}
        onClick={() => setShowModal(true)}
      >
        Trạng thái mới
      </Button>
      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-96 my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t  bg-gradient-to-r from-[#2d50b2] to-[#91a3eb]">
                  <div className=" text-base w-full text-white">
                    Thêm Trạng thái
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto">
                  <div className="my-0 text-slate-500 leading-relaxed grid grid-cols-2 gap-4 justify-center">
                    {/* <TextField
                      className="col-span-2 w-full"
                      id="outlined-basic"
                      label="Trạng thái"
                      required
                      variant="outlined"
                      size="small"
                      onChange={(event) => setname(event.target.value)}
                    /> */}
                    <div className="col-span-2 w-80">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="first_name"
                      >
                        Trạng thái
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="first_name"
                        type="text"
                        onChange={(event) => setname(event.target.value)}
                        placeholder="Nhập trạng thái"
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
                    Thêm
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

export default modalAdd;
