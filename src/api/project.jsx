import axios from "axios";
import { API_BASE_URL } from "./config";

export const fetchProjectsByUserId = (userId) => {
    
    return axios.get(`${API_BASE_URL}/project/user/${userId}`, {
        withCredentials: true,
    })
        .then(response => response.data)
        .catch(error => {
            console.log('Error fetching projects by user ID:', error);
            throw error;
        })
}