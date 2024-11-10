import axios from "axios";
import { API_BASE_URL } from "./config";

export const fetchProjectsByUserId = async (userId) => {
    return axios.get(`${API_BASE_URL}/project/user/${userId}`, {
        withCredentials: true,
    })
        .then(response => response.data)
        .catch(error => {
            console.log('Error fetching projects by user ID:', error);
            throw error;
        })
}

export const createProject = async (projectName, startDate, dueDate) => {
    return axios.post(`${API_BASE_URL}/project/create`, {
        projectName,
        startDate,
        dueDate
    }, {
        withCredentials: true,
    })
}

export const fetchProjectByProjectId = async (projectId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/project/${projectId}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        throw error;
    }
}

// export const updateTaskStatus = async (taskId, newStatusId) => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/update/status/${taskId}`, { statusId: newStatusId });
//         return response.data;
//     } catch (error) {
//         console.error('Error updating task status:', error);
//         throw error;
//     }
// };