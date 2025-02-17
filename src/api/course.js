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