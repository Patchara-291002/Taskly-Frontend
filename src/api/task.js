import axios from "axios";
import { API_BASE_URL } from "./config";

// ✅ อัปเดตสถานะของ Task
export const updateTaskStatus = async (taskId, statusId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/task/update/status/${taskId}`, { statusId }, { withCredentials: true });
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
        const response = await axios.post(`${API_BASE_URL}/task/create`,
            {
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
            },
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error("❌ Error creating task:", error);
        throw error;
    }
};

// ✅ อัปเดตข้อมูล Task
export const updateTask = async (taskId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/task/update/${taskId}`, updatedData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error updating task:", error);
        throw error;
    }
};

export const getTaskById = async (taskId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/task/${taskId}`,
            {
                withCredentials:true
            }
        )
        return response.data
    } catch (error) {
        console.error("❌ Error fetching task:", error);
        throw error;
    }
}
