import { parseJSON } from "jquery";
import axios from "./axios";

let token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : false;

const confix = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

const CustomerSync = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(
      `fetch-data/customers/fetch/${request.src}/${request.giatri}`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const CustomerPotentialsSync = async (request) => {
  try {
    //console.log(confix);

    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : false;
    
    console.log("userInfo", userInfo);
    
    const response = await axios.get(
      `fetch-data/potentials/fetch/${request.src}/${userInfo.id}/${request.giatri}`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

export { CustomerSync, CustomerPotentialsSync };