import api from '@/utils/api';

// ✅ อัปเดตตำแหน่งของ Status
export const updateStatusPosition = async (statusId, projectId, position) => {
    try {
        const response = await api.put(
            `/status/update/position/${statusId}`, 
            { projectId, position }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Error updating position status:", error);
        throw error;
    }
};

export const updateStatus = async (statusId, statusName, color, isDone) => {
    try {
        const response = await api.put(
            `/status/update/${statusId}`,
            { statusName, color, isDone }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Error updated status:", error);
        throw error;
    }
};

export const createStatus = async (projectId, statusName, color) => {
    try {
        const response = await api.post(
            '/status/create', 
            { projectId, statusName, color }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Error creating status:", error);
        throw error;
    }
};

export const deleteStatus = async (statusId) => {
    try {
        const response = await api.delete(`/status/delete/${statusId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting status:", error);
        throw error;
    }
};