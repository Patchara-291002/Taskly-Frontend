import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

axios.defaults.withCredentials = true;

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

export const signInWithEmail = async (email, password) => {
    return axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
    })
        .then(response => response.data)
        .catch(error => {
            console.log('Sign in failed:', error.response?.data || error.message)
            throw error;
        })
}

export const logout = async () => {
    return axios.post(`${API_BASE_URL}/auth/logout`)
        .then(() => {
            console.log("Logged out successfully.");
        })
        .catch(error => {
            console.log("Logout failed:", error.response?.data || error.message);
            throw error;
        });
};

export const signInWithGoogle = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
}
