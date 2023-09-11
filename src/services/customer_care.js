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

const incomingCallReport = async (request) => {
  try {
    const response = await axios.get(
        `customers-care/incoming-call?${
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

const outgoingCallReport = async (request) => {
  try {
    const response = await axios.get(
        `customers-care/outgoing-call?${
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

const incomingCallHourReport = async (request) => {
  try {
    const response = await axios.get(
        `customers-care/incoming-hour-call?${
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

const outgoingCallHourReport = async (request) => {
  try {
    const response = await axios.get(
        `customers-care/outgoing-hour-call?${
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

const callReportByQueue = async (request) => {
  try {
    const response = await axios.get(
        `customers-care/queue-call?${
          !request.dataFrom ? "" : "dataFrom=" + request.dataFrom
        }&${!request.dateTo ? "" : "dateTo=" + request.dateTo}&${
          !request.queue ? "" : "queue=" + request.queue
        }&${!request.status ? "" : "status=" + request.status}&${
          !request.extension ? "" : "extension=" + request.extension
        }
        `,
      confix
    );
    return response.data;
  } catch (error) {}
};

const reportOperatorCall = async (request) => {
  try {
    const response = await axios.get(
        `customers-care/extension-call?${
          !request.dateFrom ? "" : "dateFrom=" + request.dateFrom
        }&${!request.dateTo ? "" : "dateTo=" + request.dateTo}`,
      confix
    );
    return response.data;
  } catch (error) {}
};
const detaiNoAnswerCall = async (request) => {
  try {
    const response = await axios.get(
        `customers-care/detail-no-answer-call?
        ${!request.dateFrom ? "" : "dateFrom=" + request.dateFrom}&${
          !request.dateTo ? "" : "dateTo=" + request.dateTo
        }&${!request.queue ? "" : "queue=" + request.queue}&${
          !request.extension ? "" : "extension=" + request.extension
        }`,
      confix
    );
    return response.data;
  } catch (error) {}
};

const callistationPartions = async (request) => {
  try {
    const response = await axios.get(
        `customers-care/distribution-call?${
          !request.dateFrom ? "" : "dateFrom=" + request.dateFrom
        }&${!request.dateTo ? "" : "dateTo=" + request.dateTo}&${
          !request.queue ? "" : "queue=" + request.queue
        }&${!request.typeDate ? "" : "typeDate=" + request.typeDate}
        `,
      confix
    );
    return response.data;
  } catch (error) {}
};

export {
  incomingCallReport,
  outgoingCallReport,
  incomingCallHourReport,
  outgoingCallHourReport,
  callReportByQueue,
  reportOperatorCall,
  detaiNoAnswerCall,
  callistationPartions,
};
