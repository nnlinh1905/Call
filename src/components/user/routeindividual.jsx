import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// import ListUser from "./listUser";
import InfoUser from "./infoUser";

const routeInfoUser = () => {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/:id/*" element={<InfoUser />} />
      </Routes>
    </div>
  );
};

export default routeInfoUser;
