"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import styles from "@/app/component/Loading.module.css"

export default function AuthCallback() {
    const router = useRouter();
    const { setUser } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (token) {
                // ✅ เก็บ Token ใน Cookies
                document.cookie = `token=${token}; path=/;`;

                try {
                    // ✅ ดึงข้อมูลผู้ใช้จาก Token
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    });

                    // ✅ เก็บข้อมูลผู้ใช้ใน Context
                    setUser(response.data.user);

                    // ✅ Redirect ไปหน้า Dashboard
                    router.push("/");
                } catch (error) {
                    console.error("Failed to fetch user info:", error);
                    router.push("/login"); // Redirect กลับไป Login หากมีข้อผิดพลาด
                }
            } else {
                router.push("/login");
            }
        };

        handleCallback();
    }, [router, setUser]);

    return (
        <div
            className="w-full h-screen flex justify-center items-center bg-white"
        >
            <div className={styles.loader} />
        </div>
    );
}
