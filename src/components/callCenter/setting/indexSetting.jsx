import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Setting from "./setting";
import SettingPBX from "./settingPBX";
import SettingInfoCompany from "./settingInfoCompany";
import DataSettring from "./settringData";

const indexSetting = () => {
  let location = useLocation();
  return (
    <>
      <div className="pt-2 pb-1 h-full overflow-auto relative">
        <div className="h-auto min-h-full rounded-2xl bg-[#f5f6fa] grid grid-cols-10 gap-2">
          <div className="col-span-2 rounded-2xl bg-[#e7e9f2] h-full p-2 flex flex-col gap-2 shadow">
            <div className="h-2/4 w-full">
              <div className="text-center font-medium pb-1 border-b border-gray-300">
                Cài đặt cơ bản
              </div>
              <div //list
                className="w-full h-[92%]"
              >
                <Link to="/system/settings">
                  <div
                    className={
                      location.pathname == "/system/settings"
                        ? "py-3 w-full rounded-xl text-sm border px-2 my-1 bg-[#2b50b2] text-white shadow"
                        : "py-3 w-full rounded-xl text-sm border px-2 my-1 bg-white shadow-inner hover:bg-[#f5f6fa] hover:shadow"
                    }
                  >
                    Tổng quan
                  </div>
                </Link>
                <Link to="/system/settings/settings-company-information">
                  <div
                    className={
                      location.pathname ==
                      "/system/settings/settings-company-information"
                        ? "py-3 w-full rounded-xl text-sm border px-2 my-1 bg-[#2b50b2] text-white shadow"
                        : "py-3 w-full rounded-xl text-sm border px-2 my-1 bg-white shadow-inner hover:bg-[#f5f6fa] hover:shadow"
                    }
                  >
                    Thông tin công ty
                  </div>
                </Link>
                <Link to="/system/settings/settings-callcenter">
                  <div
                    className={
                      location.pathname ==
                      "/system/settings/settings-callcenter"
                        ? "py-3 w-full rounded-xl text-sm border px-2 my-1 bg-[#2b50b2] text-white shadow"
                        : "py-3 w-full rounded-xl text-sm border px-2 my-1 bg-white shadow-inner hover:bg-[#f5f6fa] hover:shadow"
                    }
                  >
                    Cài đặt tổng đài
                  </div>
                </Link>

                <Link to="/system/settings/settings-data">
                  <div
                    className={
                      location.pathname == "/system/settings/settings-data"
                        ? "py-3 w-full rounded-xl text-sm border px-2 my-1 bg-[#2b50b2] text-white shadow"
                        : "py-3 w-full rounded-xl text-sm border px-2 my-1 bg-white shadow-inner hover:bg-[#f5f6fa] hover:shadow"
                    }
                  >
                    Dữ liệu
                  </div>
                </Link>
              </div>
            </div>
            {/* <div className="h-2/4">
              <hr className="border-gray-300" />
              cài đặt nâng cao
            </div> */}
          </div>
          <div //content
            className="col-span-8"
          >
            <Routes>
              <Route path="/" index element={<Setting />} />
              <Route path="/settings-callcenter" element={<SettingPBX />} />
              <Route
                path="/settings-company-information"
                element={<SettingInfoCompany />}
              />
              <Route path="/settings-data" element={<DataSettring />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default indexSetting;
