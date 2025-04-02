'use client'

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { logout } from "@/api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/auth/me`, {
                    withCredentials: true
                })

                setUser(response.data.user);
            } catch (error) {
                console.log("Fetch user failed:", error.response?.data || error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [])

    const handleLogout = async () => {
        try {
            await logout(); 
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}   

export const useAuth = () => useContext(AuthContext);