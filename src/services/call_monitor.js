// import axios from "axios";

// const url = "http://cct.smartvcc.vn/api/";
import axios from "./axios";

let token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : false;

const confix = {
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

const callMonitor = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.post(
      `call-monitor/dashboard`,
      request,
      confix
    );
    return response.data;
  } catch (error) {}
};

const spyCall = async (request) => {
  try {
    //console.log(confix);
    console.log(request);
    const response = await axios.post(
      `call-monitor/spy-call`,
      request,
      confix
    );
    return response.data;
  } catch (error) {}
};

export { callMonitor, spyCall };
