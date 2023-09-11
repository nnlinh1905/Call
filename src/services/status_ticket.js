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

const listStatusTickect = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`ticket-status`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addStatusTickect = async (request) => {
  try {
    const response = await axios.post(
      `ticket-status/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editStatusTickect = async (request) => {
  try {
    const response = await axios.post(
      `ticket-status/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const deleteStatusTickect = async (id) => {
  try {
    const response = await axios.post(
      `ticket-status/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

export { listStatusTickect, addStatusTickect, editStatusTickect, deleteStatusTickect };
