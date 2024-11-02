import { useQuery } from "react-query";
import {
  getAllListViolation,
  getAllLocationCamera,
} from "../../../services/index.service";

const CACHE_KEYS = {
  InforDataViolation: "INFOR_DATA_VIOLATION",
};

export const useGetAllListViolation = (data: any) => {
  return useQuery([CACHE_KEYS.InforDataViolation, data], () =>
    getAllListViolation(data)
  );
};

export const useGetALlLocationCamera = () => {
  return useQuery([CACHE_KEYS.InforDataViolation], () =>
    getAllLocationCamera()
  );
};
