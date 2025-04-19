import api from '@/utils/api';

export const registerWithEmail = async (name, email, password) => {
    try {
        const response = await api.post('/auth/register', {
            name,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('❌ Register failed:', error.response?.data || error.message);
        throw error;
    }
}

export const verifyEmail = async (token) => {
    try {
        const response = await api.get('/auth/verify-email', {
            params: { token }
        });
        return response.data;
    } catch (error) {
        console.error('❌ Verify email failed:', error.response?.data || error.message);
        throw error;
    }
}

export const signInWithEmail = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('❌ Sign in failed:', error.response?.data || error.message);
        throw error;
    }
}

export const logout = async () => {
    try {
        await api.post('/auth/logout');
        console.log("✅ Logged out successfully.");
    } catch (error) {
        console.error("❌ Logout failed:", error.response?.data || error.message);
        throw error;
    }
}

export const signInWithGoogle = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, "_self");
}