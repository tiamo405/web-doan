import { useMutation, useQueryClient } from "react-query";
import { login } from "../../../services/index.service";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const CACHE_KEYS = {
  InforLogin: "INFOR_LOGIN",
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    (data: any) => {
      return login(data);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        
        if (data.access_token) {
          localStorage.setItem("jwtToken", data.access_token);
          localStorage.setItem("isLoginToken", "true");
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("phoneNumber", data.user.phoneNumber);
          localStorage.setItem("full_name", data.user.full_name);
          localStorage.setItem("role_id", data.user.role_id);
        }
        queryClient.invalidateQueries(CACHE_KEYS.InforLogin);
        message.success("Login successfully");
        navigate("/");
      },
      onError: () => {
        message.error("Login failed");
      },
    }
  );
};
