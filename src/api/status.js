import axios from "axios";
import { API_BASE_URL } from "./config";

export const updateStatusPosition = async (statusId, projectId, position) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/status/update/position/${statusId}`,
            {
                projectId,
                position
            },
            {
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        console.log("Error updated positon status", error);
        throw (error);
    }
}

export const createStatus = async ( projectId, statusName, color ) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/status/create`,
            {
                projectId,
                statusName,
                color
            },
            {
                withCredentials: true
            }
        )
        return response.data 
    } catch (error) {
        console.log("Error create status", error);
        throw (error);
    }
}