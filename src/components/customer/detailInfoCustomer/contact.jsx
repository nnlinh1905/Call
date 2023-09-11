import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {
  dataHistoryCustomer,
  historyCustomerApi,
  checkActiveApi,
} from "../../../features/customerSlice";
import { useSelector, useDispatch } from "react-redux";
import Phone_black from "../../../assets/icon/phone_black.png";
import Delete from "../../../assets/icon/delete.png";
import DrawerEditCustomer from "../drawerEditCustomer";
import Edit from "../../../assets/icon/edit.png";
const contact = (props) => {
  const [dataUser, setDataUser] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
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
      name: "full_name",
      label: "Họ và tên",
      options: {
        filter: true,
        sort: true,
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
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phone",
      label: "Số điện thoại",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              onClick={() =>
                handleCall(tableMeta.rowData[0], tableMeta.rowData[2])
              }
              className="flex justify-start items-center gap-1 hover:text-blue-500 cursor-pointer"
            >
              <img src={Phone_black} alt="" className="w-5 h-5" />{" "}
              {tableMeta.rowData[3]}
            </td>
          );
        },
      },
    },
    {
      name: "active",
      label: "Cho phép hoạt động",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              className="flex justify-start items-center gap-4"
              onClick={() =>
                handleCheckActive(tableMeta.rowData[0], tableMeta.rowData[5])
              }
              dangerouslySetInnerHTML={{ __html: value }}
            />
          );
        },
      },
    },
    {
      name: "active_check",
      label: "id active",
      options: {
        filter: true,
        display: false,
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
      name: "action",
      label: "Tùy chọn",
      options: {
        display: true,
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td className="flex gap-5">
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

  const handleCall = (id, call) => {
    //console.log("id, call", id, call);
    csInterFacePhoneClient(id, call);
  };

  const dispatch = useDispatch();
  const handleCheckActive = (id, active) => {
    const data = {
      id: id,
      active: active == 1 ? 0 : 1,
    };

    dispatch(checkActiveApi(data));
  };

  let tmp = useSelector(dataHistoryCustomer);
  useEffect(() => {
    dispatch(historyCustomerApi(props.id));
  }, [props.id]);

  useEffect(() => {
    setTimeout(() => {
      handleConfixData();
    }, 1000);
  }, [tmp]);

  const handleConfixData = async () => {
    const arr = [];
    let obj = {};
    // tmp.map((element) => {
    obj = {};
    obj.id = tmp.customer.id;
    obj.full_name = tmp.customer.full_name;
    obj.phone = tmp.customer.phone;
    obj.email = tmp.customer.email;
    obj.active_check = tmp.customer.active;
    obj.active =
      tmp.customer.active == 1
        ? `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" defaultChecked>
  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>` + tmp.customer.active_text
        : `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer">
  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>` + tmp.customer.active_text;
    obj.src =
      "<div className='px-3 py-1 text-orange-600 border border-orange-600 bg-orange-50 rounded'>" +
      tmp.customer.source_name +
      "<div>";
    arr.push(obj);
    // });
    // console.log("raa", arr);
    setDataUser(arr);
  };

  const handleEdit = (id) => {
    setId(id);
    setModal(true);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {modal && <DrawerEditCustomer id={id} isOpen={isOpen} />}
      <div className="py-2 border-b px-4 w-full text-gray-600 font-medium flex justify-between items-center">
        <div className="">Liên hệ</div>
        <div className="">
          <Button startIcon={<Add />} className="" variant="outlined">
            liên hệ
          </Button>
        </div>
      </div>
      <div className="p-4">
        <MUIDataTable
          title={"Danh sách Liên hệ"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default contact;
