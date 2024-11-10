import axios from "axios";
import { API_BASE_URL } from "./config";

export const updateTaskStatus = async (taskId, statusId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/task/update/status/${taskId}`,
            {
                statusId
            },
            {
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        console.log("Error updated task status", error);
        throw (error);
    }
}

export const createTask = async ({
    statusId,
    taskName,
    detail,
    tag,
    priority,
    color,
    startDate,
    dueDate,
    startTime,
    dueTime,
    assignees
}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/task/create`,
            {
                statusId,
                taskName,
                detail,
                tag,
                priority,
                color,
                startDate,
                dueDate,
                startTime,
                dueTime,
                assignees
            },
            {
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        console.log("Error create task", error);
        throw (error);
    }
}