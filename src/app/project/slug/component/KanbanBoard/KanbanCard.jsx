import React from 'react'
import { CalendarIcon, ClockIcon } from '@/app/component/icon/DashboardIcon'

export default function KanbanCard({ title, detail, tag, priority, dueDate, startDate, users, color, dueTime, status }) {

    function limitWords(text, wordLimit) {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    }

    return (
        <div
            className='min-w-[230px] rounded-[15px] bg-white p-[15px] flex flex-col justify-between gap-[5px]'
        >
            <div
                className='w-full flex justify-between items-center'
            >
                <div
                    className='flex items-center gap-[8px]'
                >
                    <div
                        className='w-[8px] h-[8px] rounded-full'
                        style={{ background: 
                           priority === 3
                           ? "#FF0000"
                           : priority === 2 
                           ? "#F4B93F"
                           : priority === 1
                           ? "#18AC00"
                           : "FFFFFF"
                        }}
                    />
                    <div
                        className=''
                    >
                        <p
                            className='text-[14px] font-medium text-nowrap'
                        >
                            {(title.length > 13) 
                            ? title.slice(0, 13) + "..." 
                            : title}
                        </p>
                    </div>
                </div>
                <div
                    className='flex justify-center items-center py-[3px] px-[6px] bg-primaryorange rounded-[15px]'
                >
                    <p
                        className='text-[8px] text-white text-nowrap'
                    >
                        {status}
                    </p>
                </div>
            </div>
            <div
                className='w-full flex flex-col gap-[10px]'
            >
                <div
                    className='flex -space-x-2.5'
                >
                    {users.map((user, index) => (
                        <div key={index} className='w-[20px] h-[20px] rounded-full overflow-hidden'>
                            <img src={user.profile} alt={`User ${index}`} />
                        </div>
                    ))}
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
            </div>
        </div>
    )
}
