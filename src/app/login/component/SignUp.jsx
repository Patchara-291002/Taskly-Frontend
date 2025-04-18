import { registerWithEmail } from "@/api/auth";
import { useState } from "react";
import { GoogleIcon, LineIcon, EmailIcon } from "@/app/component/GlobalIcon";
import Link from "next/link";

export default function SignUp({ setType }) {

    const signUpData = [
        {
            name: "line",
            link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/line`,
            label: "Login with LINE"
        },
    ]

    const handleSignUp = (name) => {
        if (name === "email") {
            setType("signUpEmail");
        } else {
            return
        }
    };

    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center gap-[60px]'
        >
            <div
                className="flex flex-col justify-center items-center gap-[10px]"
            >
                <img
                    src={"https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/P1/undraw_secure-login_m11a.png"}
                    alt="login"
                    className='w-[260px] mb-[10px]'
                />
                <div
                    className="flex justify-center items-baseline gap-[5px]"
                >
                    <p
                        className='text-primaryOrange font-semibold text-[28px]'
                    >
                        JOIN
                    </p>
                    <p
                        className='text-primaryOrange font-semibold text-[28px]'
                    >
                        TASKLY
                    </p>
                </div>
            </div>
            <div
                className='flex flex-col gap-[1rem]'
            >
                {signUpData.map((data, index) => (
                    <Link
                        key={index}
                        onClick={() => handleSignUp(data.name)}
                        className='w-[280px] h-[44px] flex justify-center items-center gap-[15px] border-[1px] border-black rounded-full cursor-pointer'
                        href={data.link}
                    >
                        {data.name === "google" && <GoogleIcon w={22} h={22} />}
                        {data.name === "line" && <LineIcon w={34} h={34} color={"#39CD00"} />}
                        {data.name === "email" && <EmailIcon w={22} h={22} color={"#000000"} />}
                        <p
                            className=''
                        >
                            {data.label}
                        </p>
                    </Link>
                ))}
            </div>
            <div
                className="flex flex-col justify-center gap-[10px] items-center text-[14px] text-[#454545]"
            >
                {/* <div
                    className='flex gap-[6px] text-[14px]'
                >
                    <p
                        className=''
                    >
                        Already have an account?
                    </p>
                    <p
                        className='text-[#288917] font-medium cursor-pointer'
                        onClick={() => setType('signIn')}
                    >
                        Sign in
                    </p>
                </div> */}
                <div
                    className=""
                >
                    <p
                        className="font-light text-[14px] text-center"
                    >
                        We use <span className="font-medium text-[#288917]">LINE</span> to receive notifications via the LINE application.
                    </p>
                </div>
            </div>
        </div>
    )
}
