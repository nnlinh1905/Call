import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Delete from "../../assets/icon/delete.png";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { dataShowUser, showUserApi } from "../../features/usersSlice";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import HR from "./infoUser/HR";
import Contract from "./infoUser/contract";
const infoUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  let tmp = useSelector(dataShowUser);
  useEffect(() => {
    dispatch(showUserApi(id));
  }, [id]);
  return (
    <>
      <div className="h-auto max-h-24 bg-white rounded-2xl shadow">
        <div className="h-12 px-5 flex justify-between items-center">
          <div className="text-gray-500">
            #{id} {tmp?.full_name}
          </div>
          <Button variant="outlined" color="error">
            <img src={Delete} alt="" className="w-5 h-5" />
          </Button>
        </div>
        <div className="h-10 flex justify-start gap-5 px-4 py-2 border rounded-2xl shadow bg-indigo-50">
          <Link to={`/system/user/Administrators-individual/${id}`}>
            <div
              className={
                "flex gap-2 justify-center items-end  " +
                (location.pathname ===
                `/system/user/Administrators-individual/${id}`
                  ? "border-b border-indigo-500 text-[#2d50b2]"
                  : "text-gray-500")
              }
            >
              <PermIdentityIcon /> Hồ sơ nhân viên
            </div>
          </Link>
          <Link to={`/system/user/Administrators-individual/${id}/contract`}>
            <div
              className={
                "flex gap-2 justify-center items-end  " +
                (location.pathname ===
                `/system/user/Administrators-individual/${id}/contract`
                  ? " border-b border-indigo-500 text-[#2d50b2]"
                  : "text-gray-500")
              }
            >
              <ArticleOutlinedIcon /> Hợp đồng
            </div>
          </Link>
        </div>
      </div>
      <div className="h-auto mt-2">
        <Routes>
          <Route path="/" element={<HR id={id} />} />
          <Route path="/contract" element={<Contract id={id} />} />
        </Routes>
      </div>
    </>
  );
};

export default infoUser;
