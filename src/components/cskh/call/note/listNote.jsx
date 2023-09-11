import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import {
  dataCallNote,
  listCallNoteAPI,
} from "../../../../features/callNoteSlice";
const listNote = () => {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();

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
      name: "call_id",
      label: "id cuộc gọi",
      options: {
        filter: true,
        display: false,
        sort: false,
      },
    },
    {
      name: "title",
      label: "tiêu đề",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "purpose",
      label: "Mục đích cuộc gọi",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "content",
      label: "Nội dung",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "customer",
      label: "Khách hàng",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "client",
      label: "người nhận",
      options: {
        filter: true,
        display: false,
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
    selectableRows: "multiple",
  };
  const tmp = useSelector(dataCallNote);
  useEffect(() => {
    dispatch(listCallNoteAPI());
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [tmp]);

  const handleConfixData = async () => {
    const arrTmp = await tmp;
    const list = [];
    await (arrTmp &&
      arrTmp.length > 0 &&
      arrTmp.map((item) => {
        let obj = {};
        (obj.id = item?.id),
          (obj.title = item?.title),
          (obj.purpose = item?.call_purpose?.name),
          (obj.content = item?.content),
          (obj.customer = item?.custommer?.full_name),
          (obj.client = item?.client?.name),
          (obj.call_id = item?.call_id),
          list.push(obj);
      }));
    setDataUser(list);
  };

  return (
    <>
      <div className="h-auto w-full mt-2 rounded-2xl p-2 shadow bg-[#f2f4f6]">
        <MUIDataTable
          title={"Danh sách ghi chú cuộc gọi"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default listNote;
