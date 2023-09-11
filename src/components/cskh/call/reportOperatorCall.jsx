import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Select from "react-select";
import { Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MUIDataTable from "mui-datatables";
import {
  dataOperatorCall,
  reportOperatorCallAPI,
} from "../../../features/customerCareSlice";
import AudioPlayer from "react-audio-player";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const reportOperatorCall = () => {
  const [dataUser, setDataUser] = useState([]);
  const [callCenter, setCallcenter] = useState();
  const [extension, setExtension] = useState();
  const [status, setStatus] = useState();
  const [dateFrom, setDateFrom] = useState(moment().format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const dataStatus = [
    {
      value: "NOANSWER",
      label: "Không trả lời",
    },
    {
      value: "ANSWER",
      label: "Trả lời",
    },
    {
      value: "CANCEL",
      label: "Hủy",
    },
    {
      value: "BUSY",
      label: "Bận",
    },
    {
      value: "MISS",
      label: "Cuộc gọi nhỡ",
    },
  ];

  const dispatch = useDispatch();
  const request = {
    dateFrom: dateFrom,
    dateTo: dateTo,
  };

  const handleSearch = () => {
    dispatch(reportOperatorCallAPI(request));
  };

  const data = useSelector(dataOperatorCall);
  console.log(data);
  useEffect(() => {
    dispatch(reportOperatorCallAPI(request));
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [data]);

  const handleConfixData = async () => {
    const arr = await data;
    const newArr = [];
    await (arr &&
      arr.length > 0 &&
      arr.map((item, index) => {
        let obj = {};
        obj.name = item?.customer?.name;
        obj.agent_id = item?.agent_id;
        obj.incoming = item?.incoming;
        obj.tb_incoming_duration = item?.tb_incoming_duration;
        obj.incoming_duration = item?.incoming_duration;
        obj.tb_incoming_wait_time = item?.tb_incoming_wait_time;
        obj.incoming_wait_time = item?.incoming_wait_time;
        obj.percent_incoming_no_answer = item?.percent_incoming_no_answer;
        obj.incoming_no_answer = item?.incoming_no_answer;
        obj.outgoing = item?.outgoing;
        obj.tb_outgoing_duration = item?.tb_outgoing_duration;
        obj.outgoing_duration = item?.outgoing_duration;
        obj.tb_outgoing_wait_time = item?.tb_outgoing_wait_time;
        obj.outgoing_wait_time = item?.outgoing_wait_time;
        obj.percent_outgoing_no_answer = item?.percent_outgoing_no_answer;
        obj.outgoing_no_answer = item?.outgoing_no_answer;
        newArr.push(obj);
      }));
    setDataUser(newArr);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const theme = createTheme();
  return (
    <>
      <div className="p-2 bg-[#f2f4f6] mt-2 rounded-2xl shadow">
        <div className="bg-white border w-full rounded-2xl shadow">
          <div className="w-full border-b p-5 font-medium">
            Báo cáo cuộc gọi tổng đài viên
          </div>
          <div className="p-5 grid grid-cols-4 items-center gap-4">
            <div className="col-span-1 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date_from"
              >
                Từ ngày
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-[7px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date_from"
                type="date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
                // placeholder="Nhập tên nhóm"
              />
            </div>
            <div className="col-span-1 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date_to"
              >
                Đến ngày
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-[7px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date_to"
                type="date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
                // placeholder="Nhập tên nhóm"
              />
            </div>
            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Hành động
              </label>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSearch()}
              >
                <SearchOutlinedIcon />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-2 rounded-2xl">
          <ThemeProvider theme={theme}>
            <div style={{ overflowX: "auto" }}>
              <MUIDataTable
                title={"Báo cáo cuộc gọi tổng đài viên"}
                data={dataUser}
                columns={columns}
                options={options}
              />
            </div>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default reportOperatorCall;

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "10px",
    borderColor: state.isFocused ? "none" : "none",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 118, 255, 0.3)" : null,
    "&:hover": {
      borderColor: state.isFocused ? "none" : "none",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted gray",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "#0070f3" : "white",
    "&:hover": {
      backgroundColor: "#0070f3",
      color: "white",
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
const columns = [
  {
    name: "name",
    label: "Họ tên",
    options: {
      filter: false,
      display: false,
      sort: false,
    },
  },
  {
    name: "agent_id",
    label: "Đầu số",
    options: {
      width: "100px",
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td className="flex flex-col w-36">
            <span>{tableMeta.rowData[1]}</span>
            <span className="text-xs text-gray-500">
              {tableMeta.rowData[0]}
            </span>
          </td>
        );
      },
    },
  },
  {
    name: "incoming",
    label: "Tổng số cuộc gọi đi",
    options: {
      filter: true,
      sort: true,
      width: 100,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td
            className="flex flex-col justify-center items-center"
            dangerouslySetInnerHTML={{ __html: value }}
          ></td>
        );
      },
    },
  },
  {
    name: "tb_incoming_duration",
    label: "Trung bình thời gian gọi đi",
    options: {
      filter: false,
      display: false,
      sort: false,
    },
  },
  {
    name: "incoming_duration",
    label: "Tổng thời gian gọi đi",
    options: {
      filter: true,
      sort: true,
      width: 100,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td className="flex flex-col">
            <span>{tableMeta.rowData[4]}</span>
            <span className="text-xs text-gray-500">
              TB = {tableMeta.rowData[3]}
            </span>
          </td>
        );
      },
    },
  },
  {
    name: "tb_incoming_wait_time",
    label: "Trung bình thời gian gọi đi",
    options: {
      filter: false,
      display: false,
      sort: false,
    },
  },
  {
    name: "incoming_wait_time",
    label: "Tổng thời gian chờ gọi đi",
    options: {
      filter: true,
      sort: true,
      width: "150px",
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td className="flex flex-col">
            <span>{tableMeta.rowData[6]}</span>
            <span className="text-xs text-gray-500">
              TB = {tableMeta.rowData[5]}
            </span>
          </td>
        );
      },
    },
  },
  {
    name: "percent_incoming_no_answer",
    label: "Phần trăm cuộc gọi đi không trả lời",
    options: {
      filter: false,
      display: false,
      sort: false,
    },
  },
  {
    name: "incoming_no_answer",
    label: "Tổng cuộc gọi đi không trả lời",
    options: {
      filter: true,
      sort: true,
      width: "150px",
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td className="flex flex-col">
            <span>{tableMeta.rowData[8]}</span>
            <span className="text-xs text-gray-500">
              {tableMeta.rowData[7]}
            </span>
          </td>
        );
      },
    },
  },
  {
    name: "outgoing",
    label: "Tổng cuộc gọi đến",
    options: {
      filter: true,
      sort: true,
      with: "150px",
    },
  },
  {
    name: "tb_outgoing_duration",
    label: "Trung bình thời gian gọi đi",
    options: {
      filter: false,
      display: false,
      sort: false,
    },
  },
  {
    name: "outgoing_duration",
    label: "Tổng thời gian gọi đi",
    options: {
      filter: true,
      sort: true,
      width: "150px",
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td className="flex flex-col">
            <span>{tableMeta.rowData[11]}</span>
            <span className="text-xs text-gray-500">
              TB = {tableMeta.rowData[10]}
            </span>
          </td>
        );
      },
    },
  },
  {
    name: "tb_outgoing_wait_time",
    label: "Trung bình thời gian gọi đi",
    options: {
      filter: false,
      display: false,
      sort: false,
    },
  },
  {
    name: "outgoing_wait_time",
    label: "Tổng thời gian chờ gọi đi",
    options: {
      filter: true,
      sort: true,
      width: "150px",
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td className="flex flex-col">
            <span>{tableMeta.rowData[13]}</span>
            <span className="text-xs text-gray-500">
              TB = {tableMeta.rowData[12]}
            </span>
          </td>
        );
      },
    },
  },
  {
    name: "percent_outgoing_no_answer",
    label: "Phần trăm cuộc gọi đi không trả lời",
    options: {
      filter: false,
      display: false,
      sort: false,
    },
  },
  {
    name: "outgoing_no_answer",
    label: "Tổng cuộc gọi đi không trả lời",
    options: {
      filter: true,
      sort: true,
      width: "150px",
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td className="flex flex-col">
            <span>{tableMeta.rowData[15]}</span>
            <span className="text-xs text-gray-500">
              {tableMeta.rowData[14]}
            </span>
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
  selectableRows: "none",
};
