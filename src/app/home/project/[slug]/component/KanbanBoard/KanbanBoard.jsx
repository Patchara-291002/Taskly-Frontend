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


    return (
        <div className="touch-none">
            <div className="w-full min-h-[400px] px-[10px] py-[20px] rounded-[15px] border-[1px] bg-white border-grayBorder overflow-x-auto touch-none">
                {/* ส่ง project ไปยัง Board.jsx */}
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
        </div>
    );
}
