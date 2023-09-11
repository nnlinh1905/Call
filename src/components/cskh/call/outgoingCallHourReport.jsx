import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Select from "react-select";
import { Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import {
  outgoingCallHourReportAPI,
  dataOutgoingHour,
} from "../../../features/customerCareSlice";
import { dataUserSelect, ListUserApi } from "../../../features/usersSlice";
HighchartsExporting(Highcharts);

const outgoingCallHourReport = () => {
  const [callCenter, setCallcenter] = useState();
  const [extension, setExtension] = useState();
  const [status, setStatus] = useState();
  const [dateFrom, setDateFrom] = useState(moment().format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [agent, setAgent] = useState();
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
  const data = useSelector(dataOutgoingHour);
  console.log("datanennnnnn", data);
  const DataIncomingCallHour = {
    chart: {
      type: "column",
      // borderRadius: 15,
      // shadow: true,
    },
    title: {
      text: "Thống kê cuộc gọi đi theo giờ",
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
      categories: data?.arrayTime,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Số lượng",
      },
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.x +
          "</b><br/>" +
          this.series.name +
          ": " +
          this.y +
          "<br/>" +
          "Total: " +
          this.point.stackTotal
        );
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: "Đã trả lời",
        data: data?.arrayValueAnswer,
        stack: "call",
        color: "#008ffb",
      },
      {
        name: "Gọi nhỡ",
        data: data?.arrayValueMiss,
        stack: "call",
        color: "#00e396",
      },
      {
        name: "Bận",
        data: data?.arrayValueBusy,
        stack: "call",
        color: "#feb019",
      },
      {
        name: "Hủy",
        data: data?.arrayValueCancel,
        stack: "call",
        color: "#ff4560",
      },
      {
        name: "Không trả lời",
        data: data?.arrayValueNoAnswer,
        stack: "call",
        color: "#775dd0",
      },
    ],
  };

  const request = {
    dateFrom: dateFrom,
    dateTo: dateTo,
    callCenter: callCenter,
    extension: extension,
    status: status,
    agent: agent,
  };

  const listUser = useSelector(dataUserSelect);
  useEffect(() => {
    dispatch(outgoingCallHourReportAPI(request));
    dispatch(ListUserApi());
  }, []);

  const handleSearch = () => {
    dispatch(outgoingCallHourReportAPI(request));
  };

  return (
    <>
      <div className="p-2 bg-[#f2f4f6] mt-2 rounded-2xl shadow">
        <div className="bg-white border w-full rounded-2xl shadow">
          <div className="w-full border-b p-5 font-medium">
            Báo cáo cuộc gọi đi theo giờ
          </div>
          <div className="grid grid-cols-4 items-center gap-4 p-5">
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
                onChange={(event) => setCallcenter(event.value)}
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
                onChange={(event) => setExtension(event.value)}
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
        <div className="mt-2 p-4 bg-white rounded-2xl shadow">
          <HighchartsReact
            highcharts={Highcharts}
            options={DataIncomingCallHour}
          />
        </div>
      </div>
    </>
  );
};

export default outgoingCallHourReport;

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
