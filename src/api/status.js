import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export const deleteStatus = async (statusId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/status/delete/${statusId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting status:", error);
        throw error;
    }
}