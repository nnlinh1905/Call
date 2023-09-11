import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Edit from "../../../../assets/icon/edit.png";
import {
  editStatusAPI,
  listStatusAPI,
} from "../../../../features/customerSlice";
const modalEdit = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const dispatch = useDispatch();
  const request = {
    name: name,
    id: id,
  };

  // useEffect(() => {}, [showModal]);

  useEffect(() => {
    setname(props.item[1]);
    setid(props.item[0]);
    setShowModal(true);
  }, [props?.isOpen]);

  const handleUpdate = async () => {
    if (!request.name) {
      toast.success("Vui lòng nhập tên nhóm khách hàng");
    } else {
      dispatch(editStatusAPI(request));
      setTimeout(() => {
        dispatch(listStatusAPI());
      }, 500);
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[50000] outline-none focus:outline-none"
          >
            <div className="relative w-96 my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t  bg-gradient-to-r from-[#2d50b2] to-[#91a3eb]">
                  <div className=" text-base w-full text-white">
                    Sửa nhóm khách hàng
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
                      value={name}
                      onChange={(event) => setname(event.target.value)}
                    /> */}
                    <div className="col-span-1 w-80">
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
                        value={name}
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
                    onClick={() => handleUpdate()}
                  >
                    Xác nhận
                  </Button>
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

export default modalEdit;
