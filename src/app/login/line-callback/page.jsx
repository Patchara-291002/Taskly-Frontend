'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import Cookies from 'js-cookie';
import styles from "@/app/component/Loading.module.css";
import api from '@/utils/api'; // Import the API instance

function LineCallbackContent() {
    const router = useRouter();
    const { setUser } = useAuth();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleLineCallback = async () => {
            const token = searchParams.get("token");
            console.log("Received token:", token);

            if (token) {
                // Set token in cookie
                Cookies.set('token', token, {
                    path: '/',
                    secure: true,
                    sameSite: 'none'
                });
                
                try {
                    const response = await api.get('/auth/me');
                    setUser(response.data.user);
                    router.push("/home/dashboard");
                } catch (error) {
                    console.error("LINE authentication failed:", error.response?.data || error.message);
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