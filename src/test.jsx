import React, { useEffect, useState } from "react";
import "./test.css";
import { useNavigate } from "react-router-dom";
const test = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2300);
  }, []);

  return (
    <div className="dev">
      <div className="Ani">Call Center xin chào !!!</div>
    </div>
  );
};

export default test;

{
  /* <div className="flex gap-8 justify-center">
        <div
          className="text-3xl font-bold text-red-400 underline cursor-pointer mr-2"
          onClick={() => SipCall()}
        >
          Gọi
        </div>

        <div
          className="text-3xl font-bold text-red-400 underline cursor-pointer mr-2"
          onClick={() => hangUp()}
        >
          Tắt
        </div>
      </div>
      <div>animation khi vào</div> */
}
