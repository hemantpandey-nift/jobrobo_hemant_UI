import axios from "axios";
import CONSTANTS from "../constants/constants";

const http = axios.create({
  baseURL: `${CONSTANTS.APP_API_URL}/api`,
});

http.interceptors.request.use(
  (config) => {
    const token = CONSTANTS.API_READ_ACCESS_TOKEN;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default http;
