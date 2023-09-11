import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AddUserApi, ListUserApi } from "../../features/usersSlice";
import {
  dataDepartmentSelect,
  listDepartmentAPI,
} from "../../features/departmentSlice";
import Select from "react-select";
import {
  dataUserPositionSelect,
  listUserPositionAPI,
} from "../../features/usersPositionSlice";

import {
  dataAcademicLevelSelect,
  listAcademicLevelAPI,
} from "../../features/usersAcademicLevelSlice";

import {
  dataUserStatusSelect,
  listUserStatusAPI,
} from "../../features/usersStatusSlice";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const drawerAddUser = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [extentsion, setExtentsion] = useState("");
  const [status_id, setStatusId] = useState("");
  const [code, setCode] = useState("");
  const [gender_id, setGenderId] = useState("");
  const [department_id, setDepartmentId] = useState("");
  const [birthday, setBirthday] = useState("");
  const [info_more, setInfoMore] = useState("");
  const [education_id, setEducationId] = useState("");
  const [position_id, setPositionId] = useState("");

  const params = {
    password,
    phone,
    email,
    first_name,
    last_name,
    extension: extentsion,
    status_id,
    code,
    gender_id,
    department_id,
    info_more,
    position_id,
    education_id,
    birthday,
    avatar: "tmp",
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    if (!code || !first_name || !last_name || !phone || !email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin cần thiết!");
    } else {
      dispatch(AddUserApi(params));
      setIsOpen(false);
      dispatch(ListUserApi());
    }
  };

  //tab
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let listDepartment = useSelector(dataDepartmentSelect);
  let listUserPosition = useSelector(dataUserPositionSelect);
  let listUserAcademicLevel = useSelector(dataAcademicLevelSelect);
  let listUserStatus = useSelector(dataUserStatusSelect);
  //console.log("listDepartment", listDepartment);
  useEffect(() => {
    dispatch(listDepartmentAPI());
    dispatch(listUserPositionAPI());
    dispatch(listAcademicLevelAPI());
    dispatch(listUserStatusAPI());
  }, [isOpen]);

  const style = {
    backgroundColor: "#2d50b2",
    color: "white",
    borderRadius: "10px",
  };

  const sex = [
    { value: 1, label: "Nam" },
    { value: 2, label: "Nữ" },
    { value: 3, label: "Khác" },
  ];
  return (
    <>
      <header className="flex justify-end">
        <Button
          style={style}
          onClick={() => setIsOpen(true)}
          variant="outlined"
        >
          Thêm nhân viên
        </Button>
      </header>
      <main
        className={
          "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out" +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-200 opacity-0 translate-x-full")
        }
      >
        <section
          className={
            "w-screen right-0 top-1 rounded-xl border-l border-gray-400 absolute bg-transparent h-full max-w-2xl shadow-2xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative w-screen flex flex-col overflow-y-scroll h-full max-w-2xl">
            <div className="flex justify-between items-center">
              <div className="p-2 px-10 font-semibold text-lg bg-[#f5f6fa] rounded-t-xl">
                <div className="">Thêm nhân viên mới</div>
              </div>
              <div className="font-bold text-lg bg-[#f5f6fa] rounded-md mr-6 mt-2">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="text"
                  size="small"
                >
                  <ClearIcon />
                </Button>
              </div>
            </div>
            <div //content
              className="p-4 bg-[#f5f6fa] border-t-4 border-4 h-full"
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Tiểu sử" {...a11yProps(0)} />
                    <Tab label="Thông tin liên quan" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div className="relative flex-auto">
                    <div className="text-slate-500 text-sm leading-relaxed grid grid-cols-2 gap-5 justify-center">
                      <div className="col-span-1 row-span-3 flex justify-center items-center flex-col gap-2">
                        <div className="!h-36 !w-36 border rounded-full flex justify-center items-center">
                          ảnh đại diện
                        </div>
                        Thêm ảnh đại diện
                      </div>
                      <div className="col-span-1 w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="id_nhan"
                        >
                          Mã nhân viên
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="id_nhan"
                          value={code}
                          type="text"
                          onChange={(event) => setCode(event.target.value)}
                          placeholder="Nhập mã nhân viên"
                        />
                      </div>
                      <div className="col-span-1 w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="frist_name"
                        >
                          Họ
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="frist_name"
                          value={first_name}
                          type="text"
                          onChange={(event) => setFirstName(event.target.value)}
                          placeholder="Nhập họ nhân viên"
                        />
                      </div>
                      <div className="col-span-1 w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="last_name"
                        >
                          Tên
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="last_name"
                          value={last_name}
                          type="text"
                          onChange={(event) => setLastName(event.target.value)}
                          placeholder="Nhập tên nhân viên"
                        />
                      </div>
                      <div className="col-span-1 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Giới tính
                        </label>
                        <Select
                          value={sex.filter((item) => item.value == gender_id)}
                          options={sex}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="col-span-1 w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Số điện thoại
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          value={phone}
                          type="text"
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                      <div className="col-span-1 w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          value={email}
                          type="text"
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="Nhập email"
                        />
                      </div>
                      <div className="col-span-1 w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="password"
                        >
                          Mật khẩu
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="password"
                          value={password}
                          type="password"
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Nhập mật khẩu"
                        />
                      </div>
                      <div className="col-span-1 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Trạng thái
                        </label>
                        <Select
                          value={listUserStatus.filter(
                            (item) => item.value == status_id
                          )}
                          onChange={(event) => setStatusId(event.value)}
                          options={listUserStatus}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="col-span-1 w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="extention"
                        >
                          Extension - Số nội bộ
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="extention"
                          value={extentsion}
                          type="text"
                          onChange={(event) =>
                            setExtentsion(event.target.value)
                          }
                          placeholder="Nhập extension - số nội bộ"
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="relative flex-auto">
                    <div className="text-slate-500 text-sm leading-relaxed grid grid-cols-1 gap-5 justify-center">
                      <div className="w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="birthday"
                        >
                          Ngày sinh
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="birthday"
                          value={birthday}
                          type="date"
                          onChange={(event) => setBirthday(event.target.value)}
                          placeholder="Nhập ngày sinh"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Phòng ban
                        </label>
                        <Select
                          value={listDepartment.filter(
                            (item) => item.value == department_id
                          )}
                          onChange={(event) => setDepartmentId(event.value)}
                          options={listDepartment}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Vị trí công việc
                        </label>
                        <Select
                          value={listUserPosition.filter(
                            (item) => item.value == position_id
                          )}
                          onChange={(event) => setPositionId(event.value)}
                          options={listUserPosition}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Trình độ học vấn
                        </label>
                        <Select
                          value={listUserAcademicLevel.filter(
                            (item) => item.value == education_id
                          )}
                          onChange={(event) => setEducationId(event.value)}
                          options={listUserAcademicLevel}
                          styles={customStyles}
                          isSearchable={true}
                          isClearable={true}
                        />
                      </div>
                      <div className="w-full">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="info_more"
                        >
                          Thông tin thêm
                        </label>
                        <textarea
                          name=""
                          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id=""
                          value={info_more}
                          cols="30"
                          rows="3"
                          onChange={(event) => setInfoMore(event.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Box>
            </div>
            <div className="fixed bottom-0 h-12 border-t border-gray-400 flex justify-center items-center gap-4 shadow-xl w-full bg-white rounded-t-lg">
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setIsOpen(false)}
              >
                Đóng
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleSave()}
              >
                THÊM
              </Button>
            </div>
          </article>
        </section>
        <section
          className="w-screen h-full cursor-pointer "
          onClick={() => {
            setIsOpen(false);
          }}
        ></section>
      </main>
    </>
  );
};

export default drawerAddUser;
