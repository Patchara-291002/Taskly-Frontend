'use client'

import React, { useState } from 'react'
import { AddUserIcon } from '@/app/component/icon/GlobalIcon'
import { NewButton } from '@/app/component/GlobalComponent'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import GrantChart from '../component/GrantChart'

export default function page() {

    const [isUserHover, setIsUserHover] = useState(false)

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
        ],
        board: [
            {
                role: "Designer",
                tasks: [
                    {
                        taskId: "001",
                        taskName: "Design Wireframes",
                        state: "In Progress",
                        priority: 3,
                        dueDate: "2024-10-30"
                    },
                    {
                        taskId: "002",
                        taskName: "Create Logo",
                        state: "Todo",
                        priority: 2,
                        dueDate: "2024-11-05"
                    }
                ]
            },
            {
                role: "Developer",
                tasks: [
                    {
                        taskId: "003",
                        taskName: "Develop Frontend",
                        state: "Todo",
                        priority: 5,
                        dueDate: "2024-11-10"
                    },
                    {
                        taskId: "004",
                        taskName: "Setup Backend API",
                        state: "Todo",
                        priority: 4,
                        dueDate: "2024-11-12"
                    }
                ]
            }
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

            <DndContext onDragEnd={(event) => console.log(event)}>
                <ProjectBoard board={project.board} />
            </DndContext>

        </div>
    )
}

const ProjectView = () => {
    return (
        <div
            className='w-full h-[400px]'
        >
           <GrantChart />
        </div>
    )
}

const Draggable = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
};

const Droppable = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef}>
            {children}
        </div>
    );
};

const ProjectBoard = ({ board }) => {
    return (
        <div
            className='flex flex-col gap-[20px]'
        >
            <div>
                <NewButton
                    onClick={() => { }}
                    buttonText='New'
                />
            </div>
            <DndContext
                onDragEnd={(event) => {
                    const { active, over } = event;
                    if (active.id !== over.id) {
                        // Handle the logic for updating the board array
                    }
                }}
            >
                <div className="board-container">
                    {board.map((column) => (
                        <Droppable key={column.role} id={column.role}>
                            <h3>{column.role}</h3>
                            {column.tasks.map((task) => (
                                <Draggable key={task.taskId} id={task.taskId}>
                                    <div className="task-card">{task.taskName}</div>
                                </Draggable>
                            ))}
                        </Droppable>
                    ))}
                </div>
            </DndContext>
        </div>
    )
}

