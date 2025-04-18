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
                // router.push("/login?error=no_token");
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