import { LeftArrowIcon } from "@/app/home/component/icon/DashboardIcon"
import { useState } from "react"
import { signInWithEmail } from "@/api/auth";
import { redirect } from "next/dist/server/api-utils";

export default function SignInEmail({ setType }) {

    const [email, setEmail] = useState("puttchara331003@gmail.com");
    const [password, setPassword] = useState("000000");
    const [loading, setLoading] = useState(false);

    const handleSingInWithEmail = async () => {
        try {
            if (!email || !password) {
                return
            }
            setLoading(true);

            const response = await signInWithEmail(email, password)
            console.log("Sign in successful:", response);
            window.location.href = "/";
        } catch (error) {
            console.error("Sign in failed:", error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center gap-[30px]'
        >
            <p
                className='text-primaryOrange font-semibold text-[28px]'
            >
                Sign up with email
            </p>
            <p
                className='text-center'
            >
                Enter the email address associated with
                <br />
                your account.
            </p>
            <div
                className='flex flex-col gap-[7px]'
            >
                <p
                    className='text-[14px]'
                >
                    Email
                </p>
                <input
                    type="text"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-[300px] h-[35px] bg-[#F2F2F2] rounded-[5px] px-[10px] text-[14px] outline-none'
                />
            </div>
            <div
                className='flex flex-col gap-[7px]'
            >
                <p
                    className='text-[14px]'
                >
                    Password
                </p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-[300px] h-[35px] bg-[#F2F2F2] rounded-[5px] px-[10px] text-[14px] outline-none'
                />
            </div>
            <button
                onClick={handleSingInWithEmail}
                className='w-[200px] h-[40px] bg-primaryOrange rounded-full
                                        text-white font-medium text-[14px]'
            >
                {loading ? "loading" : "Continue"}
            </button>
            <div
                className='flex items-center gap-[10px] cursor-pointer'
                onClick={() => setType('signIn')}
            >
                <LeftArrowIcon w={16} h={16} color={"#288917"} />
                <p
                    className='text-[14px] text-[#288917]'
                >
                    All sign in options
                </p>
            </div>
        </div>
    )
}
