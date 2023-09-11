import React, { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MUIDataTable from "mui-datatables";
import {
  listCustomerPotentialAPI,
  dataCustomerPotential,
  deleteCustomerPotentialAPI,
} from "../../../features/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import Delete from "../../../assets/icon/delete.png";
import ModalAdd from "./drawerAdd";
import ModalEdit from "./drawerEdit";
import Detail from "./infoCustomer/detail";
import Edit from "../../../assets/icon/edit.png";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

import {CustomerPotentialsSyncAPI} from "../../../features/SynchronizedSlice"


const list = () => {
  const [dataUser, setDataUser] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [modalDetail, setModalDetail] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [backPage, setBackPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [lastPage, setLastPage] = useState(1);

  const [id, setId] = useState(null);

  const optionsTable = {
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
    // selectableRows: "multiple",
    overflowX: "scroll",
    responsive: "vertical",
    selectableRows: "none",
  };

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Họ và tên",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td className="flex justify-start items-center">
              {tableMeta.rowData[1]}
            </td>
          );
        },
      },
    },
    {
      name: "company",
      label: "Công ty",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phone",
      label: "Điện thoại",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "website",
      label: "Website",
      options: {
        filter: true,
        display: false,
        sort: false,
      },
    },
    {
      name: "description",
      label: "Mô tả",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "src",
      label: "Nguồn",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              className="flex justify-start items-center"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          );
        },
      },
    },
    {
      name: "status",
      label: "Trạng thái",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              className="flex justify-start items-center"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          );
        },
      },
    },
    {
      name: "action",
      label: "Hành động",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td className="flex gap-2">
              {/* <ModalEdit id={tableMeta.rowData[0]} /> */}
              <Button
                onClick={() => handleEdit(tableMeta.rowData[0])}
                variant="outlined"
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

              <Button
                id="detail"
                variant="outlined"
                onClick={() => handleDetail(tableMeta.rowData[0])}
              >
                <VisibilityOutlinedIcon />
              </Button>
              {/* <Detail id={tableMeta.rowData[0]} /> */}
            </td>
          );
        },
      },
    },
  ];

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteCustomerPotentialAPI(id));

    setTimeout(() => {
      dispatch(listCustomerPotentialAPI());
    }, 500);
  };

  const tmp = useSelector(dataCustomerPotential);
  console.log(tmp);
  useEffect(() => {
    dispatch(listCustomerPotentialAPI());
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [tmp]);

  const TABLE_HEAD = [
    "STT",
    "Họ và tên",
    "Công ty",
    "Email",
    "Số điện thoại",
    "Mô tả",
    "Nguồn",
    "Trạng thái",
    "",
  ];

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
        console.log("helloo, ", element);
        obj = {};
        obj.id = element?.id;
        obj.name = element?.name;
        obj.phone = element?.phone;
        obj.email = element?.email;
        obj.company = element?.company;
        obj.description = element?.description;
        obj.src_id = element?.source_id;
        obj.status_id = element?.status;
        obj.src_name = element?.source?.name;
        obj.status_name = element?.status_name;
        arr.push(obj);
      });    
    
    console.log("ádad", arr);
    setDataUser(arr);
  };

  console.log(tmp);

  const styles = {
    background: "#2d50b2",
    color: "white",
    borderRadius: "10px",
  };

  const handleEdit = (id) => {
    setId(id);
    setModalEdit(true);
    setIsOpenEdit(!isOpenEdit);
  };

  const handleDetail = (id) => {
    setId(id);
    setModalDetail(true);
    setIsOpenDetail(!isOpenDetail);
  };

  const [openComfirm, setOpenComfirm] = useState(false);
  const [crm, setCrm] = useState(true);
  const [giatri, setgiatri] = useState(100);

  const handleOpenComfirm = () => setOpenComfirm(!openComfirm);
  const handleDongBo = () => {
    handleOpenComfirm();
    let request = {
      src: crm ? 4 : 1,
      giatri: giatri,
    };
    dispatch(CustomerPotentialsSyncAPI(request));
    setTimeout(() => {
      dispatch(listCustomerPotentialAPI());
    }, 500);
  };

  return (
    <>
      <Dialog open={openComfirm} size="sm" handler={handleOpenComfirm}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Đồng bộ dữ liệu
          </Typography>
        </DialogHeader>
        <DialogBody divider className="text-black">
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              Đồng bộ dữ liệu từ nguồn:
              <div className="disabled">
                <input
                  className="mr-2"
                  type="checkbox"
                  id="crm"
                  defaultChecked={crm}
                  onClick={() => setCrm(!crm)}
                />
                <label className="rounded-sm p-1" htmlFor="crm">
                  CRM
                </label>
              </div>
              {/* <div>
                <input className="mr-2" type="checkbox" id="kiotviet" />
                <label className="rounded-sm p-1" htmlFor="kiotviet">
                  KiotViet
                </label>
              </div> */}
            </div>
            <div className="col-span-1">
              Mức dữ liệu:
              <Select
                variant="outlined"
                label="Chọn mức đồng bộ"
                value={giatri.toString()}
                onChange={(e) => setgiatri(e)}
              >
                <Option value="100">100</Option>
                <Option value="200">200</Option>
                <Option value="500">500</Option>
                <Option value="9999999">Tất cả</Option>
              </Select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpenComfirm}>
            Đóng
          </Button>
          <Button variant="gradient" color="green" onClick={handleDongBo}>
            Xác nhận
          </Button>
        </DialogFooter>
      </Dialog>

      {modalEdit && <ModalEdit id={id} isOpenEdit={isOpenEdit} />}
      {modalDetail && <Detail id={id} isOpenDetail={isOpenDetail} />}

      <div className="p-4 !h-36 bg-white rounded-md shadow border border-solid border-[#f2f2f2]">
        <div className="font-medium text-base">
          Bảng tổng quan về hồ sơ khách hàng
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div //
            className="col-span-1"
          >
            <div className="flex flex-col justify-start items-start border border-[#4fc2c5] rounded-md p-2">
              <div className="flex items-center gap-4 px-3 text-[#4fc2c5]">
                <PersonOutlineIcon />
                <div className="text-lg">87</div>
              </div>
              <div className="text-[#4fc2c5] text-[12px]">Chưa liên hệ</div>
            </div>
          </div>
          <div //
            className="col-span-1"
          >
            <div className="flex flex-col justify-start items-start border border-[#5b4fc5] rounded-md p-2">
              <div className="flex items-center gap-4 px-3 text-[#5b4fc5]">
                <PersonOutlineIcon />
                <div className="text-lg">87</div>
              </div>
              <div className="text-[#5b4fc5] text-[12px]">Đã liên hệ</div>
            </div>
          </div>
          <div //
            className="col-span-1"
          >
            <div className="flex flex-col justify-start items-start border border-[#4fc572] rounded-md p-2 text-[#4fc572]">
              <div className="flex items-center gap-4 px-3">
                <PersonOutlineIcon />
                <div className="text-lg">87</div>
              </div>
              <div className="text-[#4fc572] text-[12px]">Cần hỗ trợ</div>
            </div>
          </div>
          <div //
            className="col-span-1"
          >
            <div className="flex flex-col justify-start items-start border border-[#c5804f] rounded-md p-2">
              <div className="flex items-center gap-4 px-3 text-[#c5804f]">
                <PersonOutlineIcon />
                <div className="text-lg">87</div>
              </div>
              <div className="text-[#c5694f] text-[12px]">Tổng cộng</div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Card className="h-full w-full border border-solid border-[#f2f2f2] mt-2 rounded-md">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <ModalAdd />
                <Button
                  color="blue"
                  style={{ padding: "5px 10px", textTransform: "capitalize" }}
                >
                  Nhập khách hàng tiềm nâng
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  className="flex items-center gap-3"
                  onClick={() => handleOpenComfirm()}
                >
                  Đồng bộ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </Button>
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
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
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
                {dataUser.map(
                  (
                    {
                      id,
                      name,
                      phone,
                      email,
                      company,
                      src_id,
                      status_id,
                      src_name,
                      status_name,
                      description,
                    },
                    index
                  ) => {
                    const isLast = index === dataUser.length - 1;
                    const classes = isLast
                      ? "px-3 py-2"
                      : "px-3 py-2 border-b border-blue-gray-50";

                    return (
                      <tr key={id} className="even:bg-blue-gray-50/50">
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
                                className="font-normal cursor-pointer"
                                onClick={() => handleDetail(id)}
                              >
                                {name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal cursor-pointer flex items-center gap-1"
                              // onClick={() => handleCall(id, phone)}
                            >
                              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                />
                              </svg> */}

                              {company}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal cursor-pointer flex items-center gap-1"
                            >
                              {email}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal cursor-pointer flex items-center gap-1"
                              // onClick={() => handleCall(id, phone)}
                            >
                              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                />
                              </svg> */}

                              {phone}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal cursor-pointer flex items-center gap-1"
                            >
                              {description}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={src_name}
                              color={"blue"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={status_name}
                              className="cursor-pointer"
                              color={status_id == 1 ? "blue-gray" : "green"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Sửa thông tin khách hàng">
                            <IconButton
                              variant="text"
                              onClick={() => handleEdit(id)}
                            >
                              <PencilIcon className="h-4 w-4" color="Orange" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Sửa thông tin khách hàng">
                            <IconButton
                              variant="text"
                              onClick={() => handleDelete(id)}
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
                  }
                )}
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
        {/* <MUIDataTable
          title={"Danh sách khách hàng tiềm năng"}
          data={dataUser}
          columns={columns}
          options={optionsTable}
          style={{ fontSize: "10px" }}
        /> */}
      </div>
    </>
  );
};

export default list;
