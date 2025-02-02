import axios from "axios";
import { API_BASE_URL } from "./config";

export const registerWithEmail = async (name, email, password) => {
    return axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password
    })
        .then(response => response.data)
        .catch(error => {
            console.log('register failed', error);
            throw error;
        })
}

export const verifyEmail = async (token) => {
    return axios.get(`${API_BASE_URL}/auth/verify-email`, {
        params: { token } // ต้องใช้ params แทน token ตรงๆ
    })
    .then(response => response.data)
    .catch(error => {
        console.log('Verify email failed:', error.response?.data || error.message);
        throw error;
    });
};