import { SendEmailIcon } from "@/app/component/GlobalIcon"

export default function SignUpSent({ setType, closePopUp }) {
    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center'
        >
            <SendEmailIcon w={80} h={80} color={"#FF6200"} />
            <p
                className="mt-[30px] mb-[30px] text-primaryOrange text-[18px] text-center font-medium"
            >
                Successfully sent the link to
                <br />
                your inbox.
            </p>
            <button
                onClick={closePopUp}
                className='w-[200px] h-[40px] bg-primaryOrange rounded-full text-white font-medium text-[14px]'
            >
                Ok
            </button>
        </div>
    )
}
