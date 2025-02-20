import { useState } from "react";
import { AddUserIcon } from "@/app/home/component/icon/GlobalIcon"

export default function ProjectHeader({ project }) {

    const [isUserHover, setIsUserHover] = useState(false);

    return (
        <div
            className='w-full flex items-center justify-between'
        >
            <p
                className='text-[24px] font-semibold text-primaryorange'
            >
                {project && project.projectName}
            </p>
            <div
                className='flex items-center gap-[10px]'
            >
                <button
                    className='border-[1px] border-primaryorange w-[26px] h-[26px] flex justify-center items-center rounded-full'
                    style={{ background: isUserHover ? '#FF6200' : 'none' }}
                    onMouseEnter={() => setIsUserHover(true)}
                    onMouseLeave={() => setIsUserHover(false)}
                >
                    <AddUserIcon w={14} h={14} color={isUserHover ? 'white' : '#FF6200'} />
                </button>
                <div
                    className='flex -space-x-3'
                >
                    {project && project.users.map((user, index) => (
                        <div key={index} className='w-[26px] h-[26px] rounded-full overflow-hidden'>
                            <img src={user.userId.profile} alt={user.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
