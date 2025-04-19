import api from '@/utils/api';

// ✅ อัปเดตสถานะของ Task
export const updateTaskStatus = async (taskId, statusId) => {
    try {
        const response = await api.put(
            `/task/update/status/${taskId}`, 
            { statusId }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Error updating task status:", error);
        throw error;
    }
};

// ✅ สร้าง Task พร้อมเช็คค่า statusId ถ้าไม่มีให้ใช้ค่า Default
export const createTask = async ({
    projectId,
    statusId,
    startDate,
    dueDate,
    startTime,
    dueTime,
    assignees
}) => {
    try {
        const response = await api.post('/task/create', {
            projectId,
            statusId,
            taskName: "Empty",
            detail: "Empty",
            priority: 1,
            startDate,
            dueDate,
            startTime,
            dueTime,
            assignees
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error creating task:", error);
        throw error;
    }
};

// ✅ อัปเดตข้อมูล Task
export const updateTask = async (taskId, updatedData) => {
    try {
        const response = await api.put(`/task/update/${taskId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating task:", error);
        throw error;
    }
};

export const getTaskById = async (taskId) => {
    try {
        const response = await api.get(`/task/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching task:", error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/task/delete/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting task:", error);
        throw error;
    }
};