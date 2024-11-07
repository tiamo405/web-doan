import axios from "axios";
import { BASE_URL_BACKENT } from "../utils/api";

export const configAxios = axios.create({
  baseURL: BASE_URL_BACKENT,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "true",
  },
});
configAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwtToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

configAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      // Kiểm tra mã lỗi
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 300);
      }
    }
    return Promise.reject(error);
  }
);
