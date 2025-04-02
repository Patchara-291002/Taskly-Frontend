'use client'

import { CalendarIcon, CheckIcon, ClockIcon } from "../../icon/DashboardIcon"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AssignmentOverview() {

    const assignments = [
        {
          _id: "67c0256be595168a5d8a7418",
          courseId: "67c02328e595168a5d8a6703",
          assignmentName: "Task 1",
          description: "Create an idea of ...",
          status: "Todo",
          startDate: null,
          endDate: new Date("2025-01-01T00:00:00.000Z"),
          userId: "67a074f671d6bedb6c0b2814",
          links: [],
          createdAt: new Date("2025-01-18T00:08:59.513Z"),
          updatedAt: new Date("2025-01-18T01:00:38.491Z")
        },
        {
          _id: "67c0256be595168a5d8a7418",
          courseId: "67c02328e595168a5d8a6703",
          assignmentName: "Task 1",
          description: "Create an idea of ...",
          status: "Todo",
          startDate: null,
          endDate: new Date("2025-01-01T00:00:00.000Z"),
          userId: "67a074f671d6bedb6c0b2814",
          links: [],
          createdAt: new Date("2025-01-18T00:08:59.513Z"),
          updatedAt: new Date("2025-01-18T01:00:38.491Z")
        },
        {
          _id: "67c0256be595168a5d8a7418",
          courseId: "67c02328e595168a5d8a6703",
          assignmentName: "Task 1",
          description: "Create an idea of ...",
          status: "Todo",
          startDate: null,
          endDate: new Date("2025-01-01T00:00:00.000Z"),
          userId: "67a074f671d6bedb6c0b2814",
          links: [],
          createdAt: new Date("2025-01-18T00:08:59.513Z"),
          updatedAt: new Date("2025-01-18T01:00:38.491Z")
        },
      ]

    return (
        <div
            className="w-full h-[300px] flex flex-col gap-[15px]"
        >
            <p className="font-medium" >Assignment Overview</p>
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
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

const AssignmentCard = ({ assignment }) => {
    return (
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
                    <CheckIcon
                        w={20}
                        h={20}
                        color={"#D6D6D6"}
                    />
                </div>
                <p
                    className="text-[10px] text-[#707070]"
                >
                    {`Subject name: ${"subjectName"}`}
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
                        {/* {assignment.endDate} */}
                    </p>
                </div>
                <div
                    className="flex gap-[7px] items-start"
                >
                    <ClockIcon
                        w={12}
                        h={12}
                        color={"#FF6200"}
                    />
                    <p
                        className="text-[10px] text-[#1F1E1D]"
                    >
                        {"Due time"}
                    </p>
                </div>
            </div>
        </div>
    )
}
