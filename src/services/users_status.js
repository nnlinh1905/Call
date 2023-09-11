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

const listUserStatus = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`user-status`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const addUserStatus = async (request) => {
  try {
    const response = await axios.post(
      `user-status/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const editUserStatus = async (request) => {
  try {
    const response = await axios.post(
      `user-status/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const deleteUserStatus = async (id) => {
  try {
    const response = await axios.post(
      `user-status/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

export { listUserStatus, addUserStatus, editUserStatus, deleteUserStatus };
