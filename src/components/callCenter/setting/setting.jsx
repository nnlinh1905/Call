import React, { useState } from "react";
import Logo from "../../../assets/logo/logo.png";
import { Button } from "@mui/material";
const setting = () => {
  return (
    <>
      <div className="p-2 h-auto relative">
        <div className="px-2 ">
          <div className=" font-medium text-sm">Logo công ty</div>
          <div className="w-full bg-white border border-solid h-32 mt-2 rounded-2xl shadow flex justify-center items-center">
            <img
              src="https://demo.smartvcc.vn/uploads/company/83a019d037d001de077661d46e1e3fae.png"
              alt=""
              className="w-32 max-h-40"
            />
          </div>
        </div>
        <div className="px-2 mt-4">
          <div className=" font-medium text-sm">Logo màu tối</div>
          <div className="w-full bg-white border border-solid h-32 mt-2 rounded-2xl shadow flex justify-center items-center">
            <img
              src="https://demo.smartvcc.vn/uploads/company/83a019d037d001de077661d46e1e3fae.png"
              alt=""
              className="w-32 max-h-40"
            />
          </div>
        </div>
        <div className="px-2 mt-4">
          <div className=" font-medium text-sm">Favicon</div>
          <div className="w-full bg-white border border-solid h-32 mt-2 rounded-2xl shadow flex justify-center items-center">
            <img
              src="https://demo.smartvcc.vn/uploads/company/83a019d037d001de077661d46e1e3fae.png"
              alt=""
              className="w-20 max-h-32"
            />
          </div>
        </div>
        <div className="px-2 mt-4">
          <div className=" font-medium text-sm">Logo sidebar menu</div>
          <div className="w-full bg-white border border-solid h-32 mt-2 rounded-2xl shadow flex justify-center items-center">
            <img
              src="https://demo.smartvcc.vn/uploads/company/83a019d037d001de077661d46e1e3fae.png"
              alt=""
              className="w-32 max-h-40"
            />
          </div>
        </div>
        <div className="px-2 mt-6 flex items-center gap-4 mb-4">
          <div className="w-2/4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="first_name"
            >
              Tên công ty
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first_name"
              type="text"
              // onChange={(event) => setname(event.target.value)}
              placeholder="Nhập tên nhóm"
            />
          </div>
          <div className="w-2/4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tenmien"
            >
              Tên miền chính công ty
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tenmien"
              type="text"
              // onChange={(event) => setname(event.target.value)}
              placeholder="Nhập tên nhóm"
            />
          </div>
        </div>

        <div className="sticky bottom-0 w-full h-14 bg-white flex justify-center items-center border shadow">
          <Button
            style={{
              background: "#2d50b2",
              color: "white",
              borderRadius: "10px",
              marginTop: "2px",
            }}
          >
            Thêm mới
          </Button>
        </div>
      </div>
    </>
  );
};

export default setting;
