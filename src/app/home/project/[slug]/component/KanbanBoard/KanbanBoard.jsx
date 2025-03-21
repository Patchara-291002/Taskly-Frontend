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
    handleTask
}) {
    const [isDelete, setIsDelete] = useState(false);
    

    return (
        <div className="w-full touch-none">
            <div className="w-full min-h-[400px] p-[10px] rounded-[15px] border-[1px] bg-white border-grayBorder touch-none">
                {/* ส่ง project ไปยัง Board.jsx */}
                {project && (
                    <Board
                        initialProjectData={project}
                        setIsOpenNewTask={setIsOpenNewTask}
                        setStatusId={setStatusId}
                        handleOpenNewTask={handleOpenNewTask}
                        handleTask={handleTask}
                    />
                )}
            </div>
        </div>
    );
}
