import axios from "axios";
import { BASE_URL_BACKENT } from "../utils/api";

// const accessToken = localStorage.getItem("accessToken")
export const configAxios = axios.create({
  baseURL: BASE_URL_BACKENT,
  headers: {
    // 'Content-Type': 'application/json', #chỉ dùng khi gửi dữ liệu dạng json, nếu formData thì không cần
    // 'Access-Control-Allow-Origin': '*',
    // Authorization: `Bearer ${accessToken}`
  },
});

configAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// configAxios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response && error.response.status === 401) {
//       // Xóa token khỏi localStorage khi hết hạn hoặc không hợp lệ
//       localStorage.removeItem("token");
//       // Điều hướng đến trang đăng nhập
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
