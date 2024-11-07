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
        if (data.access_token) {
          localStorage.setItem("jwtToken", data.access_token);
          localStorage.setItem("isLoginToken", "true");
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
