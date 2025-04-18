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
import { useRouter } from 'next/navigation';

export default function ProjectOverview() {
    const router = useRouter()
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

    return (
        <div
            className='w-full h-[200px]'
        >
            <div
                className='flex flex-row justify-between mb-[20px]'
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

            {projects.length > 0 ? (
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    slidesPerView={3}
                    spaceBetween={15}
                    className="mySwiper"
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index}>
                            <Link href={`/home/project/${project._id}`}>
                                <ProjectCard
                                    project={project}
                                    maxWidth={"none"}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div
                    className='w-full h-full flex flex-col justify-center items-center bg-white border border-grayBorder rounded-[15px]'
                >
                    <img
                        src={"https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/P1/undraw_scrum-board_uqku.png"} 
                        alt="No project"
                       className='w-[130px]  mb-[10px]'
                    />
                    <p
                        className='font-medium text-[14px] text-[#707070]'
                    >
                        Try to create your project
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

    )
}