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

export const getVideoViolation = async (data: any) => {
  const url = `/prod/api/v1/view/get_history_video_violation?id_image_violation=${data?.id_image_violation}&page=${data?.page}&limit=${data?.limit}`;
  const result = await configAxios.get(url);
  return result.data;
};

export const setViolocation = async (data: any) => {
  const url = `/prod/api/v1/view/set_violation`;
  const result = await configAxios.post(url, data);
  return result.data;
};

export const getAllListViolation = async (data: any) => {
  const url = `/prod/api/v1/view/get_all_violation?location=${data?.location}&is_violation=${data?.is_violation}&page=${data?.page}&limit=${data?.limit}`;
  const result = await configAxios.get(url);
  return result.data;
};

export const getAllLocationCamera = async () => {
  const url = `/prod/api/v1/camera/get_all_location`;
  const result = await configAxios.get(url);
  return result.data;
};

export const addCamera = async (data: any) => {
  const url = `/prod/api/v1/camera/create`;
  const result = await configAxios.post(url, data);
  return result.data;
};

export const deleteCamera = async (data: any) => {
  const url = `/prod/api/v1/camera/remove?cam_id=${data?.cam_id}`;
  const result = await configAxios.delete(url);
  return result.data;
};

export const deleteViolation = async (data: any) => {
  const url = `/prod/api/v1/view/delete_violation?id_image=${data?.id_image}`;
  const result = await configAxios.delete(url);
  return result.data;
};

export const login = async(data:any) => {
  const url = `/login?`;
  const result = await configAxios.post(url, data);
  return result.data;
}

export const changeStatusCamera = async(data:any) => {
  const url = `/prod/api/v1/camera/change_is_active?cam_id=${data?.cam_id}&is_active=${data?.is_active}`;
  const result = await configAxios.post(url);
  return result.data;
}

export const editCamera = async(data:any) => {
  const url = `/prod/api/v1/camera/edit`;
  const result = await configAxios.put(url, data);
  return result.data;
}
