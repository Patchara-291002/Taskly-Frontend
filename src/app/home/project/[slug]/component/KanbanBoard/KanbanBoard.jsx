"use client";

import { useState, useEffect } from "react";
import { NewButton } from "@/app/home/component/GlobalComponent";

// คุณอาจมี prop: setIsOpenNewStatus, setIsOpenNewTask, handleOpenNewTask ฯลฯ
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


    return (
        <div className="">
            <div className="w-full min-h-[400px] px-[10px] py-[20px] rounded-[15px] border-[1px] bg-white border-grayBorder overflow-x-scroll">
                <div
                    className="touch-none"
                >
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
                <div
                    className="h-[50px]"
                >
                </div>
            </div>
        </div>
    );
}
