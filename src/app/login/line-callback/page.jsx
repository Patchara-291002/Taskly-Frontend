"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Cookies from 'js-cookie';
import styles from "@/app/component/Loading.module.css";

function LineCallbackContent() {
    const router = useRouter();
    const { setUser } = useAuth();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleLineCallback = async () => {
            const token = searchParams.get("token");
            console.log("Received token:", token);

            if (token) {
                // บันทึก token ไว้ใน cookie
                Cookies.set('token', token, {
                    path: '/',
                    secure: true,
                    sameSite: 'none'
                });
                
                try {
                    // เรียกข้อมูลผู้ใช้โดยใช้ token ที่ได้รับ
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    
                    setUser(response.data.user);
                    console.log("User data retrieved:", response.data.user);
                    router.push("/home/dashboard");
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    router.push("/login?error=auth_failed");
                }
            } else {
                console.error("No token received in callback");
                router.push("/login?error=no_token");
            }
        };

        handleLineCallback();
    }, [router, setUser, searchParams]);

    return (
        <div className="w-full h-screen flex justify-center items-center bg-white">
            <div className={styles.loader} />
        </div>
    );
}

// Main component wrapped with Suspense
export default function LineCallback() {
    return (
        <Suspense 
            fallback={
                <div className="w-full h-screen flex justify-center items-center bg-white">
                    <div className={styles.loader} />
                </div>
            }
        >
            <LineCallbackContent />
        </Suspense>
    );
}