'use client'

import React, { useState } from 'react'
import { AddUserIcon } from '@/app/component/icon/GlobalIcon'
import GrantChart from './component/GrantChart'
import Board from './component/Board'

export default function page() {

    const [projects, setProjects] = useState({
        projectName: "Production",
        users: [
            { name: "Patrick", image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
            { name: "Patrick", image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
            { name: "Patrick", image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        ],
        board: [
            {
                statusId: 1,
                status: "Backlog",
                tasks: [
                    { taskId: "001", taskName: "Design Wireframes", state: "In Progress", priority: 3, creatAt: '2024-10-10', dueDate: "2024-10-30" },
                    { taskId: "002", taskName: "Create Logo", state: "Todo", priority: 2, creatAt: '2024-10-10', dueDate: "2024-11-05" }
                ]
            },
            {
                statusId: 2,
                status: "To Do",
                tasks: [
                    { taskId: "003", taskName: "Develop Frontend", state: "Todo", priority: 5, creatAt: '2024-09-25', dueDate: "2024-10-07" },
                    { taskId: "004", taskName: "Setup Backend API", state: "Todo", priority: 4, creatAt: '2024-10-10', dueDate: "2024-11-12" }
                ]
            },
            {
                statusId: 3,
                status: "Doing",
                tasks: [
                    { taskId: "005", taskName: "Test", state: "Todo", priority: 5, creatAt: '2024-10-20', dueDate: "2024-11-10" },
                ]
            },
            {
                statusId: 4,
                status: "Done",
                tasks: [
                ]
            },
        ]
    });

    const [isUserHover, setIsUserHover] = useState(false);

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
                    {projects.users.map((user, index) => (
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

            <div
                className='w-full h-[400px]'
            >
                <GrantChart projects={projects} />
            </div>

            <Board projects={projects} setProjects={setProjects} />

        </div>
    )
}


