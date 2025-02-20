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

export const CreateCourse = async (courseName) => {
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