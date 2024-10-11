'use client'

import React from 'react'
import ProjectCard from './ProjectCard'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { LeftArrowIcon, RightArrowIcon } from '../icon/DashboardIcon'
import { useRef } from 'react';

export default function ProjectOveriew() {

    const swiperRef = useRef();

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const projects = [
        {
            projectName: "Project 1",
            day: 30,
            month: "Sep",
            percent: 70,
            usersProfile: [
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            ]
        },
        {
            projectName: "Project 2",
            day: 29,
            month: "Sep",
            percent: 40,
            usersProfile: [
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            ]
        },
        {
            projectName: "Project 2",
            day: 29,
            month: "Sep",
            percent: 40,
            usersProfile: [
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            ]
        },
        {
            projectName: "Project 2",
            day: 29,
            month: "Sep",
            percent: 40,
            usersProfile: [
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            ]
        },
        {
            projectName: "Project 2",
            day: 29,
            month: "Sep",
            percent: 40,
            usersProfile: [
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            ]
        },
    ];

    const chunkedProjects = [];
    for (let i = 0; i < projects.length; i += 3) {
        chunkedProjects.push(projects.slice(i, i + 3));
    }

    return (
        <div
            className='max-w-[632px] max-h-[202px] min-h-min w-full h-full'
        >
            <div
                className='w-full flex flex-row justify-between mb-[20px]'
            >
                <h2 className='text-black font-medium'>
                    Project Overview
                </h2>
                <div
                    className='flex gap-[15px] items-center'
                >
                    <button
                        className='w-[20px] h-[20px] flex justify-center items-center bg-white border-[1px] border-black rounded-full'
                        onClick={handlePrev}
                    >
                        <LeftArrowIcon w='12px' color='black' />
                    </button>
                    <button
                        className='w-[20px] h-[20px] flex justify-center items-center bg-white border-[1px] border-black rounded-full'
                        onClick={handleNext}
                    >
                        <RightArrowIcon w='12px' color='black' />
                    </button>
                </div>
            </div>

            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="mySwiper"
            >
                {chunkedProjects.map((group, index) => (
                    <SwiperSlide key={index}>
                        <div className='w-full h-full flex gap-[15px]'>
                            {group.map((project, i) => (
                                <ProjectCard
                                    key={i}
                                    projectName={project.projectName}
                                    day={project.day}
                                    month={project.month}
                                    usersProfile={project.usersProfile}
                                    percent={project.percent}
                                />
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}