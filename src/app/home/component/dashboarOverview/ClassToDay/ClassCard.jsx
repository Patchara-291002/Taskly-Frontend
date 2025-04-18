import React from 'react'
import { CalendarIcon, CameraIcon, ClockIcon, MoreIcon } from '../../icon/DashboardIcon'

export default function ClassCard({ subjectName, dueDate, period, color }) {
    return (
        <div
            className='w-full h-[85px] bg-white p-[15px] rounded-[15px] border border-grayBorder overflow-hidden'
        >
            <div
                className='w-full h-full flex flex-row'
            >
                <div
                    className='w-full flex flex-col justify-between items-start '
                >
                    <p
                        className='font-medium text-[14px]'
                    >
                        {subjectName}
                    </p>
                    <div
                        className='flex items-center gap-[7px]'
                    >
                        <CalendarIcon w={12} h={12} color={"#FF6200"} />
                        <p
                            className='text-[12px] text-[#1F1E1D]'
                        >
                            {dueDate}
                        </p>
                    </div>
                    <div
                        className='flex items-center gap-[7px]'
                    >
                        <ClockIcon w={12} h={12} color={"#FF6200"} />
                        <p
                            className='text-[12px] text-[#1F1E1D]'
                        >
                            {period}
                        </p>
                    </div>
                </div>
                <div
                    className='w-[16px] h-[16px] rounded-full '
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    )
}
