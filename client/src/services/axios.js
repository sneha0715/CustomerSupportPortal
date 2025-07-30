import axios from "axios";
import { getToken } from "../utils/localStorage";
const baseURL = `${
  import.meta.env.VITE_PRODUCTION_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3000"
}/api`;
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;