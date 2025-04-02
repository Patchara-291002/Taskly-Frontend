import Link from "next/link"

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
                className='text-primaryorange font-semibold text-[28px]'
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
                        className='w-[280px] h-[44px] flex justify-center items-center border-[1px] border-black rounded-full cursor-pointer'
                    >
                        <p
                            className=''
                        >
                            {data.label}
                        </p>
                    </Link>
                ))}
            </div>
            <div
                className='flex gap-[6px]'
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
