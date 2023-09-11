import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  editDepartmentAPI,
  listDepartmentAPI,
} from "../../../features/departmentSlice";
import { toast } from "react-toastify";
import Edit from "../../../assets/icon/edit.png";

const drawerAdd = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [status_id, setStatus_id] = useState("");
  const dispatch = useDispatch();

  const request = {
    name: name,
    description: description,
    status_id: status_id,
    id: id,
  };

  const handleSave = () => {
    if (!name || !description) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    } else {
      dispatch(editDepartmentAPI(request));
      setShowModal(false);
      setTimeout(() => {
        dispatch(listDepartmentAPI());
      }, 600);
    }
  };

  useEffect(() => {
    setName(props?.item?.rowData[1]);
    setDescription(props?.item?.rowData[2]);
    setId(props?.item?.rowData[0]);
    setStatus_id(props.item.rowData[4]);
  }, [showModal]);

  return (
    <>
      <Button variant="outlined" onClick={() => setShowModal(true)}>
        <img src={Edit} alt="edit" className="w-5 h-5" />
      </Button>
      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            data-aos-delay="5000"
            data-aos-duration="1000"
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[50000] outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t  bg-gradient-to-r from-[#2d50b2] to-[#91a3eb]">
                  <div className=" text-base w-full text-white">
                    Sửa phòng ban
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto">
                  <div className="my-0 text-slate-500 text-lg leading-relaxed grid grid-cols-3 gap-4 justify-center">
                    <div className="col-span-1 w-full">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="department"
                      >
                        Tên phòng ban
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="department"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Nhập tên phòng ban"
                      />
                    </div>
                    <div className="col-span-2 w-full">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="info_more"
                      >
                        Mô tả
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="info_more"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Nhập mô tả"
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between gap-2 p-[7px] border-t border-solid border-slate-200 rounded-b mx-4">
                  <div className="flex items-center gap-4">
                    Hoạt động:{" "}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={status_id === 1 ? true : false}
                        onChange={() => setStatus_id(status_id === 1 ? 0 : 1)}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex gap-4">
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
                      onClick={handleSave}
                    >
                      Sửa
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

export default drawerAdd;
