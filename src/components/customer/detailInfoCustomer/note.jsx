import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  dataCallPurposeSelect,
  listCallPurposeAPI,
} from "../../../features/callPurposeSlice";

import {
  getAllCallNoteByCustomer,
  getCallNoteByCustomerIdAPI,
  addCallNoteAPI,
} from "../../../features/callNoteSlice";

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

const note = (props) => {
  const [dataUser, setDataUser] = useState([]);
  const [check, setCheck] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [purpose_id, setPurpose_id] = useState("");
  const [client_id, setClient_id] = useState("");
  const [customer_id, setCustomer_id] = useState("");
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
      name: "call_purpose",
      label: "Mục đích cuộc gọi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "title",
      label: "Tiêu đề",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "content",
      label: "Ghi chú",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "client",
      label: "Người tạo",
      options: {
        filter: true,
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
  const dispatch = useDispatch();
  const listCallPurpose = useSelector(dataCallPurposeSelect);
  const listCallNote = useSelector(getAllCallNoteByCustomer);
  useEffect(() => {
    dispatch(listCallPurposeAPI());
    dispatch(getCallNoteByCustomerIdAPI(props?.id));
  }, []);

  useEffect(() => {
    handleConfixData();
  }, [listCallNote]);

  const handleConfixData = async () => {
    const arrTmp = await listCallNote;
    const arr = [];
    let obj = {};
    arrTmp &&
      arrTmp.length > 0 &&
      arrTmp.map((element) => {
        obj = {};
        obj.id = element?.id;
        obj.title = element?.title;
        obj.call_purpose = element?.call_purpose?.name;
        obj.content = element?.content;
        obj.call_id = element?.call_id;
        obj.client = element?.client?.name;
        setCustomer_id(element?.customer_id);
        // obj.created_at = element?.creacted_at_date;
        arr.push(obj);
      });
    setDataUser(arr);
  };

  const handleSave = () => {
    const data = {
      title: title,
      content: content,
      purpose_id: purpose_id,
      customer_id: customer_id,
      client_id: props?.id,
    };

    dispatch(addCallNoteAPI(data));
    setTimeout(() => {
      dispatch(getCallNoteByCustomerIdAPI(props?.id));
    }, 500);

    setTimeout(() => {
      setCheck(false);
    }, 1000);
  };

  return (
    <>
      <div className="py-2 border-b px-4 w-full text-gray-600 font-medium flex justify-between items-center">
        <div className="">Ghi chú</div>
        <div className="">
          <Button
            startIcon={<Add />}
            onClick={() => setCheck(true)}
            className=""
            variant="outlined"
          >
            Ghi chú
          </Button>
        </div>
      </div>
      {check && (
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="p-4 flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mục đích cuộc gọi
              </label>
              <Select
                options={listCallPurpose}
                styles={customStyles}
                onChange={(e) => setPurpose_id(e.value)}
                isSearchable={true}
                isClearable={true}
              />
            </div>
            <div className="col-span-1 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Tiêu đề
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                // value={first_name}
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Nhập tiêu đề"
              />
            </div>
          </div>
          <div className="col-span-1 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Nội dung
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name=""
              id=""
              onChange={(event) => setContent(event.target.value)}
              cols="30"
              rows="4"
              placeholder="Nhập ghi chú"
            ></textarea>
          </div>
          <Button
            variant="outlined"
            style={{
              color: "#ffffff",
              backgroundColor: "#2d50b2",
              borderRadius: "10px",
            }}
            className="w-full"
            onClick={() => handleSave()}
          >
            Lưu lại
          </Button>
        </div>
      )}

      <div className="p-4">
        <MUIDataTable
          title={"Thêm ghi chú"}
          data={dataUser}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default note;
