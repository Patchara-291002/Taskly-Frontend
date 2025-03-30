"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function LineCallback() {
    const router = useRouter();
    const { setUser } = useAuth();

    useEffect(() => {
        const handleLineCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            
            if (token) {
                // ✅ เก็บ Token ใน Cookies
                document.cookie = `token=${token}; path=/;`;
                
                try {
                    // ✅ ดึงข้อมูลผู้ใช้จาก Token
                    const response = await axios.get("http://localhost:3000/auth/me", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    });
                    
                    // ✅ เก็บข้อมูลผู้ใช้ใน Context
                    setUser(response.data.user);
                    
                    console.log("LINE login successful:", response.data.user);
                    
                    // ✅ Redirect ไปหน้า Dashboard
                    router.push("/");
                } catch (error) {
                    console.error("Failed to fetch user info after LINE login:", error);
                    router.push("/login?error=line_auth_failed"); // Redirect กลับไป Login หากมีข้อผิดพลาด
                }
            } else {
                console.error("No token received from LINE login");
                router.push("/login?error=no_token");
            }
        };
        
        handleLineCallback();
    }, [router, setUser]);
    
    return <div className="flex justify-center items-center h-screen">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">กำลังเข้าสู่ระบบด้วย LINE...</p>
        </div>
    </div>;
}