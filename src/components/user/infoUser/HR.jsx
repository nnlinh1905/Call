import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import NoImage from "../../../assets/icon/no-image.png";
import Fb from "../../../assets/icon/facebook.png";
import Skype from "../../../assets/icon/skype.png";
import Email from "../../../assets/icon/mail.png";
import PhoneBlack from "../../../assets/icon/phone_black.png";
import IconEmail from "../../../assets/icon/email.png";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import Gender from "../../../assets/icon/gender.png";
import { dataShowUser, showUserApi } from "../../../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import DrawerUpdate from "../drawerEditUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const HR = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const tmp = useSelector(dataShowUser);
  useEffect(() => {
    dispatch(showUserApi(props?.id));
  }, [props?.id]);

  // console.log(tmp);

  return (
    <>
      <div className="py-1 px-4 flex justify-between shadow bg-white rounded-2xl">
        <Button
          variant="outlined"
          size="smail"
          style={{
            background: "#2d50b2",
            color: "#ffffff",
            borderRadius: "10px",
          }}
          onClick={() => navigate("/system/user/list")}
        >
          <ArrowBackIcon />
        </Button>

        <DrawerUpdate id={props?.id} />
      </div>
      <div className="grid grid-cols-12 mt-2 gap-2">
        <div className="col-span-5">
          <div className="shadow bg-white rounded-2xl pb-4 h-auto max-h-[435px]">
            <div className="relative">
              <img
                src="https://demo.smartvcc.vn//assets/images/card_profile.png"
                alt=""
                className="rounded-t-2xl w-full h-24 object-cover"
              />
              <div className="flex justify-center">
                <div className="absolute flex justify">
                  <img
                    src={NoImage}
                    alt=""
                    className="bg-white border-4 border-solid border-gray-200 h-28 w-28 rounded-full -mt-14"
                  />
                </div>
              </div>
            </div>
            <div className="mt-14">
              <div className="flex justify-center text-xl text-gray-600">
                {tmp?.full_name}
              </div>
              <hr className="w-full mt-2" />
              <div className="flex justify-between items-center px-16 mt-4">
                <img src={Fb} alt="" className="h-6 w-6" />
                <img src={Skype} alt="" className="h-6 w-6" />
                <img src={Email} alt="" className="h-6 w-6" />
              </div>
              <div className="px-4 mt-4 ">
                <div className="grid grid-cols-12 border rounded-t-xl items-center">
                  <div className="col-span-1 py-2 pl-2">
                    <img src={IconEmail} alt="" className="h-5 w-5" />
                  </div>
                  <div className="col-span-11 py-2">{tmp?.email}</div>
                </div>
                <div className="grid grid-cols-12 border items-center">
                  <div className="col-span-1 py-2 pl-2">
                    <img src={PhoneBlack} alt="" className="h-5 w-5" />
                  </div>
                  <div className="col-span-11 py-2">{tmp?.phone}</div>
                </div>
                <div className="grid grid-cols-12 border items-center">
                  <div className="col-span-1 py-2 pl-2">
                    <AutoStoriesOutlinedIcon className="text-[18px] text-gray-400" />
                  </div>
                  <div className="col-span-11 py-2">
                    {tmp?.employess_detail?.education_id}
                  </div>
                </div>
                <div className="grid grid-cols-12 border rounded-b-xl items-center">
                  <div className="col-span-1 py-2 pl-2">
                    <img src={Gender} alt className="w-5 h-5" />
                  </div>
                  <div className="col-span-11 py-2">{tmp?.gender}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow bg-white rounded-2xl p-4 mt-2">
            <div className="text-xl text-gray-600 font-medium">
              Các phòng ban
            </div>
            <div className="mt-4 w-full"></div>
          </div>
        </div>

        <div className="col-span-7">
          <div className="shadow bg-white rounded-2xl p-4">
            <div className="text-xl text-gray-600 font-medium">
              Thông tin chung
            </div>
            <div className="mt-4 w-full">
              <table className="border w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Mã nhân viên</td>
                    <td>{tmp?.code}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Nhân viên</td>
                    <td>{tmp?.full_name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Giới tính</td>
                    <td>{tmp?.gender}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Ngày sinh</td>
                    <td>{tmp?.employess_detail?.birthday}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Ngày sinh</td>
                    <td>{tmp?.phone}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Nơi làm việc</td>
                    <td>{tmp?.employess_detail?.position_id}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Trạng thái</td>
                    <td>{tmp?.status?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Vị trí công việc</td>
                    <td>{tmp?.department?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Trình độ học vấn</td>
                    <td>{tmp?.employess_detail?.education_id}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Quốc gia</td>
                    {/* <td>{tmp?.employess_detail?.education_id}</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="shadow bg-white rounded-2xl p-4 mt-2">
            <div className="text-xl text-gray-600 font-medium">
              Thông tin liên quan
            </div>
            <div className="mt-4 w-full">
              <table className="border w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">CMND/Căn cước công dân</td>
                    {/* <td>{tmp?.code}</td> */}
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Ngày cấp</td>
                    {/* <td>{tmp?.full_name}</td> */}
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Nơi sinh</td>
                    {/* <td>{tmp?.gender}</td> */}
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Địa chỉ hiện tại</td>
                    {/* <td>{tmp?.employess_detail?.birthday}</td> */}
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Cư trú</td>
                    {/* <td>{tmp?.phone}</td> */}
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Nguyên quán</td>
                    {/* <td>{tmp?.employess_detail?.position_id}</td> */}
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Số tài khoản ngân hàng</td>
                    <td>{tmp?.status?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Tên tài khoản ngân hàng</td>
                    <td>{tmp?.department?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="w-2/5 py-2 pl-2">Mã số thuế cá nhân</td>
                    {/* <td>{tmp?.employess_detail?.education_id}</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HR;
