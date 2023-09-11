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

const listCustomerGroup = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`customers-group`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addCustomerGroup = async (request) => {
  try {
    const response = await axios.post(
      `customers-group/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editCustomerGroup = async (request) => {
  try {
    const response = await axios.post(
      `customers-group/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const deleteCustomerGroup = async (id) => {
  try {
    const response = await axios.post(
      `customers-group/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

//Customer

const listCustomer = async () => {
  try {
    //console.log(confix);
    const response = await axios.get(`customers`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addCustomer = async (request) => {
  try {
    const response = await axios.post(`customers/store`, request, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editCustomer = async (request) => {
  try {
    const response = await axios.post(
      `customers/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const checkActive = async (request) => {
  try {
    const response = await axios.post(
      `customers/active-or-inActive/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const showCustomer = async (id) => {
  try {
    const response = await axios.get(`customers/show/${id}`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const sources = async (id) => {
  try {
    const response = await axios.get(`sources`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const sourcesUpdate = async (request) => {
  try {
    const response = await axios.post(
      `sources/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};
const sourcesAdd = async (request) => {
  try {
    const response = await axios.post(`sources/store`, request, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};
const sourcesDetele = async (id) => {
  try {
    const response = await axios.post(
      `sources/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const historyCustomer = async (id) => {
  try {
    const response = await axios.get(`customers/history/${id}`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const historyCustomerUpdate = async (request) => {
  try {
    const response = await axios.post(
      `customers/history/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const listCustomerPotential = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`customers-potential`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addCustomerPotential = async (request) => {
  try {
    const response = await axios.post(
      `customers-potential/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editCustomerPotential = async (request) => {
  try {
    const response = await axios.post(
      `customers-potential/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const deleteCustomerPotential = async (id) => {
  try {
    const response = await axios.post(
      `customers-potential/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const potentialCustomerToCustomer = async (request) => {
  try {
    
    const response = await axios.post(
      `customers-potential/transfer-customer/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const showCustomerPotential = async (id) => {
  try {
    const response = await axios.get(
      `customers-potential/show/${id}`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

//trạng thái

const listStatus = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(
      `customers-potential-status`,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const addStatus = async (request) => {
  try {
    const response = await axios.post(
      `customers-potential-status/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const editStatus = async (request) => {
  try {
    const response = await axios.post(
      `customers-potential-status/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

const deleteStatus = async (id) => {
  try {
    const response = await axios.post(
      `customers-potential-status/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {
    
  }
};

export {
  listCustomerGroup,
  addCustomerGroup,
  editCustomerGroup,
  deleteCustomerGroup,
  listCustomer,
  addCustomer,
  editCustomer,
  checkActive,
  showCustomer,
  sources,
  historyCustomer,
  historyCustomerUpdate,
  listCustomerPotential,
  addCustomerPotential,
  editCustomerPotential,
  deleteCustomerPotential,
  showCustomerPotential,
  listStatus,
  addStatus,
  editStatus,
  deleteStatus,
  potentialCustomerToCustomer,
  sourcesUpdate,
  sourcesAdd,
  sourcesDetele,
};
