import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MUIDataTable from "mui-datatables";
Chart.register(...registerables);

const indexChart = () => {
  const [chartData, setChartData] = useState({});
  const [dataUser, setDataUser] = useState([]);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Nam",
        data: [10, 9, 30, 40, 100, 10, 120],
        backgroundColor: "#2d50b2",
        borderColor: "#2d50b2",
        borderWidth: 1,
        borderRadius: 20,
      },
      {
        label: "Nữ",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        borderRadius: 20,
      },
      {
        label: "cột phát triển",
        type: "line",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        borderRadius: 20,
        zIndex: 10000,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nhân viên theo phòng ban",
      },
    },
  };
  const options2 = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tỉ lệ nhân viên theo công việc",
      },
    },
  };

  const optionsTable = {
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
            <td
              // onClick={() => handleCellClick(tableMeta.rowData, "id")}
              dangerouslySetInnerHTML={{ __html: value }}
            />
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
      label: "Hoạt động",
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
      name: "action",
      label: "Tùy chọn",
      options: {
        display: true,
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td>{/* <DrawerEditUser item={tableMeta.rowData[0]} /> */}</td>
          );
        },
      },
    },
  ];
  return (
    <>
      <div className="h-auto w-full mb-2 bg-white rounded-2xl shadow">
        <div className="border-b border-gray py-3">
          <div className="px-4 font-medium text-lg">
            Bảng tổng quan về hồ sơ nhân sự
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 p-4 h-80 max-h-96">
          <div className="span-col-1">
            <Bar data={data} options={options} />
          </div>
          <div className="span-col-1">
            <Bar data={data} options={options2} />
          </div>
          <div className="span-col-2 w-full"></div>
        </div>
      </div>
      <div className="h-20 w-full mb-3 grid grid-cols-2 gap-2">
        <div className="col-span-1 shadow bg-white w-full rounded-2xl p-5 px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <div>0</div>
            <div className="text-gray-500 text-sm">Hợp đồng sắp hết hạn</div>
          </div>
          <div>
            <RemoveRedEyeIcon style={{ color: "#2d50b2", cursor: "pointer" }} />
          </div>
        </div>
        <div className="col-span-1 shadow bg-white w-full rounded-2xl p-5 px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <div>0</div>
            <div className="text-gray-500 text-sm">Hợp đồng hết hạn</div>
          </div>
          <div>
            <RemoveRedEyeIcon style={{ color: "#2d50b2", cursor: "pointer" }} />
          </div>
        </div>
      </div>
      <div className="h-auto w-full mb-2 gap-2 shadow bg-white rounded-2xl p-3">
        <MUIDataTable
          title={"Danh sách nhân viên sắp đến hạn họp đồng"}
          data={dataUser}
          columns={columns}
          options={optionsTable}
        />
      </div>
    </>
  );
};

export default indexChart;
