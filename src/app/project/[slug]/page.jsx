'use client'

import React, { useEffect, useState } from 'react'
import { AddUserIcon } from '@/app/component/icon/GlobalIcon'
import GrantChart from './component/GrantChart'
import Board from './component/KanbanBoard/Board'
import { usePathname } from 'next/navigation';
import { NewButton } from '@/app/component/GlobalComponent'
import NewStatus from './component/NewStatus'
import { useUser } from '@/context/UserContext';
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

defineElement(lottie.loadAnimation);
//API///////////////////////////////////////////
import { fetchProjectByProjectId } from '@/api/project'
import { createStatus } from '@/api/status'
import NewTask from './NewTask'
import { createTask } from '@/api/task'


export default function page() {

    const { user } = useUser();
    const userId = user && user._id

    const [isDelete, setIsDelete] = useState(false);

    const [project, setProject] = useState(null);
    const pathname = usePathname();
    const projectId = pathname.split('/').pop();

    useEffect(() => {
        if (!projectId) return

        const loadProject = async () => {
            try {
                const projectData = await fetchProjectByProjectId(projectId)
                setProject(projectData);
            } catch (error) {
                console.error('Failed to load project:', error);
            }
        }
        loadProject();
    }, [projectId])

    const [isUserHover, setIsUserHover] = useState(false);

    const [isOpenNewStatus, setIsOpenNewStatus] = useState(false)
    const [statusName, setStatusName] = useState("");
    const [statusColor, setStatusColor] = useState("");

    const handleNewStatusSubmit = async () => {
        try {
            const newStatus = await createStatus(projectId, statusName, statusColor);
            setIsOpenNewStatus(false);
            window.location.reload();
        } catch (error) {
            console.error('Error creating status:', error);
        }
    }

    console.log(project)

    const [isOpenNewTask, setIsOpenNewTask] = useState(false);
    const [statusId, setStatusId] = useState("");
    const [task, setTask] = useState({
        statusId: "",
        taskName: "Task name",
        detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni doloribus, culpa voluptate perspiciatis repellat ipsam expedita deleniti ducimus repudiandae atque, fugiat incidunt unde neque labore delectus non beatae hic harum?",
        tag: "role",
        priority: 1,
        color: "#000000",
        startDate: null,
        dueDate: null,
        startTime: null,
        dueTime: null,
        assignees: [userId]
    })

    const handleCreateTask = async () => {
        try {
            const newTask = await createTask(task);
            setIsOpenNewTask(false);
            window.location.reload();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleOpenNewTask = (newStatusId) => {
        setIsOpenNewTask(true);
        setStatusId(newStatusId);
    };

    useEffect(() => {
        setTask((prevTask) => ({
            ...prevTask,
            statusId: statusId
        }));
    }, [statusId]);

    console.log(statusId)
    return (
        <div
            className='w-full flex flex-col gap-[20px] z-0 relative'
        >
            <div
                className='w-full flex items-center gap-[10px]'
            >
                <div
                    className='flex -space-x-3'
                >
                    {project && project.users.map((user, index) => (
                        <div key={index} className='w-[26px] h-[26px] rounded-full overflow-hidden'>
                            <img src={user.userId?.profilePicture} alt={user.displayName} />
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
                {project && <GrantChart project={project} />}
            </div>

            <div
                className='w-full touch-none'
            >
                <div
                    className='pb-[25px] pl-[25px] flex justify-between  w-full '
                >
                    <div>
                        <NewButton
                            onClick={() => setIsOpenNewStatus(true)}
                        />
                    </div>
                    <div
                        className='flex gap-[10px]'
                    >
                        {isDelete && (
                            <lord-icon
                                src="https://cdn.lordicon.com/lomfljuq.json"
                                trigger="in"
                                delay="500"
                                state="in-check"
                                colors="primary:#27C400"
                                style={{ width: 25, height: 25 }}
                                onClick={() => setIsDelete(false)}
                            />
                        )}
                        <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            colors={isDelete ? 'primary:#FF0000' : 'primary:#000000'}
                            style={{ width: 25, height: 25 }}
                            onClick={() => setIsDelete(true)}
                        />
                    </div>
                </div>
                {project && <Board initialProjectData={project} setIsOpenNewTask={setIsOpenNewTask} setStatusId={setStatusId} handleOpenNewTask={handleOpenNewTask} />}
            </div>
            {isOpenNewStatus && (
                <NewStatus
                    setStatusName={setStatusName}
                    statusName={statusName}
                    setStatusColor={setStatusColor}
                    setIsOpenNewStatus={setIsOpenNewStatus}
                    isOpenNewStatus={isOpenNewStatus}
                    onSubmit={handleNewStatusSubmit}
                />
            )}
            {isOpenNewTask && (
                <NewTask
                    isOpenNewTask={isOpenNewTask}
                    setIsOpenNewTask={setIsOpenNewTask}
                    task={task}
                    setTask={setTask}
                    statusId={statusId}
                    onSubmit={handleCreateTask}
                />
            )}
        </div>
    )
}


