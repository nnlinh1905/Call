import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/home/sidebar";
import NavbarHTML from "../components/home/navbar.jsx";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
export default function RouteAdmin() {
  return (
    <>
      <div className="h-screen p-1">
        <div className="h-full flex bg-white">
          <div className="h-full">
            <Sidebar />
          </div>
          <div className="h-full w-full">
            <NavbarHTML />
            {/* <div className="col-span-12 ">
              <div //contents
                className="w-full"
                style={{ height: "calc(100vh - 76px)" }}
              >
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/settings/*" element={<IndexSetting />} />
                  <Route path="/customer/*" element={<ListCustomer />} />
                  <Route path="/ticket/*" element={<IndexTicket />} />
                  <Route path="/user/*" element={<IndexUser />} />
                  <Route path="/category/*" element={<Category />} />
                  <Route path="/cskh/*" element={<CSKH />} />
                </Routes>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
