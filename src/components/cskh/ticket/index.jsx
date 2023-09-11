import React from "react";
import { Button } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ListTicket from "../../tickets/listTicket";
import ModalAddTicket from "../../tickets/modalAddTicket";
HighchartsExporting(Highcharts);
const options = {
  title: {
    text: "Thống kê yêu cầu hỗ trợ hàng tuần",
    style: {
      fontWeight: 400,
      fontSize: 14,
    },
  },
  credits: {
    enabled: false, // Disable the Highcharts credits
  },
  xAxis: {
    categories: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  },
  yAxis: {
    title: {
      text: "",
    },
  },
  series: [
    {
      name: "Ticket",
      data: [10, 15, 12, 8, 7, 9],
    },
  ],
};
const index = () => {
  return (
    <>
      <div className="p-2 bg-[#f2f4f6] mt-2 rounded-2xl shadow">
        <div className="bg-white border w-full rounded-2xl shadow p-2">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <ModalAddTicket />
            bộ lọc
          </div>
          <div className="">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>

        <div className="bg-white border w-full mt-2 rounded-2xl shadow p-5 grid grid-cols-6 items-center gap-3">
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-gray-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-gray-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-gray-700">Tổng cộng</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-green-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-green-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-green-700">Mở</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-yellow-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-yellow-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-yellow-500">Đang thực hiện</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-orange-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-orange-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-orange-700">Đã trả lời</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-blue-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-blue-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-blue-500">Tạm ngưng</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-red-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-red-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-red-700">Đóng</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-red-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-red-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-red-500">Quá hạn</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-green-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-green-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-green-500">Đã đạt được</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-7 items-center gap-4">
            <div className="col-span-2 bg-red-100 rounded h-full w-full flex justify-center items-center">
              <LocalActivityOutlinedIcon className="text-red-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">12</div>
              <div className="text-xs text-red-500">Không đạt</div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <ListTicket check={false} />
        </div>
      </div>
    </>
  );
};

export default index;
