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

const listCallNote = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`call-note`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addCallNote = async (request) => {
  try {
    const response = await axios.post(`call-note/store`, request, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const getCallNoteByCustomerId = async (id) => {
  try {
    const response = await axios.get(
      `call-note/get-all-call-note-by-customer-id/${id}`,
      confix
    );
    return response.data;
  } catch (error) {}
};

export { listCallNote, addCallNote, getCallNoteByCustomerId };
