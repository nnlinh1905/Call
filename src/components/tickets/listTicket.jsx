import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Excel from "../../assets/icon/excel.png";
import ModalAddTicket from "./modalAddTicket";
import TicketNumber from "../../assets/icon/ticketNumber.png";
import TicketNew from "../../assets/icon/ticket-new.png";
import TicketLoading from "../../assets/icon/ticket-loading.png";
import TicketDelete from "../../assets/icon/ticket-delete.png";
import Ticketing from "../../assets/icon/ticketsing.png";
import MUIDataTable from "mui-datatables";
import Delete from "../../assets/icon/delete.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTickectAPI,
  dataTicket,
  listTickectAPI,
} from "../../features/ticketSlice";
import ModataEditTicket from "./modalEditTicket";
import Edit from "../../assets/icon/edit.png";
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
const ListTicket = (props) => {
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
      name: "title",
      label: "Tên phiếu ghi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "topic",
      label: "Chủ đề",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ticket_type_id",
      label: "Loại phiếu ghi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "note",
      label: "Mô tả",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ticket_status_id",
      label: "Trạng thái phiếu ghi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "employee_id",
      label: "Nhân viên tiếp nhận",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "reminder_time",
      label: "Thời gian nhắc hẹn",
      options: {
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
            <td className="flex gap-4">
              <Button
                //   style={style}
                onClick={() => handleEdit(tableMeta.rowData[0])}
                variant="outlined"
              >
                <img src={Edit} alt="edit" className="w-5 h-5" />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(tableMeta.rowData[0])}
              >
                <img src={Delete} alt="delete" className="w-5 h-5" />
              </Button>
            </td>
          );
        },
      },
    },
  ];

  const [dataUser, setDataUser] = useState([]);
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const dispatch = useDispatch();
  const listTicket = useSelector(dataTicket);
  const handleDelete = (id) => {
    dispatch(deleteTickectAPI(id));
    setTimeout(() => {
      dispatch(listTickectAPI());
    }, 500);
  };
  useEffect(() => {
    dispatch(listTickectAPI());
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [listTicket]);

  const handleConfixData = async () => {
    const data = await listTicket.map((item) => {
      return {
        id: item?.id,
        title: item?.title,
        topic: item?.ticket_topic?.name,
        ticket_type_id: item?.ticket_type?.name,
        note: item?.note,
        ticket_status_id: item?.ticket_status?.name,
        employee_id: item?.ticket_employee?.full_name,
        reminder_time: item?.reminder_time,
      };
    });
    setDataUser(data);
  };

  const handleEdit = (id) => {
    setModal(true);
    setId(id);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {modal && <ModataEditTicket id={id} isOpen={isOpen} />}
      {props?.check == false ? (
        ""
      ) : (
        <>
          <div className="h-16 w-full bg-white rounded-2xl grid grid-cols-5 p-2 mb-2 px-4 shadow items-center">
            <div //
              className="col-span-1"
            >
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-center gap-4 px-3">
                  <img
                    src={TicketNumber}
                    className="w-5 border rounded-full bg-[#f6fcfc]"
                    alt=""
                  />
                  <div className="text-lg">87</div>
                </div>
                <div className="text-[#4fc2c5] text-[14px]">
                  Tổng số phiếu ghi
                </div>
              </div>
            </div>
            <div //
              className="col-span-1"
            >
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-center gap-4 px-3">
                  <img
                    src={TicketNew}
                    className="w-5 border rounded-full bg-[#f6fcf7]"
                    alt=""
                  />
                  <div className="text-lg">87</div>
                </div>
                <div className="text-green-600 text-[14px]">
                  Phiếu ghi mới tạo
                </div>
              </div>
            </div>
            <div //
              className="col-span-1 hidden"
            >
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-center gap-4 px-3">
                  <img
                    src={TicketLoading}
                    className="w-5 border rounded-full bg-[#fcf6f6]"
                    alt=""
                  />
                  <div className="text-lg">0</div>
                </div>
                <div className="text-red-500 text-[14px]">
                  Phiếu ghi đang xử lý
                </div>
              </div>
            </div>
            <div //
              className="col-span-1"
            >
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-center gap-4 px-3">
                  <img
                    src={TicketLoading}
                    className="w-5 border rounded-full bg-[#f6fbfc]"
                    alt=""
                  />
                  <div className="text-lg">87</div>
                </div>
                <div className="text-[#3bdaed] text-[14px]">
                  Phiếu ghi đang xử lý
                </div>
              </div>
            </div>
            <div //
              className="col-span-1"
            >
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-center gap-4 px-3">
                  <img
                    src={TicketDelete}
                    className="w-5 border rounded-full bg-[#fcfaf6]"
                    alt=""
                  />
                  <div className="text-lg">0</div>
                </div>
                <div className=" text-orange-500 text-[14px]">
                  Phiếu ghi đã hủy
                </div>
              </div>
            </div>
            <div //
              className="col-span-1"
            >
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-center gap-4 px-3">
                  <img
                    src={Ticketing}
                    className="w-5 border rounded-full bg-[#f6fcfc]"
                    alt=""
                  />
                  <div className="text-lg">44</div>
                </div>
                <div className="text-gray-500 text-[14px]">
                  Phiếu ghi xử lý trong hôm nay
                </div>
              </div>
            </div>
          </div>

          <div className="h-auto w-full bg-white rounded-2xl p-3 shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outlined"
                  style={{ borderRadius: "10px" }}
                  color="success"
                  endIcon={<img src={Excel} alt className="w-5" />}
                >
                  Tải lên
                </Button>
                <ModalAddTicket />
              </div>
              {/* <div className="relative rounded-lg shadow">
            <div className="absolute top-4 left-3">
              <SearchIcon className="text-gray-400" />
            </div>
            <input
              type="text"
              className="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
              placeholder="tìm kiếm..."
            />
            <div className="absolute top-2 right-2">
              <button className="h-10 w-20 text-white rounded-lg bg-[#2d50b2] hover:bg-[#20419c]">
                Search
              </button>
            </div>
          </div> */}
            </div>
          </div>
        </>
      )}
      <div className="h-auto mt-2">
        {/* <TableListTicket /> */}
        <MUIDataTable
          title={"Danh sách phiếu ghi yêu cầu"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default ListTicket;
