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

const listTickect = async (request) => {
  try {
    const response = await axios.get(`tickets`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const showTickect = async (id) => {
  try {
    //console.log(confix);
    const response = await axios.get(`tickets/show/${id}`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addTickect = async (request) => {
  try {
    const response = await axios.post(`tickets/store`, request, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editTickect = async (request) => {
  try {
    const response = await axios.post(
      `tickets/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const deleteTickect = async (id) => {
  try {
    const response = await axios.post(
      `tickets/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const getTicketByCustomer = async (id) => {
  try {
    //console.log(confix);
    const response = await axios.get(
      `tickets/get-ticket-by-customer-id/${id}`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

export {
  listTickect,
  addTickect,
  editTickect,
  deleteTickect,
  showTickect,
  getTicketByCustomer,
};
