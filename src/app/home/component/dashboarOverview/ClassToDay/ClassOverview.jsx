'use client'

import React, { useState, useEffect } from 'react'
import ClassCard from './ClassCard'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getClassToday } from '@/api/home';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ClassOverview() {
    const router = useRouter();

    const [classToday, setClassToday] = useState([])

    const fetchClassToday = async () => {
        try {
            const data = await getClassToday()
            setClassToday(data)
        } catch (error) {
            console.error('Error loading class today:', error);
        }
    }

    useEffect(() => {
        fetchClassToday()
    }, []);

    function formatTimePeriod(statTime, endTime) {
        const time = `${statTime} - ${endTime}`
        return time;
    }


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
            {classToday.length > 0 ? (
                <Swiper
                    slidesPerView={2}
                    direction='vertical'
                    spaceBetween={10}
                    mousewheel={true}
                    modules={[Mousewheel]}
                    className="mySwiper w-full h-full"
                >
                    {classToday.map((classItem, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                href={`/home/study/${classItem._id}`}
                            >
                                <ClassCard
                                    subjectName={classItem.courseName}
                                    dueDate={classItem.day}
                                    period={formatTimePeriod(classItem.startTime, classItem.endTime)}
                                    color={classItem.courseColor}
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
                        src={"https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/P1/undraw_educator_6dgp.png"}
                        alt="No project"
                        className='w-[130px] mb-[10px]'
                    />
                    <p
                        className='font-medium text-[14px] text-[#707070]'
                    >
                        Add your schedule class
                    </p>
                    <button
                        className='px-[16px] py-[4px] bg-primaryOrange rounded-[5px] text-[14px] text-white font-medium mt-[10px]'
                        onClick={() => router.push('/home/study')}
                    >
                        go
                    </button>
                </div>
            )}
        </div>
    )
}
