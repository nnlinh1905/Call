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

const listTopicTickect = async (request) => {
  try {
    //console.log(confix);
    const response = await axios.get(`ticket-topics`, confix);
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const addTopicTickect = async (request) => {
  try {
    const response = await axios.post(
      `ticket-topics/store`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const editTopicTickect = async (request) => {
  try {
    const response = await axios.post(
      `ticket-topics/update/${request.id}`,
      request,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

const deleteTopicTickect = async (id) => {
  try {
    const response = await axios.post(
      `ticket-topics/destroy/${id}`,
      id,
      confix
    );
    //console.log(response.data);
    return response.data;
  } catch (error) {}
};

export {
  listTopicTickect,
  addTopicTickect,
  editTopicTickect,
  deleteTopicTickect,
};
