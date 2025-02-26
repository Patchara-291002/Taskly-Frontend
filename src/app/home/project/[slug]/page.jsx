'use client'

import { useEffect, useState, useRef } from 'react'
import GrantChart from './component/GrantChart/GrantChart'
import { usePathname } from 'next/navigation';
import NewStatus from './component/NewStatus'
import { fetchProjectByProjectId } from '@/api/project'
import { createStatus } from '@/api/status'
import NewTask from './component/NewTask'
import { createTask } from '@/api/task'
import ProjectHeader from './component/ProjectHeader'
import KanbanBoard from './component/KanbanBoard/KanbanBoard';
import ProjectInfo from './component/ProjectInfo';
import ProjectFile from './component/ProjectFile';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProjectTable from './component/Table/ProjectTable';
import StatusAndRolePicker from './component/StatusAndRolePicker';
import Kanban from './component/Kanban/Kanban';



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

    const [activeTab, setActiveTab] = useState("kanban");
    const swiperRef = useRef(null);

    const handleTabClick = (index) => {
        setActiveTab(index);
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    };

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
        console.log(project)
    }, [projectId])


    // const handleNewStatusSubmit = async () => {
    //     try {
    //         const newStatus = await createStatus(projectId, statusName, statusColor);
    //         setIsOpenNewStatus(false);
    //         window.location.reload();
    //     } catch (error) {
    //         console.error('Error creating status:', error);
    //     }
    // }



    // const handleCreateTask = async () => {
    //     try {
    //         const newTask = await createTask(task);
    //         setIsOpenNewTask(false);
    //         window.location.reload();
    //     } catch (error) {
    //         console.error('Error creating task:', error);
    //     }
    // };

    // const handleOpenNewTask = (newStatusId) => {
    //     setIsOpenNewTask(true);
    //     setStatusId(newStatusId);
    // };

    // useEffect(() => {
    //     if (!statusId) return;
    //     setTask((prevTask) => ({
    //         ...prevTask,
    //         statusId: statusId
    //     }));
    // }, [statusId]);
    return (
        <div
            className='w-full flex flex-col gap-[20px] z-0 relative'
        >

            {project && <ProjectHeader project={project} />}

            {/* {project && <GrantChart project={project} />} */}


            {/* {project ? 
                <KanbanBoard 
                project={project} 
                setIsOpenNewStatus={setIsOpenNewStatus} 
                setIsOpenNewTask={setIsOpenNewTask} 
                setStatusId={setStatusId}
                handleOpenNewTask={handleOpenNewTask}
            /> : <>Sorry</>
            } */}

            <div
                className='w-full h-[280px] flex gap-[30px]'
            >
                {project && <ProjectInfo project={project} />}
                {project && <ProjectFile project={project} />}
            </div>

            <div className="w-full">
                {/* Tab Menu */}
                <div className="flex gap-5 pb-2">
                    <button
                        className={activeTab === "table" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}
                        onClick={() => handleTabClick("table")}
                    >
                        Table
                    </button>
                    <button
                        className={activeTab === "kanban" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}
                        onClick={() => handleTabClick("kanban")}
                    >
                        Kanban
                    </button>
                    <button
                        className={activeTab === "dashboard" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}
                        onClick={() => handleTabClick("dashboard")}
                    >
                        Dashboard
                    </button>
                </div>

                {/* ใช้ switch/case หรือ if-else เพื่อสลับ UI ตาม activeTab */}
                <div className="w-full bg-white p-4 rounded-[15px] border-[1px] border-grayBorder">
                    {(() => {
                        switch (activeTab) {
                            case "table":
                                return (
                                    <div className="flex flex-col gap-4">
                                        {project && <StatusAndRolePicker project={project} />}
                                        {project && <ProjectTable project={project} />}
                                    </div>
                                );
                            case "kanban":
                                return (
                                    <div>
                                        {project && <KanbanBoard project={project} />}
                                    </div>
                                );
                            case "dashboard":
                                return (
                                    <div>
                                        {/* {project && <GrantChart project={project} />} */}
                                    </div>
                                )
                            default:
                                return
                        }
                    })()}
                </div>
            </div>


            {/* {isOpenNewStatus && (
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
            )} */}
        </div>
    )
}




