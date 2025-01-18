export default function SignUp({ setType }) {

    const signUpData = [
        {
            name: "google",
            link: "",
            label: "Sign up with Google"
        },
        {
            name: "facebook",
            link: "",
            label: "Sign up with Facebook"
        },
        {
            name: "email",
            link: "",
            label: "Sign up with Email"
        }
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
            <p
                className='text-primaryorange font-semibold text-[28px]'
            >
                TASKLY
            </p>
            <div
                className='flex flex-col gap-[1rem]'
            >
                {signUpData.map((data, index) => (
                    <div
                        key={index}
                        onClick={() => handleSignUp(data.name)}
                        className='w-[280px] h-[44px] flex justify-center items-center border-[1px] border-black rounded-full cursor-pointer'
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
                    Already have an account?
                </p>
                <p
                    className='text-[#288917] cursor-pointer'
                    onClick={() => setType('signIn')}
                >
                    Sign in
                </p>
            </div>
        </div>
    )
}
