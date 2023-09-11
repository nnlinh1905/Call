import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Edit from "../../../assets/icon/edit.png";
import {
  listTypeTickectAPI,
  editTypeTickectAPI,
} from "../../../features/ticketTypeSlice";
const modalEditTicketType = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [status, setstatus] = useState();
  const dispatch = useDispatch();
  const request = {
    name: name,
    id: id,
    status: status,
  };

  useEffect(() => {
    setname(props.item[1]);
    setid(props.item[0]);
    setstatus(props.item[2]);
  }, [showModal]);

  const handleUpdate = async () => {
    if (!request.name) {
      toast.success("Vui lòng nhập tên nhóm khách hàng");
    } else {
      dispatch(editTypeTickectAPI(request));
      setTimeout(() => {
        dispatch(listTypeTickectAPI());
      }, 500);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setShowModal(true)}>
        <img src={Edit} alt="edit" className="w-5 h-5" />
      </Button>
      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[50000] outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t  bg-gradient-to-r from-[#2d50b2] to-[#91a3eb]">
                  <div className=" text-base w-full text-white">
                    Sửa phân loại
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto">
                  <div className="my-0 text-slate-500 leading-relaxed grid grid-cols-1 gap-4 justify-center items-end">
                    <div className="col-span-1 w-80">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Tên phân loại
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        value={name}
                        type="text"
                        onChange={(event) => setname(event.target.value)}
                        placeholder="Nhập tên phân loại"
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between gap-2 p-[7px] border-t border-solid border-slate-200 rounded-b">
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={() => setstatus(status == 1 ? 0 : 1)}
                        defaultChecked={status == 1 ? true : false}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    Cho phép hoạt động
                  </div>
                  <div className="flex justify-between items-center gap-2">
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
                      onClick={() => handleUpdate()}
                    >
                      Xác nhận
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-[10000] bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default modalEditTicketType;
