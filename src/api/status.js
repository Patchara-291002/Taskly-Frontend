import axios from "axios";
import { API_BASE_URL } from "./config";

// ✅ อัปเดตตำแหน่งของ Status
export const updateStatusPosition = async (statusId, projectId, position) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/status/update/position/${statusId}`, { projectId, position }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("❌ Error updating position status:", error);
        throw error;
    }
};

export const updateStatus = async (statusId, statusName, color, isDone) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/status/update/${statusId}`,
            {statusName, color, isDone},
            {withCredentials: true}
        )
        return response.data;
    } catch (error) {
        console.error("❌ Error updated status:", error);
        throw error;
    }
}


export const createStatus = async (projectId, statusName, color) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/status/create`, { projectId, statusName, color }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("❌ Error creating status:", error);
        throw error;
    }
};