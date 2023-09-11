import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserStatusAPI,
  listUserStatusAPI,
} from "../../../features/usersStatusSlice";
import { toast } from "react-toastify";
import Edit from "../../../assets/icon/edit.png";

const drawerAdd = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const request = {
    name: name,
    id: id,
  };

  const handleSave = () => {
    if (!name) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    } else {
      dispatch(editUserStatusAPI(request));
      setShowModal(false);
      setTimeout(() => {
        dispatch(listUserStatusAPI());
      }, 600);
    }
  };

  useEffect(() => {
    setName(props?.item?.rowData[1]);
    setId(props?.item?.rowData[0]);
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
                    Sửa trạng thái nhân viên
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto">
                  <div className="my-0 text-slate-500 text-lg leading-relaxed grid grid-cols-1 gap-4 justify-center">
                    <div className="col-span-1 w-80">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="status"
                      >
                        Trạng thái
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="status"
                        value={name}
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Nhập trạng thái"
                      />
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-2 p-[7px] border-t border-solid border-slate-200 rounded-b mx-4">
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
