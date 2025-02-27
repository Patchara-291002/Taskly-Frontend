import axios from "axios";
import { API_BASE_URL } from "./config";

export const fetchCourse = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/course`, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
}

export const fetchCourseById = async (courseId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/course/${courseId}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error("Error fetching courses by Id:", error);
        throw error;
    }
}

export const deleteCourseById = async (courseId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/course/delete/${courseId}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error("Error deleted courses by Id:", error);
        throw error;
    }
}

export const updateCourseById = async (courseId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/course/update/${courseId}`, updatedData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error updating course:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchAssignment = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/assignment`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error("Error fetching assignment:", error);
        throw error;
    }
}

export const createCourse = async (courseName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/course/create`, {
            courseName
        }, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.error("Error create course:", error);
        throw error;
    }
}

export const createContent = async (courseId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/course/create-content/${courseId}`,
            {
                withCredentials: true
            })
        return response.data
    } catch (error) {
        console.error('Error create content', error)
        throw error;
    };
}

export const uploadFileToCourse = async (courseId, file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(`${API_BASE_URL}/course/upload-file/${courseId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        )
        return response.data;
    } catch (error) {
        console.error("❌ Error uploading file:", error);
        throw error;
    }
}

// Assignment

export const createAssignment = async (courseId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/assignment/create`,
            {
                courseId,
                assignmentName: "New assignment",
                description: "Empty",
                status: "Todo",
                startDate: "",
                endDate: ""
            },
            {
                withCredentials: true
            }
        )
        return response.data
    } catch (error) {
        console.error("❌ Error creating assignment:", error);
        throw error;
    }
}

export const updateAssignment = async (assignmentId, assignmentName, description, status, startDate, endDate) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/assignment/update/${assignmentId}`,
            {
                assignmentName,
                description,
                status,
                startDate,
                endDate
            },
            {
                withCredentials: true
            }
        )
        return response.data;
    }
    catch (error) {
        console.error("❌ Error updating assignment:", error);
        throw error;
    }
}