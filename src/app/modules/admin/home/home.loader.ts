import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCamera,
  deleteCamera,
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
      onError: (err: any) => {
        message.error("Set violation failed!");
        console.log(
          "Đường ta đi có quý nhân phù trợ nên đoạn code này sẽ không được chạy: ",
          err
        );
      },
    }
  );
};

export const useAddCamera = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addCamera(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataCamera);
        message.success("Add camera successfully");
      },
      onError: (err: any) => {
        message.error("Add camera failed");
        console.log(
          "Đường ta đi có quý nhân phù trợ nên đoạn code này sẽ không được chạy: ",
          err
        );
      },
    }
  );
};

export const useDeleteCamera = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return deleteCamera(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforDataCamera);
        message.success("Delete camera successfully!");
      },
      onError: (err: any) => {
        message.error("Delete camera failed!");
        console.log(
          "Đường ta đi có quý nhân phù trợ nên đoạn code này sẽ không được chạy: ",
          err
        );
      },
    }
  );
};
