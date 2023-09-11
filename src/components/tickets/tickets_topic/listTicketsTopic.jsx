import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import ModalAdd from "./modalAddTicketTopic";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTopicTickectAPI,
  dataTopicTicket,
  listTopicTickectAPI,
} from "../../../features/ticketTopicSlice";
import ModalEditTicketStatus from "./modalEditTicketTopic";
import Delete from "../../../assets/icon/delete.png";
import { Button } from "@mui/material";

const listTicketsTopic = () => {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();

  const tmp = useSelector(dataTopicTicket);

  console.log("tmp", tmp);
  useEffect(() => {
    dispatch(listTopicTickectAPI());
  }, []);

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
      name: "name",
      label: "Tên chủ đề",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status_check",
      label: "Cho phép hoạt động",
      options: {
        filter: true,
        display: false,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Hoạt động",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <td
              className="flex justify-start items-center gap-4"
              onClick={() =>
                handleCheckActive(tableMeta.rowData[0], tableMeta.rowData[8])
              }
              dangerouslySetInnerHTML={{ __html: value }}
            />
          );
        },
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
              <ModalEditTicketStatus item={tableMeta.rowData} />
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

  useEffect(() => {
    handleConfixData();
  }, [tmp]);

  const handleConfixData = async () => {
    const arrTmp = await tmp;

    const arr = [];
    let obj = {};
    arrTmp &&
      arrTmp.length > 0 &&
      arrTmp.map((element) => {
        obj = {};
        obj.id = element.id;
        obj.name = element.name;
        obj.status_check = element.status;
        obj.status =
          element.status == 1
            ? `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" defaultChecked>
  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>` + element.status_text
            : `<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer">
  <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>` + element.status_text;
        arr.push(obj);
      });
    setDataUser(arr);
  };

  const handleDelete = (id) => {
    dispatch(deleteTopicTickectAPI(id));
    setTimeout(() => {
      dispatch(listTopicTickectAPI());
    }, 500);
  };

  return (
    <>
      <div className="flex justify-start items-center gap-2 bg-white rounded-2xl p-2 shadow">
        <ModalAdd />
      </div>
      <div className="h-auto min-h-full w-full mb-2rounded-2xl mt-2">
        <MUIDataTable
          title={"Danh sách chủ đề"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default listTicketsTopic;
