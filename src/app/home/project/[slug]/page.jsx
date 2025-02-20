'use client'

import React, { useEffect, useState, useRef } from 'react'
import GrantChart from './component/GrantChart/GrantChart'
import { usePathname } from 'next/navigation';
import NewStatus from './component/NewStatus'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchProjectByProjectId } from '@/api/project'
import { createStatus } from '@/api/status'
import NewTask from './component/NewTask'
import { createTask } from '@/api/task'
import ProjectHeader from './component/ProjectHeader'
import KanbanBoard from './component/KanbanBoard/KanbanBoard';


export default function page() {


    const [project, setProject] = useState(null);
    const pathname = usePathname();
    const projectId = pathname.split('/').pop();

    const [isOpenNewStatus, setIsOpenNewStatus] = useState(false)
    const [statusName, setStatusName] = useState("");
    const [statusColor, setStatusColor] = useState("");

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
        assignees: []
    })

    useEffect(() => {
        if (!projectId) return

        const loadProject = async () => {
            try {
                const projectData = await fetchProjectByProjectId(projectId)
                setProject(projectData);
                console.log(projectData)
            } catch (error) {
                console.error('Failed to load project:', error);
            }
        }
        loadProject();
    }, [projectId])


    const handleNewStatusSubmit = async () => {
        try {
            const newStatus = await createStatus(projectId, statusName, statusColor);
            setIsOpenNewStatus(false);
            window.location.reload();
        } catch (error) {
            console.error('Error creating status:', error);
        }
    }

    

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
    return (
        <div
            className='w-full flex flex-col gap-[20px] z-0 relative'
        >

            {project && <ProjectHeader project={project} />}

            {project && <GrantChart project={project} />}

           
            {project ? 
                <KanbanBoard 
                project={project} 
                setIsOpenNewStatus={setIsOpenNewStatus} 
                setIsOpenNewTask={setIsOpenNewTask} 
                setStatusId={setStatusId}
                handleOpenNewTask={handleOpenNewTask}
            /> : <>Sorry</>
            }

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


