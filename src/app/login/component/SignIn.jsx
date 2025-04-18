import Link from "next/link"
import { GoogleIcon, LineIcon, EmailIcon } from "@/app/component/GlobalIcon";

export default function SignIn({ setType, handelClick }) {

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const signInData = [
        {
            name: "google",
            link: `${API_BASE_URL}/auth/google`,
            label: "Sign in with Google"
        },
        {
            name: "email",
            link: "",
            label: "Sign in with Email"
        },
        {
            name: "line",
            link: `${API_BASE_URL}/auth/line`,
            label: "Sign in with LINE"
        }
    ]

    const handleSingInOptions = (name) => {
        if (name === 'email') {
            setType('signInEmail')
        } 
        else if (name === 'google') {
            return
        } else {
            return
        }
    }

    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center gap-[60px]'
        >
            <p
                className='text-primaryOrange font-semibold text-[28px]'
            >
                Welcome back!
            </p>
            <div
                className='flex flex-col gap-[1rem]'
            >
                {signInData.map((data, index) => (
                    <Link
                        key={index}
                        onClick={() => handleSingInOptions(data.name)}
                        href={data.link}
                        className='w-[280px] h-[44px] flex justify-center items-center gap-[15px] border-[1px] border-black rounded-full cursor-pointer'
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
                className='flex gap-[6px] text-[14px]'
            >
                <p
                    className=''
                >
                    Don’t have an account?
                </p>
                <p
                    className='text-[#288917] cursor-pointer'
                    onClick={() => setType('signUp')}
                >
                    Sign up
                </p>
            </div>
        </div>
    )
}
