'use client'

import { CalendarIcon, CheckIcon, ClockIcon } from "../../icon/DashboardIcon"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { getAssignmentToday, makeDoneAssignment } from "@/api/home";
import Link from "next/link";
import { useRouter } from "next/navigation";
import style from "@/app/component/Loading.module.css"

export default function AssignmentOverview() {
    const router = useRouter();

    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchAssignments = async () => {
        try {
            setLoading(true)
            const response = await getAssignmentToday();
            setAssignments(response);
        } catch (error) {
            console.error("Error fetching assignments:", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, [])

    // const assignments = [
    //     {
    //       _id: "67c0256be595168a5d8a7418",
    //       courseId: "67c02328e595168a5d8a6703",
    //       assignmentName: "Task 1",
    //       description: "Create an idea of ...",
    //       status: "Todo",
    //       startDate: null,
    //       endDate: new Date("2025-01-01T00:00:00.000Z"),
    //       userId: "67a074f671d6bedb6c0b2814",
    //       links: [],
    //       createdAt: new Date("2025-01-18T00:08:59.513Z"),
    //       updatedAt: new Date("2025-01-18T01:00:38.491Z")
    //     },
    //     {
    //       _id: "67c0256be595168a5d8a7418",
    //       courseId: "67c02328e595168a5d8a6703",
    //       assignmentName: "Task 1",
    //       description: "Create an idea of ...",
    //       status: "Todo",
    //       startDate: null,
    //       endDate: new Date("2025-01-01T00:00:00.000Z"),
    //       userId: "67a074f671d6bedb6c0b2814",
    //       links: [],
    //       createdAt: new Date("2025-01-18T00:08:59.513Z"),
    //       updatedAt: new Date("2025-01-18T01:00:38.491Z")
    //     },
    //     {
    //       _id: "67c0256be595168a5d8a7418",
    //       courseId: "67c02328e595168a5d8a6703",
    //       assignmentName: "Task 1",
    //       description: "Create an idea of ...",
    //       status: "Todo",
    //       startDate: null,
    //       endDate: new Date("2025-01-01T00:00:00.000Z"),
    //       userId: "67a074f671d6bedb6c0b2814",
    //       links: [],
    //       createdAt: new Date("2025-01-18T00:08:59.513Z"),
    //       updatedAt: new Date("2025-01-18T01:00:38.491Z")
    //     },
    //   ]

    return (
        <div
            className="w-full h-[300px] flex flex-col gap-[15px]"
        >
            <p className="font-medium" >Assignment Overview</p>
            {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <div className={style.loader} />
                </div>
            ) : (
                assignments.length > 0 ? (
                    <Swiper
                        slidesPerView={2}
                        direction='vertical'
                        spaceBetween={10}
                        mousewheel={true}
                        modules={[Mousewheel]}
                        className="mySwiper w-full h-full"
                    >
                        {assignments.map((assignment, index) => (
                            <SwiperSlide key={index}>
                                <AssignmentCard
                                    assignment={assignment}
                                    fetchAssignments={fetchAssignments}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div
                        className='w-full h-full flex flex-col justify-center items-center bg-white border border-grayBorder rounded-[15px]'
                    >
                        <img
                            src={"https://my-image-uploader-bucket.s3.ap-southeast-2.amazonaws.com/P1/undraw_project-completed_fwjq.png"}
                            alt="No project"
                            className='w-[130px] mb-[10px]'
                        />
                        <p
                            className='font-medium text-[14px] text-[#D4D4D4]'
                        >
                            Create your assignment
                        </p>
                        <button
                            className='px-[16px] py-[4px] bg-primaryOrange rounded-[5px] text-[14px] text-white font-medium mt-[10px]'
                            onClick={() => router.push('/home/study')}
                        >
                            go
                        </button>
                    </div>
                )
            )}
        </div>
    )
}

const AssignmentCard = ({ assignment, fetchAssignments }) => {

    const [isCheckButtonActive, setIsCheckButtonActive] = useState(false);

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    const formatTime = (date) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        return new Date(date).toLocaleTimeString('en-US', options);
    }

    const handleDoneAssignment = async () => {
        try {
            const response = await makeDoneAssignment(assignment._id);
            fetchAssignments();
        } catch (error) {
            console.error("Error marking assignment as done:", error);
        }
    }

    const courseId = assignment.course?.id;

    return (
        <Link
            href={courseId ? `/home/study/${courseId}` : "#"}
        >
            <div
                className="flex flex-col justify-between w-full min-h-[120px] bg-white border border-grayBorder rounded-[15px] p-[15px] gap-[15px]"
            >
                <div
                    className="flex flex-col gap-[5px]"
                >
                    <div
                        className="w-full flex justify-between items-center"
                    >
                        <p>{assignment.assignmentName}</p>
                        <button
                            onMouseEnter={() => setIsCheckButtonActive(true)}
                            onMouseLeave={() => setIsCheckButtonActive(false)}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleDoneAssignment();
                            }}
                        >
                            <CheckIcon
                                w={20}
                                h={20}
                                color={isCheckButtonActive ? "#27C400" : "#D6D6D6"}
                            />
                        </button>
                    </div>
                    <p
                        className="text-[10px] text-[#707070]"
                    >
                        {`Subject name: ${assignment.course?.name || 'Empty'}`}
                    </p>
                </div>
                <div
                    className="flex flex-col gap-[5px]"
                >
                    <div
                        className="flex gap-[7px] items-start"
                    >
                        <CalendarIcon
                            w={12}
                            h={12}
                            color={"#FF6200"}
                        />
                        <p
                            className="text-[10px] text-[#1F1E1D]"
                        >
                            {formatDate(assignment.endDate)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
