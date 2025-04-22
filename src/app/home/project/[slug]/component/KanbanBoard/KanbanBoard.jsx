"use client";

import { useState, useEffect } from "react";
import { NewButton } from "@/app/home/component/GlobalComponent";
import Board from "./Board";

export default function KanbanBoard({
    project,
    setIsOpenNewStatus,
    setIsOpenNewTask,
    setStatusId,
    handleOpenNewTask,
    handleTask,
    loadProject
}) {
    const [isDelete, setIsDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const handleContainerInteraction = () => {
        setIsHovered(true);
    };

    const handleContainerLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            <div 
                className={`w-full min-h-[400px] relative px-[10px] py-[20px] rounded-[15px] border-[1px] bg-white border-grayBorder overflow-x-scroll`}
                onMouseEnter={handleContainerInteraction}
                onClick={handleContainerInteraction}
                onMouseLeave={handleContainerLeave}
            >
                <div className={`touch-none`}>
                    {project && (
                        <Board
                            initialProjectData={project}
                            setIsOpenNewTask={setIsOpenNewTask}
                            setStatusId={setStatusId}
                            handleOpenNewTask={handleOpenNewTask}
                            handleTask={handleTask}
                            loadProject={loadProject}
                        />
                    )}
                </div>
                <div className="h-[50px] relative">
                    <p
                        className={`absolute bottom-[-20px] left-[10px] text-center text-[14px] ${
                            isHovered ? 'text-[#707070]' : 'text-[#FFFFFF]'
                        } transition-colors duration-300`}
                    >
                        Scroll here
                    </p>
                </div>
            </div>            
        </div>
    );
}