import { configAxios } from "../../api/config-http";

export const getCamera = async (data: any) => {
  const url = `/prod/api/v1/camera/list?page=${data?.page}&limit=${data?.limit}`;
  const result = await configAxios.get(url);
  return result.data;
};

export const getCameraHistory = async (data: any) => {
  const url = `/prod/api/v1/view/get_history?rtsp_url=${data?.rtsp_url}&date=${data?.date}&page=${data?.page}&limit=${data?.limit}`;
  const result = await configAxios.get(url);
  return result.data;
};
