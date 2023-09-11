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

const listCallPurpose = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`call-purpose`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addCallPurpose = async (request) => {
  try {
    const response = await axios.post(
      `call-purpose/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editCallPurpose = async (request) => {
  try {
    const response = await axios.post(
      `call-purpose/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const deleteCallPurpose = async (id) => {
  try {
    const response = await axios.post(
      `call-purpose/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

export { listCallPurpose, addCallPurpose, editCallPurpose, deleteCallPurpose };
