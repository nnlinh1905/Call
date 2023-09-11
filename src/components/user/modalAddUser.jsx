import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AddUserApi } from "../../features/usersSlice";
import { useDispatch } from "react-redux";
const modalAddUser = () => {
  const [showModal, setShowModal] = useState(false);
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
    extentsion,
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
    //console.log(params);
    dispatch(AddUserApi(params));
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setShowModal(true)}>
        Thêm nhân viên
      </Button>
      {showModal ? (
        <>
          <div
            data-aos="fade-down"
            data-aos-delay="5000"
            data-aos-duration="1000"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-6xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                  <div className=" text-xl w-full text-[#2d50b2]">
                    Thêm nhân viên
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto">
                  <div className="my-4 text-slate-500 text-lg leading-relaxed grid grid-cols-4 gap-4 justify-center">
                    <TextField
                      className="col-span-2"
                      id="outlined-basic"
                      label="Mã nhân viên"
                      required
                      variant="outlined"
                      value={code}
                      size="small"
                      onChange={(event) => setCode(event.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Tên"
                      required
                      variant="outlined"
                      size="small"
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Họ"
                      required
                      variant="outlined"
                      size="small"
                      onChange={(event) => setLastName(event.target.value)}
                    />
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-label">
                        Giới Tính
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Giới tính"
                        value={gender_id}
                        onChange={(event) => setGenderId(event.target.value)}
                        size="small"
                      >
                        <MenuItem value="1">Nam</MenuItem>
                        <MenuItem value="2">Nữ</MenuItem>
                        <MenuItem value="3">Khác</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      id="date"
                      label="Ngày Sinh"
                      type="date"
                      onChange={(event) => setBirthday(event.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Số điện thoại"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setPhone(event.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      required
                      variant="outlined"
                      size="small"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                      className="col-span-2"
                      id="outlined-basic"
                      label="Mật khẩu"
                      required
                      variant="outlined"
                      size="small"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-label">
                        Phòng ban
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Phòng ban"
                        size="small"
                        value={department_id}
                        onChange={(event) =>
                          setDepartmentId(event.target.value)
                        }
                      >
                        <MenuItem value="1">Phòng Kĩ Thuật</MenuItem>
                        <MenuItem value="2">Phòng Hành Chính</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-label">
                        Trạng thái
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Trạng thái"
                        size="small"
                        value={status_id}
                        onChange={(event) => setStatusId(event.target.value)}
                      >
                        <MenuItem value="2">Đang làm việc</MenuItem>
                        <MenuItem value="1">Nghỉ thai sản</MenuItem>
                        <MenuItem value="1">Không làm việc</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-label">
                        Vị trí công việc
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Vị trí công việc"
                        size="small"
                        value={position_id}
                        onChange={(event) => setPositionId(event.target.value)}
                      >
                        <MenuItem value="1">Giám đốc</MenuItem>
                        <MenuItem value="2">Sale</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-label">
                        Trình độ học vấn
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Trình độ học vấn"
                        size="small"
                        value={education_id}
                        onChange={(event) => setEducationId(event.target.value)}
                      >
                        <MenuItem value="1">12/12</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-basic"
                      label="Extension - Số nội bộ"
                      required
                      variant="outlined"
                      size="small"
                      onChange={(event) => setExtentsion(event.target.value)}
                    />

                    <TextField
                      className="col-span-4"
                      size="small"
                      id="outlined-multiline-static"
                      label="Thông tin thêm"
                      onChange={(event) => setInfoMore(event.target.value)}
                      multiline
                      rows={3}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-2 p-[7px] border-t border-solid border-slate-200 rounded-b">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleSave()}
                  >
                    THÊM
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default modalAddUser;
