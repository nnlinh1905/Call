import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MiscellaneousServicesOutlinedIcon from "@mui/icons-material/MiscellaneousServicesOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import { dataWidget, WidgetAPI } from "../../features/dashboardSlice";
import { useSelector, useDispatch } from "react-redux";
import { Token } from "@mui/icons-material";
const widget = ({ type, tabWidget }) => {
  const dispatch = useDispatch();

  const Widget = useSelector(dataWidget);
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;
  useEffect(() => {
    if (token) {
      if (tabWidget) {
        dispatch(WidgetAPI(tabWidget));
      }
    }
  }, [tabWidget]);

  // console.log(Widget);

  let data = {};
  const amount = 100;
  const diff = 20;
  switch (type) {
    case "customer":
      data = {
        title: "KHÁCH HÀNG MỚI",
        isMoney: false,
        tang: Widget?.statistical_customer?.up,
        sl: Widget?.statistical_customer?.statistical_customer_current,
        phantramTang: Widget?.statistical_customer?.percent,
        link: <Link to="/system/customer/list">Tất cả khách hàng</Link>,
        icon: (
          <MiscellaneousServicesOutlinedIcon className="text-[18px] p-1 rounded-md self-end bg-yellow-200 text-yellow-600" />
        ),
      };
      break;
    case "client":
      data = {
        title: "NHÂN VIÊN MỚI",
        isMoney: false,
        tang: Widget?.statistical_employee?.up,
        sl: Widget?.statistical_employee?.statistical_employee_current,
        phantramTang: Widget?.statistical_employee?.percent,
        link: <Link to="/system/user/list">Tất cả nhân viên</Link>,
        icon: (
          <PersonOutlineOutlinedIcon className="text-[18px] p-1 rounded-md self-end bg-green-200 text-green-600" />
        ),
      };
      break;
    case "call":
      data = {
        title: "CUỘC GỌI MỚI",
        isMoney: false,
        tang: Widget?.statistical_history_call?.up,
        sl: Widget?.statistical_history_call?.statistical_history_call_current,
        phantramTang: Widget?.statistical_history_call?.percent,
        link: "Lịch sử cuộc gọi", //<Link to="/system/Phieu-Nhap"></Link>,
        icon: (
          <PersonOutlineOutlinedIcon className="text-[18px] p-1 rounded-md self-end bg-red-200 text-red-600" />
        ),
      };
      break;
    case "ticket":
      data = {
        title: "PHIẾU YÊU CẦU MỚI",
        isMoney: false,
        tang: Widget?.statistical_ticket?.up,
        sl: Widget?.statistical_ticket?.statistical_ticket_current,
        phantramTang: Widget?.statistical_ticket?.percent,
        link: <Link to="/system/ticket">"Tất cả phiếu yêu cầu"</Link>,
        icon: (
          <CurrencyExchangeOutlinedIcon className="text-[18px] p-1 rounded-md self-end bg-purple-200 text-purple-600" />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="flex justify-between flex-1 p-3 drop-shadow-lg shadow-md bg-white shadow-indigo-50 h-[130px] max-h-[130px] border-solid border-[0.5px] rounded">
      <div className="flex justify-between flex-col">
        <span className="font-bold text-md text-gray-500">{data.title}</span>
        <span className="text-[28px] font-light">
          {data.sl} {data.isMoney && "VNĐ"}
        </span>
        <span className="text-[12px] border-b border-solid border-gray-400 max-w-max">
          {data.link}
        </span>
      </div>
      <div className="flex justify-between flex-col">
        <div>
          {data.tang ? (
            <div
              className="flex items-center text-[14px]"
              style={{ color: "green" }}
            >
              <ExpandLessOutlinedIcon /> {data.phantramTang}%
            </div>
          ) : (
            <div
              className="flex items-center text-[14px]"
              style={{ color: "red" }}
            >
              <KeyboardArrowDownIcon fontSize="small" /> {data.phantramTang}%
            </div>
          )}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default widget;
