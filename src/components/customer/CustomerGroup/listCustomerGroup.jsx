import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import ModalAdd from "./modalAddCustomerGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  listCustomerGroupAPI,
  deleteCustomerGroupAPI,
  dataCustomerGroupTable,
} from "../../../features/customerSlice";
import ModalEditCustomerGroup from "./modalEditCustomerGroup";
import Delete from "../../../assets/icon/delete.png";
import { Button } from "@mui/material";

const listCustomerGroup = () => {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();

  const tmp = useSelector(dataCustomerGroupTable);

  useEffect(() => {
    dispatch(listCustomerGroupAPI());
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
      label: "Họ và tên",
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
              <ModalEditCustomerGroup item={tableMeta.rowData} />
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
    dispatch(deleteCustomerGroupAPI(id));
    setTimeout(() => {
      dispatch(listCustomerGroupAPI());
    }, 500);
  };

  return (
    <>
      <div className="flex justify-start items-center gap-2 bg-white rounded-2xl p-2 shadow">
        <ModalAdd />
      </div>
      <div className="h-auto min-h-full w-full mb-2rounded-2xl mt-2">
        <MUIDataTable
          title={"Danh sách nhóm khách hàng"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default listCustomerGroup;
