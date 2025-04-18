import React, { use } from 'react'
import { CalendarIcon, CheckIcon, ClockIcon } from '../../icon/DashboardIcon'
import { useEffect, useState } from "react";
import { formatToDate } from '@/utils/dateUtils'
import { getProjectIdByTaskId, makeDoneTask } from '@/api/home';
import Link from 'next/link';

export default function TaskCard({ task, fetchTasks }) {

    const [isCheckButtonActive, setIsCheckButtonActive] = useState(false);
    const [projectId, setProjectId] = useState(null);

    const getProjectId = async () => {
        try {
            const response = await getProjectIdByTaskId(task._id);
            setProjectId(response);
        } catch (error) {
            console.error("Error fetching project ID:", error);
        }
    }

    useEffect(() => {
        getProjectId()
    }, [task]);

    const handleDoneTask = async () => {
        try {
            const response = await makeDoneTask(task._id, projectId);
            fetchTasks();
        } catch (error) {
            console.error("Error marking assignment as done:", error);
        }
    }

    return (
        <Link
            href={`/home/project/${projectId}`}
            className='w-full h-full'
        // onClick={()}
        >
            <div
                className='w-full h-[70px] bg-white rounded-[15px] p-[15px] border border-grayBorder'
            >
                <div
                    className='flex h-full flex-row justify-between items-center'
                >
                    <div
                        className='flex flex-col gap-[5px]'
                    >
                        <p
                            className='font-medium text-[14px]'
                        >
                            {task.taskName}
                        </p>
                        <p
                            className='font-normal text-[10px] text-[#707070]'
                        >
                            {`Description: ${task.detail}`}
                        </p>
                    </div>
                    <div>
                        <div
                            className='flex items-center gap-[5px]'
                        >
                            <CalendarIcon w={12} h={12} color={"#FF6200"} />
                            <p
                                className='text-[10px] text-[#1F1E1D]'
                            >
                                {formatToDate(task.dueDate)}
                            </p>
                        </div>
                    </div>
                    <button
                        onMouseEnter={() => setIsCheckButtonActive(true)}
                        onMouseLeave={() => setIsCheckButtonActive(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleDoneTask();
                        }}
                    >
                        <CheckIcon
                            w={20}
                            h={20}
                            color={isCheckButtonActive ? "#27C400" : "#D6D6D6"}
                        />
                    </button>
                </div>
            </div>
        </Link>
    )
}
