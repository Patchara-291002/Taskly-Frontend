import React from 'react'
import { CalendarIcon, CameraIcon, ClockIcon, MoreIcon } from '../../icon/DashboardIcon'

export default function ClassCard({ subjectName, dueDate, period }) {
    return (
        <div
            className='w-full h-[85px] bg-white rounded-[15px] p-[15px] border border-grayBorder'
        >
            <div
                className='flex flex-row gap-[30px]'
            >
                <div
                    className='min-w-[55px] min-h-[55px] w-[55px] h-[55px] flex justify-center items-center bg-primaryorange/20 rounded-[15px]'
                >
                    <CameraIcon w={25} h={25} color={"#FF6200"} />
                </div>
                <div
                    className='w-full'
                >
                    <div
                        className='w-full flex justify-between items-start'
                    >
                        <p
                            className='font-medium text-[14px]'
                        >
                            {subjectName}
                        </p>
                        <button>
                            <MoreIcon h={12} color={"black"} />
                        </button>
                    </div>
                    <div
                        className='flex items-center gap-[7px]'
                    >
                        <CalendarIcon w={12} h={12} color={"#FF6200"}/>
                        <p
                            className='text-[12px]'
                        >
                            {dueDate}
                        </p>
                    </div>
                    <div
                        className='flex items-center gap-[7px]'
                    >
                        <ClockIcon w={12} h={12} color={"#FF6200"}/>
                        <p
                            className='text-[12px]'
                        >
                            {period}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
