import React from "react";
import { Routes, Route } from "react-router-dom";
import ListCustomer from "./listCustomer";
import InfoCustomer from "./InfoCustomer";
const routeInfoCustomer = () => {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<ListCustomer />} />
        <Route path="/:id/*" element={<InfoCustomer />} />
      </Routes>
    </div>
  );
};

export default routeInfoCustomer;
