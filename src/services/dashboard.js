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

const Widget = async (type_statistical) => {
  try {
    const response = await axios.get(
        `dashboard/get-data-statistical?type_statistical=${type_statistical}`,
      confix
    );
    return response.data;
  } catch (error) {}
};

const CallReport = async (request) => {
  try {
    console.log("request Nef: ", request);
    const response = await axios.get(
        `customers-care/load-data-dashboard?${
          !request.dateFrom ? "" : "dateFrom=" + request.dateFrom
        }&${!request.dateTo ? "" : "dateTo=" + request.dateTo}&${
          !request.extension ? "" : "extension=" + request.extension
        }&${!request.callCenter ? "" : "callCenter=" + request.callCenter}&${
          !request.status ? "" : "status=" + request.status
        }&${!request.agent ? "" : "agent=" + request.agent}`,
      confix
    );
    return response.data;
  } catch (error) {}
};

export { Widget, CallReport };
