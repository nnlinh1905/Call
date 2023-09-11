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

const listAcademicLevel = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`academic-level`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const addAcademicLevel = async (request) => {
  try {
    const response = await axios.post(
      `academic-level/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const editAcademicLevel = async (request) => {
  try {
    const response = await axios.post(
      `academic-level/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const deleteAcademicLevel = async (id) => {
  try {
    const response = await axios.post(
      `academic-level/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

export {
  listAcademicLevel,
  addAcademicLevel,
  editAcademicLevel,
  deleteAcademicLevel,
};
