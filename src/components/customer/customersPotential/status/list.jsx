import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import {
  listStatusAPI,
  dataStatus,
  deleteStatusAPI,
} from "../../../../features/customerSlice";
import Delete from "../../../../assets/icon/delete.png";
// import { Button } from "@mui/material";
import ModalAdd from "./modalAdd";
import ModalEdit from "./modalEdit";
import Edit from "../../../../assets/icon/edit.png";
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
import avatarMen from "../../../../assets/image/man.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const list = () => {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const tmp = useSelector(dataStatus);
  const [nextPage, setNextPage] = useState("");
  const [backPage, setBackPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [lastPage, setLastPage] = useState(1);
  // console.log(tmp);
  useEffect(() => {
    dispatch(listStatusAPI());
  }, []);

  const TABLE_HEAD = ["STT", "Trạng thái", ""];

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: true,
        display: false,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Trạng thái",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "action",
      label: "Tùy chọn",
      options: {
        display: true,
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td className="flex gap-4">
              <Button
                variant="outlined"
                onClick={() => handleEdit(tableMeta.rowData)}
              >
                <img src={Edit} alt="edit" className="w-5 h-5" />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(tableMeta.rowData[0])}
              >
                <img src={Delete} alt="delete" className="w-5 h-5" />
              </Button>
            </td>
          );
        },
      },
    },
  ];
  const options = {
    // filterType: "checkbox",
    textLabels: {
      body: {
        noMatch: "Xin lỗi, không tìm thấy dữ liệu phù hợp",
        toolTip: "Sắp xếp",
        columnHeaderTooltip: (column) => `Sắp xếp ${column.label}`,
      },
      pagination: {
        next: "Đi tới",
        previous: "Lùi lại",
        rowsPerPage: "Số dòng hiển thị:",
        displayRows: "của",
      },

      toolbar: {
        search: "Tìm kiếm",
        downloadCsv: "Tải về CSV",
        print: "In",
        viewColumns: "Danh mục hiển thị",
        filterTable: "Lọc bảng",
      },
      filter: {
        all: "Tất cả",
        title: "Bộ lọc",
        reset: "Làm mới",
      },
      viewColumns: {
        title: "Hiển thị cột",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "dòng được chọn",
        delete: "Xóa",
        deleteAria: "Xóa các dòng được chọn",
      },
    },
    // onRowsSelect: handleRowSelected,
    selectableRows: "multiple",
  };

  useEffect(() => {
    handleConfixData();
  }, [tmp]);

  const handleConfixData = async () => {
    const arrTmp = await tmp;

    const arr = [];
    let obj = {};
    arrTmp &&
      arrTmp.length > 0 &&
      arrTmp.map((element) => {
        obj = {};
        obj.id = element.id;
        obj.name = element.name;
        arr.push(obj);
      });
    setDataUser(arr);
  };

  const handleDelete = (id) => {
    dispatch(deleteStatusAPI(id));
    setTimeout(() => {
      dispatch(listStatusAPI());
    }, 500);
  };

  const [data, setData] = useState();
  const handleEdit = (data) => {
    setData(data);
    setModal(true);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {modal && <ModalEdit item={data} isOpen={isOpen} />}
      {/* <div className="flex justify-start items-center gap-2 bg-white rounded-2xl p-2 shadow">
        <ModalAdd />
      </div> */}

      <div className="h-auto min-h-full w-full mb-2rounded-2xl mt-2">
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
                    ? "px-3 py-2"
                    : "px-3 py-2 border-b border-blue-gray-50";

                  return (
                    <tr key={item.id} className="even:bg-blue-gray-50/50">
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
                              item.active == 1 ? "Hoạt động" : "Không hoạt động"
                            }
                            className="cursor-pointer"
                            // onClick={() => handleCheckActive(id, active_id)}
                            color={item.active == 1 ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        {/* <ModalEditCustomerGroup item={item} /> */}
                        <Tooltip content="Sửa thông tin khách hàng">
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
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 mr-12">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Trang {currentPage} của {tmp.last_page}
            </Typography>
            {/*<Pagination
              count={lastPage}
              onClick={(e) => handlePagination(e)}
              variant="outlined"
              color="primary"
            />*/}
          </CardFooter>
        </Card>
        {/*<MUIDataTable
          title={"Danh sách trạng thái khách hàng"}
          data={dataUser}
          columns={columns}
          options={options}
        /> */}
      </div>
    </>
  );
};

export default list;
