'use client'

import React from 'react'
import TaskCard from './TaskCard'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TaskOverview() {

    const tasks = [
        {
            title: "English",
            detail: "Midterm Exam 1",
            dueDate: "30 Oct 2024",
            dueTime: "16.00",
            taskType: "Assignment"
        },
        {
            title: "English",
            detail: "Midterm Exam 1",
            dueDate: "24 Oct 2024",
            dueTime: "16.00",
            taskType: "Assignment"
        },
        {
            title: "English",
            detail: "Midterm Exam 1",
            dueDate: "22 Oct 2024",
            dueTime: "16.00",
            taskType: "Assignment"
        },
        {
            title: "English",
            detail: "Midterm Exam 1",
            dueDate: "16 Oct 2024",
            dueTime: "16.00",
            taskType: "Assignment"
        },
        {
            title: "English",
            detail: "Midterm Exam 1",
            dueDate: "12 Oct 2024",
            dueTime: "16.00",
            taskType: "Assignment"
        },
    ]

    console.log(tasks)

    return (
        <div
            className='w-full h-[353px] flex flex-col gap-[15px] mt-[40px] overflow-hidden'
        >
            <div
                className=''
            >
                <p
                    className='font-medium'
                >
                    Task Overview
                </p>
            </div>
            <div>
                <Swiper
                    slidesPerView={4}
                    direction='vertical'
                    spaceBetween={10}
                    mousewheel={true}
                    modules={[Mousewheel]}
                    className="mySwiper w-full h-[315px]"
                >
                    {tasks.map((task, index) => (
                        <SwiperSlide key={index}>
                            <TaskCard
                                title={task.title}
                                detail={task.detail}
                                dueDate={task.dueDate}
                                dueTime={task.dueTime}
                                taskType={task.taskType}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
