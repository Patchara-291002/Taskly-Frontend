'use client'

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { logout } from "@/api/auth";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const token = Cookies.get('token');

                if (!token) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                Cookies.remove('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [])

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            router.push("/login"); // แทนที่ redirect
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