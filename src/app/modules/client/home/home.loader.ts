import { useQuery } from "react-query";
import { getCamera, getCameraHistory } from "../../../services/index.service";

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
