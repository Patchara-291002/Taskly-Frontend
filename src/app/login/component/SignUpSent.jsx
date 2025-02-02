

export default function SignUpSent({ setType, closePopUp }) {
    return (
        <div
            className='w-full h-full flex flex-col justify-center items-center'
        >
            <div
                className="w-[200px] h-[200px] bg-slate-100"
            />
            <p
                className="mt-[50px] mb-[30px] text-primaryorange text-[18px] text-center font-medium"
            >
                Successfully sent the link to
                <br />
                your inbox.
            </p>
            <button
                onClick={closePopUp}
                className='w-[200px] h-[40px] bg-primaryorange rounded-full
                                    text-white font-medium text-[14px]'
            >
                Ok
            </button>
        </div>
    )
}
