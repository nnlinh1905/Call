import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MUIDataTable from "mui-datatables";
import AddDepartment from "./drawerAdd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCallPurposeAPI,
  listCallPurposeAPI,
  dataCallPurpose,
} from "../../../features/callPurposeSlice";
import EditCallPurpose from "./modalEdit";
import Delete from "../../../assets/icon/delete.png";
const callPurpose = () => {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();
  const tmp = useSelector(dataCallPurpose);

  useEffect(() => {
    dispatch(listCallPurposeAPI());
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
      label: "Mục đích",
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
              <EditCallPurpose item={tableMeta} />
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
    console.log(tmp);
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
    dispatch(deleteCallPurposeAPI(id));
    setTimeout(() => {
      dispatch(listCallPurposeAPI());
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
          title={"Mục đích cuộc gọi"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default callPurpose;
