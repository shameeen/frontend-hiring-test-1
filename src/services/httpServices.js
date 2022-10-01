import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const setJwt = (jwt) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
};

const httpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default httpServices;
