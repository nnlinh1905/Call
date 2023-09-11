import React, { useState, MouseEvent, useRef, useCallback } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ListNote from "./call/note/listNote";
import Dashboard from "./call/dashboard";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IncomingCallReport from "./call/incomingCallReport";
import OutgoingCallReport from "./call/outgoingcallreport";
import IncomingCallHourReport from "./call/incomingCallHourReport";
import OutgoingCallHourReport from "./call/outgoingCallHourReport";
import CallReportByQueue from "./call/callReportByQueue";
import ReportOperatorCall from "./call/reportOperatorCall";
import DetaiNoAnswerCall from "./call/detailNoAnswerCall";
import CallistationPartitions from "./call/callistationPartitions";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import IndexTicket from "./ticket/index";
const indexCSKH = () => {
  //menu

  const [call, setcall] = useState(null);
  const openCall = Boolean(call);
  const handleClick = (event) => {
    setcall(event.currentTarget);
    setticket(null);
  };
  const handleClose = () => {
    setcall(null);
  };

  const [ticket, setticket] = useState(null);
  const openTicket = Boolean(ticket);

  const handleClickTicket = (event) => {
    setticket(event.currentTarget);
    setcall(null);
  };

  const location = useLocation();
  console.log(
    "location.pathname.includes('call') > 0",
    location.pathname.includes("call")
  );

  console.log(location.pathname);
  return (
    <div className="pb-1 w-full h-full overflow-auto relative mt-2">
      <div className="h-auto w-full rounded-2xl gap-2">
        <Routes>
          <Route path="/call-note" element={<ListNote />} />
          <Route path="/" index element={<Dashboard />} />
          <Route
            path="/call-incoming-report"
            element={<IncomingCallReport />}
          />
          <Route
            path="/call-outgoing-report"
            element={<OutgoingCallReport />}
          />
          <Route
            path="/call-incoming-hour-report"
            element={<IncomingCallHourReport />}
          />
          <Route
            path="/call-outgoing-hour-report"
            element={<OutgoingCallHourReport />}
          />
          <Route path="/call-report-by-queue" element={<CallReportByQueue />} />
          <Route
            path="/call-report-operator"
            element={<ReportOperatorCall />}
          />
          <Route
            path="/call-detail-no-answer"
            element={<DetaiNoAnswerCall />}
          />
          <Route
            path="/call-callistation-partitions"
            element={<CallistationPartitions />}
          />
          <Route path="/ticket" element={<IndexTicket />} />
        </Routes>
      </div>
    </div>
  );
};

export default indexCSKH;
