import { LeftArrowIcon } from "@/app/home/component/icon/DashboardIcon"

export default function SignUpEmail({ setType }) {
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
                    Email
                </p>
                <input
                    className='w-[300px] h-[35px] bg-[#F2F2F2] rounded-[5px]'
                />
            </div>
            <button
                className='w-[200px] h-[40px] bg-primaryorange rounded-full
                                    text-white font-medium text-[14px]'
            >
                Continue
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
