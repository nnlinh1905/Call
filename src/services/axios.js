import axios from "axios";
import _ from "lodash";

const instance = axios.create({
  baseURL: "https://apicallcenter.smartvcc.vn/api/",
});

instance.interceptors.response.use((response) => {
  const { data } = response;
  return response;
});

export default instance;
