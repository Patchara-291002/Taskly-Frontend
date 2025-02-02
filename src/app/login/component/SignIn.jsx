export default function SignIn({ setType, handelClick }) {

    const signInData = [
        {
            name: "google",
            link: "",
            label: "Sign in with Google"
        },
        {
            name: "facebook",
            link: "",
            label: "Sign in with Facebook"
        },
        {
            name: "email",
            link: "",
            label: "Sign in with Email"
        }
    ]

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
                    <div
                        key={index}
                        className='w-[280px] h-[44px] flex justify-center items-center border-[1px] border-black rounded-full'
                    >
                        <p
                            className=''
                        >
                            {data.label}
                        </p>
                    </div>
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
