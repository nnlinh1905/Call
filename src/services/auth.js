// import axios from "axios";

// const url = "http://cct.smartvcc.vn/api/";

import axios from "./axios";

const url = import.meta.env.REACT_APP_BACKEND_URL;

const login = async (request) => {
  try {
    console.log("process.env.REACT_APP_BACKEND_URL", url);
    const response = await axios.post(`login`, request);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { login };
