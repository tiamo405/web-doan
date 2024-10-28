import { useQuery } from "react-query";
import { getCamera } from "../../../services/index.service";

const CACHE_KEYS = {
  InforDataCamera: "INFOR_DATA_CAMERA",
};

export const useGetCamera = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataCamera, data], () => getCamera(data));
};
