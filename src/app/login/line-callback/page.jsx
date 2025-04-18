"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Cookies from 'js-cookie';

export default function LineCallback() {
    const router = useRouter();
    const { setUser } = useAuth();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleLineCallback = async () => {
            const token = searchParams.get("token");
            console.log("Received token:", token); // For debugging
            
            if (token) {
                // ใช้ js-cookie แทน document.cookie
                Cookies.set('token', token, { path: '/' });
                
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    
                    setUser(response.data.user);
                    console.log("LINE login successful:", response.data.user);
                    router.push("/home/dashboard");
                } catch (error) {
                    console.error("Failed to fetch user info:", error.response?.data || error.message);
                    router.push("/login?error=line_auth_failed");
                }
            } else {
                console.error("No token in URL params");
                router.push("/login?error=no_token");
            }
        };
        
        handleLineCallback();
    }, [router, setUser, searchParams]);
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4">กำลังเข้าสู่ระบบด้วย LINE...</p>
            </div>
        </div>
    );
}