import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import ModalAdd from "./modalAddCustomerSrc";
import { useDispatch, useSelector } from "react-redux";
import {
  sourcesDeteleAPI,
  dataTableSrc,
  sourcesAPI,
} from "../../../features/customerSlice";
import ModalEditCustomerGroup from "./modalEditCustomerSrc";
import Delete from "../../../assets/icon/delete.png";
// import { Button } from "@mui/material";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import avatarMen from "../../../assets/image/man.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const listCustomerSrc = () => {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();
  const [modalEdit, setmodalEdit] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [backPage, setBackPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const tmp = useSelector(dataTableSrc);

  useEffect(() => {
    dispatch(sourcesAPI());
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [tmp]);

  const handleConfixData = async () => {
    const arrTmp = await tmp;
    setBackPage(arrTmp.prev_page_url);
    setNextPage(arrTmp.next_page_url);
    setCurrentPage(arrTmp.current_page);
    setLastPage(arrTmp.last_page);
    const arr = [];
    let obj = {};
    arrTmp &&
      arrTmp.length > 0 &&
      arrTmp.map((element) => {
        obj = {};
        obj.id = element.id;
        obj.name = element.name;
        obj.active = element.active;
        arr.push(obj);
      });
    setDataUser(arr);
  };

  const handleEdit = (item) => {
    setData(item);
    setmodalEdit(!modalEdit);
    setIsOpen(!isOpen);
  }

  const handleDelete = (id) => {
    dispatch(sourcesDeteleAPI(id));
    setTimeout(() => {
      dispatch(sourcesAPI());
    }, 500);
  };

  const TABLE_HEAD = [
    "STT",
    "Tên nguồn",
    "Số điện thoại",
    "",
  ];

  return (
    <>
      {/* <div className="flex justify-start items-center gap-2 bg-white rounded-2xl p-2 shadow">
        <ModalAdd />
      </div> */}
      {modalEdit && <ModalEditCustomerGroup item={data} isOpen={isOpen} />}
      <div className="h-auto w-full">
        <Card className="h-full w-full border border-solid border-[#f2f2f2] mt-2 rounded-md">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <ModalAdd />
              </div>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0 pt-4">
            <table className="w-full min-w-max table-auto text-left border border-solid border-[#f2f2f2]">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataUser.map((item, index) => {
                  const isLast = index === dataUser.length - 1;
                  const classes = isLast
                    ? "px-3 py-2 w-20"
                    : "px-3 py-2 border-b border-blue-gray-50 w-20";

                  return (
                      <tr key={index} className="even:bg-blue-gray-50/50 w-20">
                        <td className={classes}>
                          <div className="flex items-center ml-2 gap-3">
                            {index + 1}
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item.name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={
                                item.active == 1
                                  ? "Hoạt động"
                                  : "Không hoạt động"
                              }
                              className="cursor-pointer"
                              // onClick={() => handleCheckActive(id, active_id)}
                              color={item.active == 1 ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Sửa thông tin Nguồn">
                            <IconButton
                              variant="text"
                              onClick={() => handleEdit(item)}
                            >
                              <PencilIcon className="h-4 w-4" color="Orange" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Xóa nguồn">
                            <IconButton
                              variant="text"
                              onClick={() => handleDelete(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                color="red"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                                />
                              </svg>
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 mr-12 text-white">
            link
            {/* <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Trang {currentPage} của {tmp.last_page}
            </Typography> */}
            {/*<Pagination
              count={lastPage}
              onClick={(e) => handlePagination(e)}
              variant="outlined"
              color="primary"
            />*/}
          </CardFooter>
        </Card>
        {/* <MUIDataTable
          title={"Danh sách nguồn khách hàng"}
          data={dataUser}
          columns={columns}
          options={options}
        /> */}
      </div>
    </>
  );
};

export default listCustomerSrc;
