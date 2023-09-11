// import axios from "axios";

// const url = "http://cct.smartvcc.vn/api/";
import axios from "./axios";

let token = localStorage.getItem("token")?localStorage.getItem("token"):false;

const confix = {
  headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

const nations = async () => {
  try {
    //console.log(confix);
    const response = await axios.get(
      `administrative-units/nations`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const provinces = async () => {
  try {
    //console.log(confix);
    const response = await axios.get(
      `administrative-units/provinces`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const dictricts = async (id) => {
  //console.log(confix);
  try {
    const response = await axios.get(
      `administrative-units/districts?province_id=${id}`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

export { nations, provinces, dictricts };
