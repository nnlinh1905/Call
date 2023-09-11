import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dataShowCustomer,
  showCustomerApi,
} from "../../features/customerSlice";
import Delete from "../../assets/icon/delete.png";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LockIcon from "@mui/icons-material/Lock";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Story from "./detailInfoCustomer/story";
import Contact from "./detailInfoCustomer/contact";
import Note from "./detailInfoCustomer/note";
import Tickets from "./detailInfoCustomer/tickets";
import HistoryCall from "./detailInfoCustomer/historyCall";
const InfoCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(dataShowCustomer);
  useEffect(() => {
    dispatch(showCustomerApi(id));
  }, [id]);

  const [name, setName] = useState("");
  // console.log(data);
  useEffect(() => {
    setName(data.full_name);
  }, [data]);

  const location = useLocation();
  return (
    <>
      <div className="h-auto max-h-24 bg-white rounded-2xl shadow">
        <div className="h-12 px-5 flex justify-between items-center">
          <div className="text-gray-500">
            #{id} {name}
          </div>
          <Button variant="outlined" color="error">
            <img src={Delete} alt="" className="w-5 h-5" />
          </Button>
        </div>
        <div className="h-10 flex justify-start gap-5 px-4 py-2 border rounded-2xl shadow bg-indigo-50">
          <Link to={`/system/customer/client-list/${id}/story`}>
            <div
              className={
                "flex gap-2 justify-center items-end  " +
                (location.pathname ===
                `/system/customer/client-list/${id}/story`
                  ? "border-b border-indigo-500 text-[#2d50b2]"
                  : "text-gray-500")
              }
            >
              <PermIdentityIcon /> Tiểu sử
            </div>
          </Link>
          <Link to={`/system/customer/client-list/${id}`}>
            <div
              className={
                "flex gap-2 justify-center items-end  " +
                (location.pathname === `/system/customer/client-list/${id}`
                  ? " border-b border-indigo-500 text-[#2d50b2]"
                  : "text-gray-500")
              }
            >
              <PeopleOutlineIcon /> Liên hệ
            </div>
          </Link>
          <Link to={`/system/customer/client-list/${id}/note`}>
            <div
              className={
                "flex gap-2 justify-center items-end  " +
                (location.pathname === `/system/customer/client-list/${id}/note`
                  ? " border-b border-indigo-500 text-[#2d50b2]"
                  : "text-gray-500")
              }
            >
              <EditNoteIcon /> Ghi chú
            </div>
          </Link>
          <Link to={`/system/customer/client-list/${id}/tickets`}>
            <div
              className={
                "flex gap-2 justify-center items-end  " +
                (location.pathname ===
                `/system/customer/client-list/${id}/tickets`
                  ? " border-b border-indigo-500 text-[#2d50b2]"
                  : "text-gray-500")
              }
            >
              <ConfirmationNumberIcon /> Tickets
            </div>
          </Link>
          <Link to={`/system/customer/client-list/${id}/historyCall`}>
            <div
              className={
                "flex gap-2 justify-center items-end  " +
                (location.pathname ===
                `/system/customer/client-list/${id}/historyCall`
                  ? " border-b border-indigo-500 text-[#2d50b2]"
                  : "text-gray-500")
              }
            >
              <PhoneForwardedIcon /> Lịch sử cuộc gọi
            </div>
          </Link>
        </div>
      </div>

      <div className="border h-auto mt-2 shadow bg-white rounded-2xl">
        <Routes>
          <Route path="/story" element={<Story id={id} />} />
          <Route path="/" element={<Contact id={id} />} />
          <Route path="/note" element={<Note id={id} />} />
          <Route path="/tickets" element={<Tickets id={id} />} />
          <Route path="/historyCall" element={<HistoryCall id={id} />} />
        </Routes>
      </div>
    </>
  );
};

export default InfoCustomer;
