
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { NewButton } from '@/app/home/component/GlobalComponent'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Board from './Board';
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
defineElement(lottie.loadAnimation);


export default function KanbanBoard({ project, setIsOpenNewStatus, setIsOpenNewTask, setStatusId, handleOpenNewTask }) {

    const swiperRef = useRef();
    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };
    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const [isDelete, setIsDelete] = useState(false);

    return (
        <div
            className='w-full touch-none'
        >
            <Swiper
                onSwiper={(swiper => (swiperRef.current = swiper))}
                className='mySwiper'
            >
                <SwiperSlide>
                    <div>
                        <div
                            className='pb-[25px] flex justify-between  w-full '
                        >
                            <div>
                                <NewButton
                                    onClick={() => setIsOpenNewStatus(true)}
                                />
                            </div>
                            <div
                                className='flex gap-[10px]'
                            >
                                {isDelete && (
                                    <lord-icon
                                        src="https://cdn.lordicon.com/lomfljuq.json"
                                        trigger="in"
                                        delay="500"
                                        state="in-check"
                                        colors="primary:#27C400"
                                        style={{ width: 25, height: 25 }}
                                        onClick={() => setIsDelete(false)}
                                    />
                                )}
                                <lord-icon
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    colors={isDelete ? 'primary:#FF0000' : 'primary:#000000'}
                                    style={{ width: 25, height: 25 }}
                                    onClick={() => setIsDelete(true)}
                                />
                            </div>
                        </div>
                        <div
                            className='w-full min-h-[300px] p-[10px] rounded-[15px] border-[1px] border-grayBorder touch-none'
                        >
                            {project && <Board initialProjectData={project} setIsOpenNewTask={setIsOpenNewTask} setStatusId={setStatusId} handleOpenNewTask={handleOpenNewTask} />}
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <h1>
                        Hi
                    </h1>
                </SwiperSlide>
            </Swiper>

        </div>
    )
}
