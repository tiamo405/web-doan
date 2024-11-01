import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getCamera,
  getCameraHistory,
  getVideoViolation,
  setViolocation,
} from "../../../services/index.service";
import { message } from "antd";

const CACHE_KEYS = {
  InforDataCamera: "INFOR_DATA_CAMERA",
};

export const useGetCamera = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataCamera, data], () => getCamera(data));
};

export const useGetCameraHistory = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataCamera, data], () =>
    getCameraHistory(data)
  );
};

export const useGetVideoViolation = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataCamera, data], () =>
    getVideoViolation(data)
  );
};

export const useSetViolation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return setViolocation(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataCamera);
        message.success("Set violation successfully!");
      },
      onError: () => {
        message.error("Set violation failed!");
      },
    }
  );
};
