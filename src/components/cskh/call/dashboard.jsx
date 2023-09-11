import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import { useDispatch, useSelector } from "react-redux";
import {
  dataCallReport,
  CallReportAPI,
} from "../../../features/dashboardSlice";
import { dataUserSelect, ListUserApi } from "../../../features/usersSlice";
import moment from "moment";
// import "./index.css";

HighchartsExporting(Highcharts);

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

const dashboard = () => {
  const dispatch = useDispatch();

  const [callCenter, setCallcenter] = useState();
  const [extension, setExtension] = useState();
  const [status, setStatus] = useState();
  const [dateFrom, setDateFrom] = useState(moment().format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [agent, setAgent] = useState();

  const request = {
    callCenter: callCenter,
    extension: extension,
    status: status,
    dateFrom: dateFrom,
    dateTo: dateTo,
    agent: agent,
  };

  const data = useSelector(dataCallReport);
  const listUser = useSelector(dataUserSelect);

  console.log(data);
  useEffect(() => {
    console.log("Resquest", request);
    dispatch(CallReportAPI(request));
    dispatch(ListUserApi());
  }, []);

  const handleSearch = () => {
    dispatch(CallReportAPI(request));
  };
  const CallingStatistics = {
    chart: {
      type: "pie",
      backgroundColor: "#ffffff",
      padding: 5,
      // shadow: true,
    },
    title: {
      text: "Thống kê cuộc gọi",
      style: {
        color: "#374151",
        fontSize: "15px",
        fontWeight: "600",
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts credits
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        colors: ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0"],
      },
      series: {
        className: "custom-series", // CSS class name for the series
      },
    },
    series: [
      {
        name: "Số lượng",
        data: [
          ["Gọi vào", data?.data?.incoming],
          ["Gọi ra", data?.data?.outgoing],
        ],
      },
    ],
  };
  const IncomingCallStatistics = {
    chart: {
      type: "pie",

      // shadow: true,
    },
    title: {
      text: "Thống kê cuộc gọi vào",
      style: {
        color: "#374151",
        fontSize: "15px",
        fontWeight: "600",
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts credits
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        colors: ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0"],
      },
    },
    series: [
      {
        name: "Số lượng",
        data: [
          ["Đã trả lời", data?.resultIncoming?.answer],
          ["Gọi nhỡ", data?.resultIncoming?.miss],
          ["Hủy", data?.resultIncoming?.cancel],
          ["Chưa trả lời", data?.resultIncoming?.noanswer],
          ["Bận", data?.resultIncoming?.busy],
        ],
        style: {
          fontSize: "5px",
        },
      },
    ],
  };
  const OutcomingCallStatistics = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Thống kê cuộc gọi ra",
      style: {
        color: "#374151",
        fontSize: "15px",
        fontWeight: "600",
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts credits
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        colors: ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0"],
      },
    },
    series: [
      {
        name: "Số lượng",
        data: [
          ["Đã trả lời", data?.resultOutgoing?.answer],
          ["Gọi nhỡ", data?.resultOutgoing?.miss],
          ["Hủy", data?.resultOutgoing?.cancel],
          ["Chưa trả lời", data?.resultOutgoing?.noanswer],
          ["Bận", data?.resultOutgoing?.busy],
        ],
      },
    ],
  };

  const CallStatisticsByDay = {
    chart: {
      type: "column",

      // shadow: true,
    },
    title: {
      text: "Thống kê cuộc gọi theo ngày",
      style: {
        color: "#374151",
        fontSize: "15px",
        fontWeight: "600",
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts credits
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        colors: ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0"],
      },
    },
    xAxis: {
      categories: data?.resultDate?.date,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Số lượng cuộc gọi",
      },
    },
    series: [
      {
        name: "Tổng cộng",
        data: data?.resultDate?.total,
      },
      {
        name: "Gọi vào",
        data: data?.resultDate?.incoming,
      },
      {
        name: "Gọi ra",
        data: data?.resultDate?.outgoing,
      },
    ],
  };

  const CallStatisticsByAgent = {
    chart: {
      type: "column",

      // shadow: true,
    },
    title: {
      text: "Thống kê cuộc gọi theo ngày",
      style: {
        color: "#374151",
        fontSize: "15px",
        fontWeight: "600",
      },
    },
    credits: {
      enabled: false, // Disable the Highcharts credits
    },
    xAxis: {
      categories: data?.resultIndividual?.extension,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Số lượng cuộc gọi",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        colors: ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0"],
      },
    },
    series: [
      {
        name: "Tổng cộng",
        data: data?.resultIndividual?.total,
      },
      {
        name: "Gọi vào",
        data: data?.resultIndividual?.incoming,
      },
      {
        name: "Gọi ra",
        data: data?.resultIndividual?.outgoing,
      },
    ],
  };

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

  return (
    <>
      <div className="p-2 bg-[#f2f4f6] mt-2 rounded-2xl shadow">
        <div className="bg-white border w-full rounded-2xl shadow items-center">
          {/* <div className="w-full border-b  p-5 font-medium ">
            Báo cáo thống kê cuộc gọi
          </div> */}
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
                Đầu sô
              </label>
              <Select
                // value={listSources.filter((item) => item.value == source_id)}
                // options={listSources}
                onChange={(event) => setAgent(event.value)}
                styles={customStyles}
                isSearchable={true}
                isClearable={true}
              />
            </div>
            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Số điện thoại tổng đài
              </label>
              <Select
                // value={listSources.filter((item) => item.value == source_id)}
                // options={listSources}
                onChange={(event) => setCallcenter(event.value)}
                styles={customStyles}
                isSearchable={true}
                isClearable={true}
              />
            </div>
            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Trạng thái
              </label>
              <Select
                // value={listSources.filter((item) => item.value == source_id)}
                onChange={(event) => setStatus(event.value)}
                options={dataStatus}
                styles={customStyles}
                isSearchable={true}
                isClearable={true}
              />
            </div>
            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nhân viên
              </label>
              <Select
                // value={listSources.filter((item) => item.value == source_id)}
                options={listUser}
                onChange={(event) => setAgent(event.value)}
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

        <div className="w-full mt-2 rounded-2xl grid grid-cols-3 items-center gap-2">
          <div className="col-span-1 py-2 px-1 bg-white rounded-2xl shadow">
            <HighchartsReact
              highcharts={Highcharts}
              options={CallingStatistics}
            />
          </div>
          <div className="col-span-1 py-2 px-1 bg-white rounded-2xl shadow">
            <HighchartsReact
              highcharts={Highcharts}
              options={IncomingCallStatistics}
            />
          </div>
          <div className="col-span-1 py-2 px-1 bg-white rounded-2xl shadow">
            <HighchartsReact
              highcharts={Highcharts}
              options={OutcomingCallStatistics}
            />
          </div>

          <div className="col-span-3 grid grid-cols-2 gap-2">
            <div className="col-span-1 py-2 px-1 bg-white rounded-2xl shadow">
              <HighchartsReact
                highcharts={Highcharts}
                options={CallStatisticsByDay}
              />
            </div>
            <div className="col-span-1 py-2 px-1 bg-white rounded-2xl shadow">
              <HighchartsReact
                highcharts={Highcharts}
                options={CallStatisticsByAgent}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
