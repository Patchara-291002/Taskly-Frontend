import { LeftArrowIcon } from "@/app/home/component/icon/DashboardIcon"
import { registerWithEmail } from "@/api/auth";
import { useState } from "react";

export default function SignUpEmail({ setType }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handelSignUpWihtEmail = async () => {
        try {
            if (!name || !email || !password) {
                console.error('All fields are required');
                return;
            }
            if (password.length < 6) {
                console.log('Password must be at least 6 characters long');
                return
            }
            setLoading(true);
            
            const signUp = await registerWithEmail(name, email, password)
            console.log('Sign up successful:');

            setTimeout(() => {
                setType("signUpSent");
                setLoading(false);
            }, 3000)
            
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                // email existed
                console.error(error.response.data.message);
            } else {
                console.error('Sign up failed:', error);
            }
        }
    }

    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center gap-[30px]'
        >
            <p
                className='text-primaryorange font-semibold text-[28px]'
            >
                Sign up with email
            </p>
            <p
                className='text-center'
            >
                Enter your email address to create
                <br />
                an account.  and we’ll send a link to your inbox.
            </p>
            <div
                className='flex flex-col gap-[7px]'
            >
                <p
                    className='text-[14px]'
                >
                    Name
                </p>
                <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-[300px] h-[35px] bg-[#F2F2F2] rounded-[5px]'
                />
            </div>
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
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-[300px] h-[35px] bg-[#F2F2F2] rounded-[5px]'
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
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-[300px] h-[35px] bg-[#F2F2F2] rounded-[5px]'
                />
            </div>
            <button
                onClick={handelSignUpWihtEmail}
                className='w-[200px] h-[40px] bg-primaryorange rounded-full
                                    text-white font-medium text-[14px]'
            >
                {loading ? "loading" : "Continue"}
            </button>
            <div
                className='flex items-center gap-[10px] cursor-pointer'
                onClick={() => setType('signUp')}
            >
                <LeftArrowIcon w={16} h={16} color={"#288917"} />
                <p
                    className='text-[14px] text-[#288917]'
                >
                    All sign up options
                </p>
            </div>
        </div>
    )
}
