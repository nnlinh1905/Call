import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import Select from "react-select";
import { Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  callistationPartionsAPI,
  dataCallisttion,
} from "../../../features/customerCareSlice";
import moment from "moment";

const callistationPartitions = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataPro, setDataPro] = useState([]);

  const [dateFrom, setDateFrom] = useState(moment().format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [queue, setQueue] = useState();
  const [typeDate, setTypeDate] = useState();

  const request = {
    dateFrom: dateFrom,
    dateTo: dateTo,
    queue: queue,
    typeDate: typeDate,
  };

  const dispatch = useDispatch();

  const data = useSelector(dataCallisttion);
  console.log(data);
  useEffect(() => {
    dispatch(callistationPartionsAPI(request));
  }, []);

  const handleSearch = () => {
    dispatch(callistationPartionsAPI(request));
  };

  const columns = [
    {
      name: "queue",
      label: "hàng đợi",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "recived",
      label: "Recived",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "answered",
      label: "Answered",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "axittimeout",
      label: "Axittimeout",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "answer",
      label: "%Trả lời",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "missedCalls",
      label: "%Gọi nhỡ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "timeout",
      label: "%Timeout",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "avg_wait",
      label: "AVG Wait",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "avg_talk",
      label: "AVG Talk",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columnsDay = [
    {
      name: "day",
      label: "Day",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "recived",
      label: "Recived",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "answered",
      label: "Answered",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "abandoned",
      label: "Abandoned",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "exittimeou",
      label: "Exittimeou",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "missedCalls",
      label: "%Trả lời",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "missedCalls",
      label: "%Gọi nhỡ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "timeout",
      label: "%Timeout",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "avg_wait",
      label: "AVG Wait",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "avg_talk",
      label: "AVG Talk",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    handleConfixData();
  }, [data]);

  const handleConfixData = async () => {
    const arr = await data?.data;
    const arrData = [];
    (await arr) &&
      arr.length > 0 &&
      arr.map((item) => {
        let obj = {};
        obj.queue = item.queue_id;
        obj.recived = item.total_call;
        obj.answered = item.total_answer;
        obj.axittimeout = item.total_busy;
        obj.answer = item.percent_answer + "%";
        obj.missedCalls = item.percent_busy + "%";
        obj.timeout = "1%";
        obj.avg_wait = item.avg_wait_time;
        obj.avg_talk = item.avg_talk_time;
        arrData.push(obj);
      });
    setDataUser(arrData);

    const arrPro = await data?.data_fow;
    const arrDataPro = [];
    (await arrPro) &&
      arrPro.length > 0 &&
      arrPro.map((item) => {
        let obj = {};
        obj.day = item.day_name;
        obj.recived = item.total_call;
        obj.answered = item.total_answer;
        obj.abandoned = item.total_busy;
        obj.exittimeou = item.percent_answer + "%";
        obj.missedCalls = item.percent_busy + "%";
        obj.timeout = "1%";
        obj.avg_wait = item.avg_wait_time;
        obj.avg_talk = item.avg_talk_time;
        arrDataPro.push(obj);
      });
    setDataPro(arrDataPro);
  };
  return (
    <>
      <div className="p-2 bg-[#f2f4f6] mt-2 rounded-2xl shadow">
        <MUIDataTable
          title={"Thống kê phân bổ cuộc gọi"}
          data={dataUser}
          columns={columns}
          options={options}
        />

        <div className="bg-white border w-full rounded-2xl shadow p-2 items-center mt-2">
          <div className="col-span-4 w-full border-b p-5 font-medium">
            Báo cáo cuộc gọi đến
          </div>
          <div className="grid grid-cols-4 gap-4 p-5">
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
                onChange={(event) => setQueue(event.value)}
                styles={customStyles}
                isSearchable={true}
                isClearable={true}
              />
            </div>
            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Loại ngày
              </label>
              <Select
                // value={listSources.filter((item) => item.value == source_id)}
                options={[
                  {
                    value: "day",
                    label: "Ngày",
                  },
                  {
                    value: "month",
                    label: "Tháng",
                  },
                ]}
                onChange={(event) => setTypeDate(event.value)}
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

        <div className="mt-2">
          <MUIDataTable
            title={"Thống kê phân bổ cuộc gọi"}
            data={dataPro}
            columns={columnsDay}
            options={options}
          />
        </div>
      </div>
    </>
  );
};

export default callistationPartitions;

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
