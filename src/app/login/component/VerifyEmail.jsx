import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from "@/api/auth";
import Link from 'next/link';

export default function VerifyEmail() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const searchParams = useSearchParams();

    useEffect(() => {
        const tokenFromURL = searchParams.get('token');
        console.log("Extracted Token:", tokenFromURL);
        if (tokenFromURL) {
            setToken(tokenFromURL); 
        }
    }, [searchParams]); 

    useEffect(() => {
        if (!token) return;

        const handleVerifyEmail = async () => {
            console.log("Verifying token:", token);
            try {
                const response = await verifyEmail(token);
                setMessage("Email verified successfully.");
            } catch (error) {
                setMessage("Verification failed.");
            } finally {
                setLoading(false);
            }
        };

        handleVerifyEmail();
    }, [token]); 

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {message}
                    <Link
                        href='/'
                    >
                        Go to page
                    </Link>
                </div>
            )}
        </>
    );
}
