'use client'

import React, { useState } from 'react'
import { AddUserIcon } from '@/app/component/icon/GlobalIcon'
import { PlusIcon } from '@/app/component/icon/GlobalIcon'
import { NewButton } from '@/app/component/GlobalComponent'

export default function page() {

    const [isUserHover, setIsUserHover] = useState(false)
    const [isNewHover, setIsNewHover] = useState(false)

    const project = {
        projectName: "Production",
        users: [
            {
                name: "Patrick",
                image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            },
            {
                name: "Patrick",
                image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            },
            {
                name: "Patrick",
                image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            },
        ]
    }

    return (
        <div
            className='w-full flex flex-col gap-[20px]'
        >
            <div
                className='w-full flex items-center gap-[10px]'
            >
                <div
                    className='flex -space-x-3'
                >
                    {project.users.map((user, index) => (
                        <div key={index} className='w-[26px] h-[26px] rounded-full overflow-hidden'>
                            <img src={user.image} alt={user.name} />
                        </div>
                    ))}
                </div>
                <button
                    className='border-[1px] border-primaryorange w-[26px] h-[26px] flex justify-center items-center rounded-full'
                    style={{ background: isUserHover ? '#FF6200' : 'none' }}
                    onMouseEnter={() => setIsUserHover(true)}
                    onMouseLeave={() => setIsUserHover(false)}
                >
                    <AddUserIcon w={14} h={14} color={isUserHover ? 'white' : '#FF6200'} />
                </button>
            </div>

            <ProjectView />

            <ProjectBoard isNewHover={isNewHover} setIsNewHover={setIsNewHover}/>

        </div>
    )
}

const ProjectView = () => {
    return (
        <div
            className='w-full h-[330px] bg-[#E2E5F2] rounded-[15px]'
        >

        </div>
    )
}

const ProjectBoard = ({isNewHover, setIsNewHover}) => {
    return (
        <div
            className=''
        >
            <NewButton 
                onClick={() => {}}
                buttonText='New'
            />
        </div>
    )
}

