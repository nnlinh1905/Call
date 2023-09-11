import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import TextField from "@mui/material/TextField";

const note = () => {
  const [dataUser, setDataUser] = useState([]);
  const [check, setCheck] = useState(false);
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
      name: "type",
      label: "Loại cuộc gọi",
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
      name: "customer",
      label: "tên khách hàng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "user",
      label: "Nhân viên",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "file ghi âm",
      label: "Nhân viên",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "start_time",
      label: "thời gian bắt đầu",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "start_end",
      label: "thời gian kết thúc",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "duration",
      label: "thời lượng",
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

  const handleSave = () => {
    setCheck(false);
  };

  return (
    <>
      <div className="py-2 border-b px-4 w-full text-gray-600 font-medium flex justify-between items-center">
        <div className="">Lịch sử cuộc gọi</div>
        {/* <div className="">
          <Button
            startIcon={<Add />}
            onClick={() => setCheck(true)}
            className=""
            variant="outlined"
          >
            Ghi chú
          </Button>
        </div> */}
      </div>
      {check && (
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="p-4 flex flex-col gap-4"
        >
          <TextField
            className="w-full"
            id="outlined-multiline-static"
            label="Mô tả"
            multiline
            rows={3}
          />
          <Button
            variant="outlined"
            className="w-full"
            onClick={() => handleSave()}
          >
            Lưu lại
          </Button>
        </div>
      )}

      <div className="p-4">
        <MUIDataTable
          title={"Thêm ghi chú"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default note;
