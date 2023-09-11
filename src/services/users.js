// import axios from "axios";

// const url = "http://cct.smartvcc.vn/api/";
import axios from "./axios";
let token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : false;
const confix = {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
};
const ListUser = async (request) => {
  try {
    const response = await axios.get(`employees`, confix);
    return response.data;
  } catch (error) {}
};

const AddUser = async (request) => {
  try {
    const response = await axios.post(`employees/store`, request, confix);
    //console.log("response", response.data);
    return response.data;
  } catch (error) {}
};

const CheckIsLogin = async (request) => {
  try {
    const response = await axios.post(
      `employees/permission-login/${request.id}`,
      request,
      confix
    );
    //console.log("response", response.data);
    return response.data;
  } catch (error) {}
};

const showUser = async (id) => {
  try {
    const response = await axios.get(`employees/show/${id}`, confix);
    //console.log("response", response.data);
    return response.data;
  } catch (error) {}
};

const updateUser = async (request) => {
  try {
    const response = await axios.post(
      `employees/update/${request.id}`,
      request,
      confix
    );
    //console.log("response", response.data);
    return response.data;
  } catch (error) {}
};

const deleteUser = async (id) => {
  try {
    const response = await axios.post(
      `employees/destroy/${id}`,
      id,
      confix
    );
    //console.log("response", response.data);
    return response.data;
  } catch (error) {}
};

export { ListUser, AddUser, CheckIsLogin, showUser, updateUser, deleteUser };
