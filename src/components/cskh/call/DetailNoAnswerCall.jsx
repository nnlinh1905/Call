import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Select from "react-select";
import { Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MUIDataTable from "mui-datatables";
import {
  dataNoAnswerCall,
  detaiNoAnswerCallAPI,
} from "../../../features/customerCareSlice";
import AudioPlayer from "react-audio-player";

const callReportByQueue = () => {
  const [dataUser, setDataUser] = useState([]);
  const [queue, setQueue] = useState();
  const [extension, setExtension] = useState();
  const [dateFrom, setDateFrom] = useState(moment().format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));

  // useEffect(() => {
  //   setDateFrom(moment().format("YYYY-MM-DD"));
  //   setDateTo(moment().format("YYYY-MM-DD"));
  // }, []);
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
    queue: queue,
    extension: extension,
  };

  const data = useSelector(dataNoAnswerCall);
  console.log(data);
  useEffect(() => {
    console.log("Request", request);
    dispatch(detaiNoAnswerCallAPI(request));
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
        obj.id = item.id;
        obj.date_call = moment(item.creacted_at).format("DD-MM-YYYY");
        obj.employee = item?.agent?.name;
        obj.extension = item?.agent_id;
        obj.queue = item.queue?.name;
        obj.waiting_time = item?.await_time_format;
        obj.call_time = item.talk_time_format;
        newArr.push(obj);
      }));
    setDataUser(newArr);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSearch = () => {
    dispatch(detaiNoAnswerCallAPI(request));
  };
  return (
    <>
      <div className="p-2 bg-[#f2f4f6] mt-2 rounded-2xl shadow">
        <div className="bg-white border w-full rounded-2xl shadow items-center">
          <div className="col-span-4 w-full border-b p-5 font-medium">
            Chi tiết cuộc gọi chưa trả lời
          </div>
          <div className="grid grid-cols-4 p-5 gap-4">
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
                Hàng đợi
              </label>
              <Select
                // value={listSources.filter((item) => item.value == source_id)}
                // options={listSources}
                onChange={(e) => setQueue(e.value)}
                styles={customStyles}
                isSearchable={true}
                isClearable={true}
              />
            </div>
            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Đầu sô
              </label>
              <Select
                // value={listSources.filter((item) => item.value == source_id)}
                // options={listSources}
                onChange={(e) => setExtension(e.value)}
                styles={customStyles}
                isSearchable={true}
                isClearable={true}
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

        <div className="mt-2 border rounded-2xl">
          <MUIDataTable
            title={"Chi tiết cuộc gọi chưa trả lời"}
            data={dataUser}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </>
  );
};

export default callReportByQueue;

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
    name: "id",
    label: "id",
    options: {
      filter: true,
      display: false,
      sort: false,
    },
  },
  {
    name: "date_call",
    label: "Ngày gọi",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "employee",
    label: "Nhân viên",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "extension",
    label: "Đầu số",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "queue",
    label: "Hàng đợi",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "waiting_time",
    label: "thời gian chờ",
    options: {
      filter: true,
      sort: true,
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
