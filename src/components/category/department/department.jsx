import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MUIDataTable from "mui-datatables";
import AddDepartment from "./drawerAdd";
import { useDispatch, useSelector } from "react-redux";
import {
  data,
  listDepartmentAPI,
  deleteDepartmentAPI,
  editDepartmentAPI,
} from "../../../features/departmentSlice";
import EditDepartment from "./modalEdit";
import Delete from "../../../assets/icon/delete.png";
const department = () => {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();
  const tmp = useSelector(data);

  useEffect(() => {
    dispatch(listDepartmentAPI());
  }, []);

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
      label: "Tên phòng",
      options: {
        filter: true,
        sort: true,
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
      name: "status_name",
      label: "Trạng thái",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              className="flex justify-start items-center gap-2"
              onClick={() => handleUpdateStatus(tableMeta.rowData)}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          );
        },
      },
    },
    {
      name: "status_id",
      label: "Id trạng thái",
      options: {
        display: false,
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: "department",
    //   label: "Phòng ban",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: "status",
    //   label: "Hoạt động",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <td
    //           className="flex justify-center"
    //           dangerouslySetInnerHTML={{ __html: value }}
    //         />
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "extentsion",
    //   label: "Extension - Số nội bộ",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <td
    //           className="flex justify-center"
    //           dangerouslySetInnerHTML={{ __html: value }}
    //         />
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "fb",
    //   label: "Facebook",
    //   options: {
    //     display: false,
    //     filter: true,
    //     sort: false,
    //   },
    // },
    // {
    //   name: "skype",
    //   label: "Skype",
    //   options: {
    //     display: false,
    //     filter: true,
    //     sort: false,
    //   },
    // },
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
              <EditDepartment item={tableMeta} />
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

  const handleUpdateStatus = (rowData) => {
    const request = {
      id: rowData[0],
      status_id: rowData[4] == 1 ? 0 : 1,
      name: rowData[1],
      description: rowData[2],
    };
    dispatch(editDepartmentAPI(request));
    setTimeout(() => {
      dispatch(listDepartmentAPI());
    }, 500);
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
        obj.description = element.description;
        obj.status_name =
          element.status_id == 1
            ? `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" defaultChecked>
  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>` + element.status_name
            : `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer">
  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>` + element.status_name;
        obj.status_id = element.status_id;
        arr.push(obj);
      });
    setDataUser(arr);
  };

  const handleDelete = (id) => {
    alert(id);
    dispatch(deleteDepartmentAPI(id));
    setTimeout(() => {
      dispatch(listDepartmentAPI());
    }, 500);
  };
  return (
    <>
      <div className="h-auto w-full mb-2 bg-white rounded-2xl p-3 shadow">
        <div className="flex justify-end items-center gap-2">
          <AddDepartment />
          {/* <Button variant="outlined">Thêm phòng ban</Button> */}
        </div>
      </div>
      <div className="mt-2">
        <MUIDataTable
          title={"Danh sách phòng ban"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default department;
