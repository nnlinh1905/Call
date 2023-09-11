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

const listTypeTickect = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`ticket-types`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addTypeTickect = async (request) => {
  try {
    const response = await axios.post(
      `ticket-types/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editTypeTickect = async (request) => {
  try {
    const response = await axios.post(
      `ticket-types/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const deleteTypeTickect = async (id) => {
  try {
    const response = await axios.post(
      `ticket-types/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

export {
  listTypeTickect,
  addTypeTickect,
  editTypeTickect,
  deleteTypeTickect,
};
