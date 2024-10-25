'use client'

import React, { useState } from 'react'
import { AddUserIcon } from '@/app/component/icon/GlobalIcon'
import GrantChart from './component/GrantChart'
import Board from './component/KanbanBoard/Board'

export default function page() {

    const [projects, setProjects] = useState({
        projectName: "Production",
        users: [
            { name: "Patrick", image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
            { name: "Alex", image: "https://img.daisyui.com/images/stock/photo-1564564295391-7f24f26f568b.webp" },
            { name: "Jamie", image: "https://img.daisyui.com/images/stock/photo-1503023345310-bd7c1de61c7d.webp" },
            { name: "Taylor", image: "https://img.daisyui.com/images/stock/photo-1519345182560-3f2917c472ef.webp" },
            { name: "Jordan", image: "https://img.daisyui.com/images/stock/photo-1494790108377-be9c29b29330.webp" },
        ],
        board: [
            {
                statusId: 1,
                status: "Backlog",
                tasks: [
                    {
                        taskId: "001",
                        statustId: 1,
                        taskName: "Design Wireframes",
                        detail: "Create wireframes for the homepage and dashboard",
                        state: "developer",
                        priority: 3,
                        creatAt: '2024-10-10',
                        dueDate: "2024-10-30",
                        dueTime: "12.00",
                        color: "#000000",
                        tag: "developer",
                        assignees: [
                            {
                                profile: "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1729798748766-88ceb87d2d79958ea4eced8f27cc4fb7.jpg",
                                name: "Patrick",
                                editable: true
                            },
                            {
                                profile: "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1729798748766-88ceb87d2d79958ea4eced8f27cc4fb7.jpg",
                                name: "Alex",
                                editable: false
                            }
                        ]
                    },
                    {
                        taskId: "002",
                        statustId: 1,
                        taskName: "Create Logo",
                        detail: "Design a logo for the new branding campaign",
                        state: "Todo",
                        priority: 2,
                        creatAt: '2024-10-10',
                        dueDate: "2024-11-05",
                        dueTime: "12.00",
                        color: "#7E7E7E",
                        tag: "developer",
                        assignees: [
                            {
                                profile: "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1729798748766-88ceb87d2d79958ea4eced8f27cc4fb7.jpg",
                                name: "Taylor",
                                editable: true
                            }
                        ]
                    },
                    {
                        taskId: "003",
                        statustId: 1,
                        taskName: "Prepare Style Guide",
                        detail: "Develop a style guide for consistent branding",
                        state: "Todo",
                        priority: 2,
                        creatAt: '2024-10-15',
                        dueDate: "2024-11-10",
                        dueTime: "12.00",
                        color: "#7E7E7E",
                        tag: "developer",
                        assignees: [
                            {
                                profile: "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1729798748766-88ceb87d2d79958ea4eced8f27cc4fb7.jpg",
                                name: "Jordan",
                                editable: false
                            }
                        ]
                    }
                ]
            },
            {
                statusId: 2,
                status: "To Do",
                color: "#F4B93F",
                tasks: [
                    {
                        taskId: "004",
                        statustId: 2,
                        taskName: "Develop Frontend",
                        detail: "Implement the frontend for the user dashboard",
                        state: "Todo",
                        priority: 3,
                        creatAt: '2024-09-25',
                        dueDate: "2024-10-07",
                        dueTime: "12.00",
                        color: "#7E7E7E",
                        tag: "developer",
                        assignees: [
                            {
                                profile: "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1729798748766-88ceb87d2d79958ea4eced8f27cc4fb7.jpg",
                                name: "Patrick",
                                editable: true
                            }
                        ]
                    },
                    {
                        taskId: "005",
                        statustId: 1,
                        taskName: "Setup Backend API",
                        detail: "Setup APIs for user login and data fetching",
                        state: "Todo",
                        priority: 1,
                        creatAt: '2024-10-10',
                        dueDate: "2024-11-12",
                        dueTime: "12.00",
                        color: "#7E7E7E",
                        tag: "developer",
                        assignees: [
                            {
                                profile: "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1729798748766-88ceb87d2d79958ea4eced8f27cc4fb7.jpg",
                                name: "Jamie",
                                editable: false
                            }
                        ]
                    }
                ]
            },
            {
                statusId: 3,
                status: "Doing",
                color: "#E85BCE",
                tasks: [
                    {
                        taskId: "006",
                        statustId: 3,
                        taskName: "API Testing",
                        detail: "Test new API endpoints with Postman",
                        state: "In Progress",
                        priority: 2,
                        creatAt: '2024-10-20',
                        dueDate: "2024-11-10",
                        dueTime: "12.00",
                        color: "#7E7E7E",
                        tag: "developer",
                        assignees: [
                            {
                                profile: "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1729798748766-88ceb87d2d79958ea4eced8f27cc4fb7.jpg",
                                name: "Taylor",
                                editable: true
                            }
                        ]
                    }
                ]
            },
            {
                statusId: 4,
                status: "Done",
                color: "#18AC00",
                tasks: [
                    {
                        taskId: "007",
                        statustId: 4,
                        taskName: "Database Migration",
                        detail: "Migrate database from MySQL to PostgreSQL",
                        state: "Complete",
                        priority: 2,
                        creatAt: '2024-09-15',
                        dueDate: "2024-10-01",
                        dueTime: "12.00",
                        color: "#7E7E7E",
                        tag: "developer",
                        assignees: [
                            {
                                profile: "https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/1729798748766-88ceb87d2d79958ea4eced8f27cc4fb7.jpg",
                                name: "Jordan",
                                editable: false
                            }
                        ]
                    }
                ]
            }
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

            <div
                className='w-full overflow-x-scroll touch-none'
            >
                <Board projects={projects} setProjects={setProjects} />
            </div>

        </div>
    )
}


