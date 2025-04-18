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
            const code = searchParams.get("code");
            const state = searchParams.get("state");
            console.log("Received code:", code);

            if (code) {
                try {
                    // ส่ง code ไป backend เพื่อแลกเป็น token
                    const authResponse = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/line/callback`,
                        {
                            params: { code, state },
                            withCredentials: true
                        }
                    );

                    const { token, user } = authResponse.data;

                    if (token) {
                        Cookies.set('token', token, {
                            path: '/',
                            secure: true,
                            sameSite: 'none'
                        });

                        setUser(user);
                        console.log("LINE login successful:", user);
                        router.push("/home/dashboard");
                    }
                } catch (error) {
                    console.error("LINE authentication failed:", error.response?.data || error.message);
                    router.push("/login?error=line_auth_failed");
                }
            } else {
                console.error("No code in URL params");
                router.push("/login?error=no_code");
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