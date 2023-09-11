import React, { useState, useEffect } from "react";
import CustomerGroup from "../../assets/icon/user-groups.png";
import CustomerCheck from "../../assets/icon/user-check.png";
import CustomerDelete from "../../assets/icon/delete-user.png";
import PhoneIcon from "../../assets/icon/phoneIcon.png";
import PhoneOut from "../../assets/icon/call-out.png";
import LoginIcon from "../../assets/icon/login-icon.png";
import Button from "@mui/material/Button";
import Excel from "../../assets/icon/excel.png";
import Delete from "../../assets/icon/delete.png";
import MUIDataTable from "mui-datatables";
// import ModalAddUser from "./modalAddUser";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ListUserApi,
  dataListUser,
  CheckIsLoginApi,
  deleteUserApi,
} from "../../features/usersSlice";
import DrawerAddUser from "./drawerAddUser";
import DrawerEditUser from "./drawerEditUser";
import Edit from "../../assets/icon/Edit.png";
const listUser = () => {
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
      label: "Họ và tên",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Link to={`/system/user/list/${tableMeta.rowData[0]}`}>
              <td
                className="hover:text-blue-500 cursor-pointer"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </Link>
          );
        },
      },
    },
    {
      name: "gender",
      label: "Giới tính",
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
      label: "Phone",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "department",
      label: "Phòng ban",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Được phép đăng nhập",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              className="flex justify-center"
              onClick={() => handleCheckLogin(tableMeta.rowData)}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          );
        },
      },
    },
    {
      name: "extentsion",
      label: "Extension - Số nội bộ",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              className="flex justify-center"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          );
        },
      },
    },
    {
      name: "fb",
      label: "Facebook",
      options: {
        display: false,
        filter: true,
        sort: false,
      },
    },
    {
      name: "skype",
      label: "Skype",
      options: {
        display: false,
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_login",
      label: "is_login",
      options: {
        display: false,
        filter: true,
        sort: false,
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
                onClick={() => handleEdit(tableMeta.rowData[0])}
              >
                <img src={Edit} alt="" className="w-5 h-5" />
              </Button>
              <Button
                variant="outlined"
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(-1);
  const handleRowSelected = (currentRowsSelected, allRowsSelected) => {
    setSelectedRows(allRowsSelected.map((row) => row.dataIndex));
  };
  const dispatch = useDispatch();
  let tmp = useSelector(dataListUser);

  useEffect(() => {
    dispatch(ListUserApi());
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [tmp]);

  const label = { inputProps: { "aria-label": "Size switch demo" } };
  const handleConfixData = async () => {
    const arrTmp = await tmp;
    const arr = [];
    let obj = {};
    arrTmp &&
      arrTmp.length > 0 &&
      arrTmp.map((element) => {
        obj = {};
        obj.id = element.id;
        obj.name = '<div className="" > ' + element.full_name + "</div>";
        obj.gender = element.gender;
        obj.email = element.email;
        obj.phone = element.phone;
        obj.department = element.department?.name;
        obj.is_login = element.is_login;
        obj.status =
          element.is_login == 1
            ? `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" defaultChecked>
  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>`
            : `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer">
  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>`;
        obj.fb = element.facebook;
        obj.skype = element.skype;
        obj.extentsion =
          '<span className="text-center">' + element.extension + "</span>";
        arr.push(obj);
      });
    setDataUser(arr);
  };

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
    onRowsSelect: handleRowSelected,
    selectableRows: "multiple",
  };

  const handleCheckLogin = (data) => {
    const request = {
      id: data[0],
      is_login: data[10] == 0 ? 1 : 0,
    };

    dispatch(CheckIsLoginApi(request));
  };

  const handleDelete = (id) => {
    dispatch(deleteUserApi(id));
    setTimeout(() => {
      dispatch(ListUserApi());
    }, 500);
  };

  const handleEdit = (id) => {
    setId(id);
    setModalEdit(true);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {modalEdit && <DrawerEditUser id={id} isOpen={isOpen} />}

      <div className="grid h-16 w-full bg-white rounded-2xl mb-2 grid-cols-5 p-2 px-4 shadow items-center">
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={CustomerGroup}
                className="w-5 border rounded-full bg-[#f6fcfc]"
                alt=""
              />
              <div className="text-lg">87</div>
            </div>
            <div className="text-[#4fc2c5] text-[14px]">Tổng số Nhân viên</div>
          </div>
        </div>
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={CustomerCheck}
                className="w-5 border rounded-full bg-[#f6fcf7]"
                alt=""
              />
              <div className="text-lg">87</div>
            </div>
            <div className="text-green-600 text-[14px]">
              Khách hàng đang hoạt động
            </div>
          </div>
        </div>
        <div //
          className="col-span-1 hidden"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={CustomerDelete}
                className="w-5 border rounded-full bg-[#fcf6f6]"
                alt=""
              />
              <div className="text-lg">0</div>
            </div>
            <div className="text-red-500 text-[14px]">
              Khách hàng không hoạt động
            </div>
          </div>
        </div>
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={PhoneIcon}
                className="w-5 border rounded-full bg-[#f6fbfc]"
                alt=""
              />
              <div className="text-lg">87</div>
            </div>
            <div className="text-[#3bdaed] text-[14px]">
              Liên hệ đang hoạt động
            </div>
          </div>
        </div>
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={PhoneOut}
                className="w-5 border rounded-full bg-[#fcfaf6]"
                alt=""
              />
              <div className="text-lg">0</div>
            </div>
            <div className=" text-orange-500 text-[14px]">
              Liên hệ ít hoạt động
            </div>
          </div>
        </div>
        <div //
          className="col-span-1"
        >
          <div className="flex flex-col justify-start items-start">
            <div className="flex items-center gap-4 px-3">
              <img
                src={LoginIcon}
                className="w-5 border rounded-full bg-[#f6fcfc]"
                alt=""
              />
              <div className="text-lg">44</div>
            </div>
            <div className="text-gray-500 text-[14px]">
              Đã liên hệ trong hôm nay
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto min-h-[89%] w-full mb-2 bg-white rounded-2xl p-3 shadow">
        <div className="flex justify-start items-center gap-2">
          <div className="flex justify-start items-center gap-2">
            {/* <DrawerAddUser /> */}
            <DrawerAddUser />
            <Button
              variant="outlined"
              color="success"
              style={{ borderRadius: "10px" }}
              endIcon={<img src={Excel} alt className="w-5" />}
            >
              Tải lên
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <MUIDataTable
            title={"Hồ sơ nhân sự"}
            data={dataUser}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </>
  );
};

export default listUser;
