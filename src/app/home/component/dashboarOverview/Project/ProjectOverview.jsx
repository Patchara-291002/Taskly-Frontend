'use client'

import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { LeftArrowIcon, RightArrowIcon } from '../../icon/DashboardIcon'
import { fetchProjectsByUser, createProject } from '@/api/project';
import { useRef } from 'react';
import Link from 'next/link';

export default function ProjectOverview() {

    const [projects, setProjects] = useState([])

    useEffect(() => {

        const getProjects = async () => {
            try {
                const data = await fetchProjectsByUser()
                setProjects(data)
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        }

        getProjects();
    }, [])



    const swiperRef = useRef();

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };


    const chunkedProjects = [];
    for (let i = 0; i < projects.length; i += 3) {
        chunkedProjects.push(projects.slice(i, i + 3));
    }

    return (
        <div
            className='max-h-[202px] min-h-min w-full h-full mt-[68px]'
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
                        <div className='w-full h-full grid grid-cols-3 gap-[15px]'>
                            {group.map((project, i) => (
                                <Link
                                    key={i}
                                    href={`/home/project/${project._id}`}
                                >
                                    <ProjectCard
                                        project={project}
                                        maxWidth={350}
                                    />
                                </Link>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}