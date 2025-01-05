import React from 'react'
import { CalendarIcon, CheckIcon, ClockIcon } from '../../icon/DashboardIcon'

export default function TaskCard({ title, detail, dueDate, dueTime, taskType }) {
    return (
        <div
            className='w-full h-[70px] bg-white rounded-[15px] p-[15px]'
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
                        {title}
                    </p>
                    <p
                        className='font-normal text-[10px] text-[#707070]'
                    >
                        {`${taskType}: ${detail}`}
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
                            {dueDate}
                        </p>
                    </div>
                    <div
                        className='flex items-center gap-[7px]'
                    >
                        <ClockIcon w={12} h={12} color={"#FF6200"} />
                        <p
                            className='text-[10px] text-[#1F1E1D]'
                        >
                            {dueTime}
                        </p>
                    </div>
                </div>
                <button
                >
                    <CheckIcon 
                        w={20}
                        h={20}
                        color={"#D6D6D6"}
                    />
                </button>
            </div>
        </div>
    )
}
