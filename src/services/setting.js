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

const updatePBX = async (request) => {
  try {
    const response = await axios.post(
      `callcenter/update-settings-call-center`,
      request,
      confix
    );
    return response.data;
  } catch (error) {
    
  }
};

const showPBX = async () => {
  try {
    const response = await axios.get(
      `callcenter/settings-call-center`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const updateActive = async (request) => {
  try {
    const response = await axios.post(
      `callcenter/update-active-call-center`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const updateActiveClickToCall = async (request) => {
  try {
    const response = await axios.post(
      `callcenter/update-active-click-to-call`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const ShowByPhone = async (request) => {
  try {
    const response = await axios.get(
      url +
        `callcenter/show-by-phone?phone=${request.phone}&all=${request.all}`,
      confix
    );

    // console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

export {
  updatePBX,
  showPBX,
  updateActive,
  ShowByPhone,
  updateActiveClickToCall,
};
