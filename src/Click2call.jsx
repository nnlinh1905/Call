import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ModalClick2Call from "./modalClick2Call";
import { Provider } from "react-redux";
import { store } from "./features/index";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ModalClick2Call />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("Click2call")
);
