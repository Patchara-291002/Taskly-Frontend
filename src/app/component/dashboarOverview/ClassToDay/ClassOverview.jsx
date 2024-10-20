'use client'

import React from 'react'
import ClassCard from './ClassCard'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ClassOverview() {

    const subjects = [
        {
            subjectName: "Photograph",
            dueDate: "Friday",
            period: "13:30 - 15:30"
        },
        {
            subjectName: "Photograph",
            dueDate: "Friday",
            period: "13:30 - 15:30"
        },
        {
            subjectName: "Photograph",
            dueDate: "Friday",
            period: "13:30 - 15:30"
        },
        {
            subjectName: "Photograph",
            dueDate: "Friday",
            period: "13:30 - 15:30"
        },
        {
            subjectName: "Photograph",
            dueDate: "Friday",
            period: "13:30 - 15:30"
        },
    ]

    return (
        <div
            className='w-full h-[220px] flex flex-col justify-between gap-[10px] overflow-hidden'
        >
            <div>
                <p
                    className='font-medium'
                >
                    Class Today
                </p>
            </div>
            <Swiper
                slidesPerView={2}
                direction='vertical'
                spaceBetween={10}
                mousewheel={true}
                modules={[Mousewheel]}
                className="mySwiper w-full"
            >
                {subjects.map((subject, index) => (
                    <SwiperSlide key={index}>
                        <ClassCard
                            subjectName={subject.subjectName}
                            dueDate={subject.dueDate}
                            period={subject.period}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
