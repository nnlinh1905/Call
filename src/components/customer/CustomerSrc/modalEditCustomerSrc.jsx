import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Edit from "../../../assets/icon/edit.png";
import {
  editCustomerGroupAPI,
  listCustomerGroupAPI,
} from "../../../features/customerSlice";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

const modalEditCustomerSrc = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const dispatch = useDispatch();
  const request = {
    name: name,
    id: id,
  };

  useEffect(() => {
    setname(props?.item?.name);
    setid(props?.item?.id);
    handleOpen();
  }, [props?.isOpen]);

  const handleUpdate = async () => {
    if (!request.name) {
      toast.success("Vui lòng nhập tên nhóm khách hàng");
    } else {
      dispatch(editCustomerGroupAPI(request));
      setTimeout(() => {
        dispatch(listCustomerGroupAPI());
      }, 500);
      handleOpen();
    }
  };

  return (
    <>
      <Dialog size="sm" open={open}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Sửa nguồn khách hàng tiềm năng
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <hr className="w-full" />
        <DialogBody className="overflow-y-scroll pr-2 h-[80%]">
          <div className="my-0 text-slate-500 leading-relaxed grid grid-cols-2 gap-4 justify-center">
            <div className="col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="first_name"
              >
                Tên nguồn
              </label>
              {/* <input
                className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first_name"
                type="text"
                onChange={(event) => setname(event.target.value)}
                placeholder="Nhập tên nhóm"
              /> */}
              <Input
                type="text"
                placeholder="Nhập tên nguồn"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:text-xs focus:!border-blue-900 focus:!border-t-blue-900"
                labelProps={{
                  className: "hidden",
                }}
                value={name}
                onChange={(event) => setname(event.target.value)}
                containerProps={{ className: "!min-w-[100px]" }}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-end gap-2 border-t border-blue-gray-50">
          <Button size="sm" color="red" onClick={handleOpen}>
            Đóng
          </Button>
          <Button size="sm" color="green" onClick={() => handleUpdate()}>
            Xác nhận
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default modalEditCustomerSrc;
