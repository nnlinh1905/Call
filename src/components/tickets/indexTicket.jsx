import React, { useState, useEffect } from "react";
import fullScreen from "../../assets/icon/full-screen.png";
import NoneScreen from "../../assets/icon/normal-screen.png";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import StatusTicket from "./tickets_status/listTicketsStatus";
import ListTicket from "./listTicket";
import List from "../../assets/icon/list.png";
import ListWhite from "../../assets/icon/list-white.png";
import Status from "../../assets/icon/status.png";
import StatusWhite from "../../assets/icon/status-white.png";
import Topic from "../../assets/icon/topic.png";
import TopicWhite from "../../assets/icon/topic_white.png";
import TopicTicket from "./tickets_topic/listTicketsTopic";
import TypeTicket from "./tickets_type/listTicketsType";
import Ticket_type from "../../assets/icon/ticket_type.png";
import Ticket_type_white from "../../assets/icon/ticket_type_white.png";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const indexTicket = () => {
  let location = useLocation();
  const [check, setcheck] = useState(true);
  const handleCheck = () => {
    setcheck(!check);
  };

  const [ticket, setticket] = useState(null);
  const openTicket = Boolean(ticket);

  const handleClickTicket = (event) => {
    setticket(event.currentTarget);
    // setcall(null);
  };
  return (
    <>
      <div className="pb-1 w-full h-full overflow-auto relative mt-2">
        <div className="h-auto w-full rounded-2xl gap-2 bg-[#f5f6fa] p-2">
          <Routes>
            <Route path="/" element={<ListTicket check={true} />} />
            <Route path="/ticket-status" element={<StatusTicket />} />
            <Route path="/ticket-topic" element={<TopicTicket />} />
            <Route path="/ticket-type" element={<TypeTicket />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default indexTicket;
