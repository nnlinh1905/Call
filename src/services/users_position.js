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

const listUserPosition = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`user-position`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const addUserPosition = async (request) => {
  try {
    const response = await axios.post(
      `user-position/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const editUserPosition = async (request) => {
  try {
    const response = await axios.post(
      `user-position/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const deleteUserPosition = async (id) => {
  try {
    const response = await axios.post(
      `user-position/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

export {
  listUserPosition,
  addUserPosition,
  editUserPosition,
  deleteUserPosition,
};
