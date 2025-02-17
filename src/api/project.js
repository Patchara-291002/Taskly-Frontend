import axios from "axios";
import { API_BASE_URL } from "./config";

// ✅ เปลี่ยน API ให้ไม่ต้องใช้ userId ใน URL
export const fetchProjectsByUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/project/`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.log('Error fetch project', error);
        throw error;
    }
};

export const createProject = async (projectName, startDate, dueDate) => {
    return axios.post(`${API_BASE_URL}/project/create`, {
        projectName,
        startDate,
        dueDate
    }, {
        withCredentials: true,
    });
};

export const fetchProjectByProjectId = async (projectId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/project/${projectId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        throw error;
    }
};

// ✅ เพิ่ม API สำหรับเพิ่มผู้ใช้เข้า Project
export const addUserToProject = async (projectId, role) => {
    return axios.post(`${API_BASE_URL}/project/${projectId}/add-user`, {
        role, // ✅ ไม่ต้องส่ง userId เพราะ Backend ใช้ req.userId
    }, {
        withCredentials: true,
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error adding user to project:", error);
        throw error;
    });
};
