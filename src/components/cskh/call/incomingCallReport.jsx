import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Select from "react-select";
import { Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MUIDataTable from "mui-datatables";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import PhoneDisabledOutlinedIcon from "@mui/icons-material/PhoneDisabledOutlined";
import MoreTimeOutlinedIcon from "@mui/icons-material/MoreTimeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import SettingsPhoneOutlinedIcon from "@mui/icons-material/SettingsPhoneOutlined";
import SnoozeOutlinedIcon from "@mui/icons-material/SnoozeOutlined";
import ShutterSpeedOutlinedIcon from "@mui/icons-material/ShutterSpeedOutlined";
import {
  dataIncoming,
  incomingCallReportAPI,
} from "../../../features/customerCareSlice";
import AudioPlayer from "react-audio-player";
import { dataUserSelect, ListUserApi } from "../../../features/usersSlice";

const incomingCallReport = () => {
  const [dataUser, setDataUser] = useState([]);
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
  const request = {
    dateFrom: dateFrom,
    dateTo: dateTo,
    callCenter: callCenter,
    extension: extension,
    status: status,
    agent: agent,
  };

  const handleSearch = () => {
    dispatch(incomingCallReportAPI(request));
  };
  const listUser = useSelector(dataUserSelect);
  const data = useSelector(dataIncoming);
  console.log(data);
  useEffect(() => {
    dispatch(incomingCallReportAPI(request));
    dispatch(ListUserApi());
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [data]);

  const handleConfixData = async () => {
    const arr = await data?.data?.data;
    const newArr = [];
    await (arr &&
      arr.length > 0 &&
      arr.map((item, index) => {
        let obj = {};
        obj.id = item.id;
        obj.creacted_at = moment(item.creacted_at).format("DD-MM-YYYY");
        obj.switchboardp_hone_number = item.called;
        obj.extension = item.agent_id;
        obj.phone = item.phone;
        obj.assistant_staff = item?.customer?.full_name;
        obj.call_time = item.talk_time_format;
        obj.call_status = item.status_name;
        obj.record = item.path;
        newArr.push(obj);
      }));
    setDataUser(newArr);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <div className="p-2 bg-[#f2f4f6] mt-2 rounded-2xl shadow">
        <div className="bg-white border w-full rounded-2xl shadow p-2 items-center">
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
                Đầu sô
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

        <div className="bg-white border w-full mt-2 rounded-2xl shadow p-5 grid grid-cols-4 items-center gap-3">
          <div className="col-span-1 grid grid-cols-6 items-center gap-4">
            <div className="col-span-1 bg-blue-100 rounded h-full w-full flex justify-center items-center">
              <PhoneInTalkOutlinedIcon className="text-blue-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">{data?.total}</div>
              <div className="text-xs text-gray-500">Tổng số cuộc gọi</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-6 items-center gap-4">
            <div className="col-span-1 bg-red-100 rounded h-full w-full flex justify-center items-center">
              <SettingsPhoneOutlinedIcon className="text-red-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">{data?.miss}</div>
              <div className="text-xs text-gray-500">Gọi nhỡ</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-6 items-center gap-4">
            <div className="col-span-1 bg-green-100 rounded h-full w-full flex justify-center items-center">
              <LocalPhoneOutlinedIcon className="text-green-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">{data?.busy}</div>
              <div className="text-xs text-gray-500">Trả lời</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-6 items-center gap-4">
            <div className="col-span-1 bg-orange-100 rounded h-full w-full flex justify-center items-center">
              <PhoneDisabledOutlinedIcon className="text-orange-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">{data?.cancel}</div>
              <div className="text-xs text-gray-500">Hủy</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-6 items-center gap-4">
            <div className="col-span-1 bg-green-100 rounded h-full w-full flex justify-center items-center">
              <MoreTimeOutlinedIcon className="text-green-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">{data?.total_time}</div>
              <div className="text-xs text-gray-500">Tổng thời gian gọi</div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-6 items-center gap-4">
            <div className="col-span-1 bg-green-100 rounded h-full w-full flex justify-center items-center">
              <ShutterSpeedOutlinedIcon className="text-green-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">
                {data?.total_time_avg}
              </div>
              <div className="text-xs text-gray-500">
                Tổng thời gian gọi trung bình
              </div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-6 items-center gap-4">
            <div className="col-span-1 bg-green-100 rounded h-full w-full flex justify-center items-center">
              <SnoozeOutlinedIcon className="text-green-700" />
            </div>
            <div className="col-span-5 flex flex-col">
              <div className="font-medium text-base">
                {data?.total_time_max}
              </div>
              <div className="text-xs text-gray-500">
                Thời gian gọi lâu nhất
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 border rounded-2xl">
          <MUIDataTable
            title={"Báo cáo cuộc gọi đến"}
            data={dataUser}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </>
  );
};

export default incomingCallReport;

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
    name: "creacted_at",
    label: "Ngày tạo",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "switchboardp_hone_number",
    label: "Số điện thoại tổng đài",
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
    name: "phone",
    label: "Số điện thoại",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "assistant_staff",
    label: "Khách hàng",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "call_time",
    label: "Thời gian gọi",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "call_status",
    label: "Trạng thái cuộc gọi",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "record",
    label: "Ghi âm",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <td className="flex">
            <AudioPlayer
              src={tableMeta.rowData[8]} // Đường dẫn đến file ghi âm của bạn
              autoPlay={false} // Tự động phát khi tải trang
              controls // Hiển thị thanh điều khiển
              onPlay={() => setIsPlaying(true)} // Xử lý sự kiện khi bắt đầu phát
              onPause={() => setIsPlaying(false)} // Xử lý sự kiện khi dừng phát
            />
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
