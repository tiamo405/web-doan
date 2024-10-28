import { configAxios } from "../../api/config-http";


export const getCamera = async (data: any) => {
    const url = `/prod/api/v1/camera/list?page=${data?.page}&limit=${data?.limit}`;
    console.log("Calling API:", url); // Log URL để kiểm tra
    try {
        const result = await configAxios.get(url);
        console.log("API Result:", result.data); // Log kết quả nhận được
        return result.data;
    } catch (error) {
        console.error("API Error:", error); // Log lỗi nếu có
        throw error; // Để xử lý lỗi bên ngoài nếu cần
    }
}