import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ModalAddTicket from "./modalAddticket";
import { Provider } from "react-redux";
import { store } from "./features/index";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ModalAddTicket />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("modal_ticket")
);
