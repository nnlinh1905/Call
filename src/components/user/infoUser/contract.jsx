import React, { useState } from "react";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";

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
    name: "type_contract",
    label: "Mã hợp đồng",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "user_id",
    label: "Nhân viên",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "department_id",
    label: "Phòng ban",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "effective_date",
    label: "Ngày hiệu lực",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "expiration_date",
    label: "Ngày hết hiệu lực",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "status",
    label: "Trạng thái",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "sign_day",
    label: "Ngày ký",
    options: {
      filter: true,
      sort: false,
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

const contract = () => {
  const [dataUser, setDataUser] = useState([]);
  return (
    <>
      <div className="w-full p-2 bg-white shadow rounded-2xl">
        <Button
          size="small"
          style={{
            background: "#2d50b2",
            borderRadius: "10px",
            color: "white",
          }}
        >
          Hợp đồng mới
        </Button>
      </div>

      <div className="mt-2">
        <MUIDataTable
          title={"Danh sách hợp đồng"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default contract;
