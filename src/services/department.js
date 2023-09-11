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

const listDepartment = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`departments`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addDepartment = async (request) => {
  try {
    const response = await axios.post(
      `departments/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editDepartment = async (request) => {
  try {
    const response = await axios.post(
      `departments/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const deleteDepartment = async (id) => {
  try {
    const response = await axios.post(
      `departments/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

export { listDepartment, addDepartment, editDepartment, deleteDepartment };
