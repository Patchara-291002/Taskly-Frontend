'use client'

import React from 'react'
import TaskCard from './TaskCard'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { getTaskToday } from '@/api/home';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TaskOverview() {
    const router = useRouter()
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        try {
            const response = await getTaskToday();
            setTasks(response);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
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
                <div
                    className='w-full h-[315px]'
                >
                    {tasks.length > 0 ? (
                        <Swiper
                            slidesPerView={4}
                            direction='vertical'
                            spaceBetween={10}
                            mousewheel={true}
                            modules={[Mousewheel]}
                            className="mySwiper w-full h-full"
                        >
                            {tasks.map((task, index) => (
                                <SwiperSlide key={index}>
                                    <TaskCard
                                        task={task}
                                        fetchTasks={fetchTasks}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div
                            className='w-full h-full flex flex-col justify-center items-center bg-white border border-grayBorder rounded-[15px]'
                        >
                            <img
                                src={"https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/P1/undraw_task-list_qe3p.png"}
                                alt="No project"
                                className='w-[130px] mb-[10px]'
                            />
                            <p
                                className='font-medium text-[14px] text-[#707070]'
                            >
                                You have no task for team project
                            </p>
                            <button
                                className='px-[16px] py-[4px] bg-primaryOrange rounded-[5px] text-[14px] text-white font-medium mt-[10px]'
                                onClick={() => router.push('/home/project')}
                            >
                                go
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
