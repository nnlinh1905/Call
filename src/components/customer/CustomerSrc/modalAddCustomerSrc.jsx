import React, { useState } from "react";
// import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerGroupAPI,
  listCustomerGroupAPI,
} from "../../../features/customerSlice";
import { toast } from "react-toastify";
import {
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

const modalAddCustomerSrc = () => {
  const [name, setname] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const dispatch = useDispatch();
  const request = {
    name: name,
  };
  const handleSave = () => {
    if (!request.name) {
      toast.success("Vui lòng nhập tên nhóm khách hàng");
    } else {
      dispatch(addCustomerGroupAPI(request));
      setTimeout(() => {
        dispatch(listCustomerGroupAPI());
      }, 500);
      setShowModal(false);
    }
  };
  return (
    <>
      <Button
        className="flex items-center gap-3"
        color="blue"
        size="sm"
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Thêm nguồn khách hàng tiềm năng
      </Button>
      <Dialog size="sm" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Thêm nguồn khách hàng tiềm năng
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
          <Button size="sm" color="green" onClick={() => handleSave()}>
            Thêm mới
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default modalAddCustomerSrc;
