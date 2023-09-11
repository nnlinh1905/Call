import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
} from "@material-tailwind/react";
Chart.register(...registerables);

const dashboard = () => {
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

  // const optionsTable = {
  //   // filterType: "checkbox",
  //   textLabels: {
  //     body: {
  //       noMatch: "Xin lỗi, không tìm thấy dữ liệu phù hợp",
  //       toolTip: "Sắp xếp",
  //       columnHeaderTooltip: (column) => `Sắp xếp ${column.label}`,
  //     },
  //     pagination: {
  //       next: "Đi tới",
  //       previous: "Lùi lại",
  //       rowsPerPage: "Số dòng hiển thị:",
  //       displayRows: "của",
  //     },

  //     toolbar: {
  //       search: "Tìm kiếm",
  //       downloadCsv: "Tải về CSV",
  //       print: "In",
  //       viewColumns: "Danh mục hiển thị",
  //       filterTable: "Lọc bảng",
  //     },
  //     filter: {
  //       all: "Tất cả",
  //       title: "Bộ lọc",
  //       reset: "Làm mới",
  //     },
  //     viewColumns: {
  //       title: "Hiển thị cột",
  //       titleAria: "Show/Hide Table Columns",
  //     },
  //     selectedRows: {
  //       text: "dòng được chọn",
  //       delete: "Xóa",
  //       deleteAria: "Xóa các dòng được chọn",
  //     },
  //   },
  //   // onRowsSelect: handleRowSelected,
  //   selectableRows: "multiple",
  // };

  // const columns = [
  //   {
  //     name: "id",
  //     label: "id",
  //     options: {
  //       filter: true,
  //       display: false,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: "name",
  //     label: "Khách hàng",
  //     options: {
  //       filter: true,
  //       sort: true,
  //       // customBodyRender: (value, tableMeta, updateValue) => {
  //       //   return (
  //       //     <td
  //       //       // onClick={() => handleCellClick(tableMeta.rowData, "id")}
  //       //       dangerouslySetInnerHTML={{ __html: value }}
  //       //     />
  //       //   );
  //       // },
  //     },
  //   },
  //   {
  //     name: "prefix",
  //     label: "Đầu số",
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: "type",
  //     label: "loại",
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: "dateCall",
  //     label: "Ngày gọi",
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  //   {
  //     name: "status",
  //     label: "Trạng thái",
  //     options: {
  //       filter: true,
  //       sort: false,
  //     },
  //   },
  // ];


  const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "Manager",
      org: "Organization",
      online: true,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: false,
      date: "23/04/18",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: "Executive",
      org: "Projects",
      online: false,
      date: "19/09/17",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: true,
      date: "24/12/08",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      job: "Manager",
      org: "Executive",
      online: false,
      date: "04/10/21",
    },
  ];
  return (
    <>
      <div className="h-auto w-full mb-2 bg-white rounded-md shadow border border-solid border-[#cdcdcd]">
        <div className="border-b border-gray py-3">
          <div className="px-4 font-medium text-base">
            Bảng tổng quan về hồ sơ khách hàng
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 p-4 h-auto">
          <div className="span-col-1">
            <Bar data={data} options={options} />
          </div>
          <div className="span-col-1">
            <Bar data={data} options={options2} />
          </div>
          <div className="span-col-2 w-full"></div>
        </div>
      </div>

      <div className="h-20 w-full mb-3 grid grid-cols-3 gap-2">
        <div className="col-span-1 shadow bg-white w-full rounded-md border border-solid border-[#cdcdcd] p-5 px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <div>0</div>
            <div className="text-gray-500 text-sm">
              Khách hàng tiềm năng đã chuyên đổi
            </div>
          </div>
          <div>
            <RemoveRedEyeIcon style={{ color: "#2d50b2", cursor: "pointer" }} />
          </div>
        </div>
        <div className="col-span-1 shadow bg-white w-full rounded-md border border-solid border-[#cdcdcd] p-5 px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <div>0</div>
            <div className="text-gray-500 text-sm">Số khách hàng tiềm năng</div>
          </div>
          <div>
            <RemoveRedEyeIcon style={{ color: "#2d50b2", cursor: "pointer" }} />
          </div>
        </div>
        <div className="col-span-1 shadow bg-white w-full rounded-md border border-solid border-[#cdcdcd] p-5 px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <div>0</div>
            <div className="text-gray-500 text-sm">Số khách hàng</div>
          </div>
          <div>
            <RemoveRedEyeIcon style={{ color: "#2d50b2", cursor: "pointer" }} />
          </div>
        </div>
      </div>

      <div className="h-auto w-full">
        {/* <MUIDataTable
          title={"Lịch sử cuộc gọi"}
          data={dataUser}
          columns={columns}
          options={optionsTable}
        /> */}

        <Card className="h-full w-full border border-solid border-[#cdcdcd] rounded-md">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {/* <Button variant="outlined" size="sm">
                  view all
                </Button> */}
                <Button
                  className="flex items-center gap-3"
                  color="blue"
                  size="sm"
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                  member
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
            <table className="w-full min-w-max table-auto text-left">
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
                {TABLE_ROWS.map(
                  ({ img, name, email, job, org, online, date }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={img} alt={name} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {job}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {org}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={online ? "online" : "offline"}
                              color={online ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
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
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default dashboard;
