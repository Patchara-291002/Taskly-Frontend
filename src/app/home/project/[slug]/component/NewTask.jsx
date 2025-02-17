import React from 'react';
import { BlurBackground } from '@/app/home/component/GlobalComponent';
import { Input, DatePicker, TimePicker } from 'rsuite';
import "rsuite/dist/rsuite-no-reset.min.css";
import { CrossIcon } from '@/app/home/component/icon/GlobalIcon';

export default function NewTask({ isOpenNewTask, setIsOpenNewTask, task, setTask, statusId, onSubmit }) {

    const handleChange = (name, value) => {
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };



    return (
        <BlurBackground isOpen={isOpenNewTask} onClose={() => setIsOpenNewTask(false)}>
            <div className='flex flex-col justify-between w-[650px] h-[250px] bg-white rounded-[15px] shadow-lg p-[25px]'>
                <div
                    className='w-full flex justify-between items-center'
                >
                    <input
                        type="text"
                        placeholder='Task name'
                        name="taskName"
                        value={task.taskName}
                        onChange={(e) => handleChange("taskName", e.target.value)}
                        className={`font-semibold text-[24px] text-primaryorange bg-transparent focus:outline-none`}
                    />
                    <button
                        onClick={() => setIsOpenNewTask(false)}
                    >
                        <CrossIcon w={13} h={13} color={"black"} />
                    </button>
                </div>
                <div
                    className='w-full flex h-full justify-between items-start'
                >
                    <textarea
                        type="text"
                        value={task.detail}
                        onChange={(e) => handleChange("detail", e.target.value)}
                        className={`font-normal text-[12px] text-black bg-transparent focus:outline-none w-[376px] h-full resize-none`}
                    />
                    <div
                        className='w-[172px] h-full'
                    >
                        <div
                            className='flex gap-[10px]'
                        >
                            <button
                                className='border-4 w-full'
                            >
                                priority
                            </button>
                            <button
                                className='border-4 w-full'
                            >
                                status
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className='w-full'
                >
                    <div
                        className='flex gap-[5px]'
                    >
                        <DatePicker
                            format="yyyy-MM-dd"
                            placeholder="Start Date"
                            value={task.startDate}
                            onChange={(value) => handleChange("startDate", value)}
                            style={{ width: 130 }}
                            size='xs'
                        />
                        <TimePicker
                            format="HH:mm"
                            value={task.startTime}
                            onChange={(value) => handleChange("startTime", value)}
                            style={{ width: 90 }}
                            size='xs'
                        />
                        <DatePicker
                            format="yyyy-MM-dd"
                            placeholder="Due Date"
                            value={task.dueDate}
                            onChange={(value) => handleChange("dueDate", value)}
                            style={{ width: 130 }}
                            size='xs'
                        />
                        <TimePicker
                            format="HH:mm"
                            value={task.dueTime}
                            onChange={(value) => handleChange("dueTime", value)}
                            style={{ width: 90, }}
                            size='xs'
                        />

                    </div>
                    <div
                        className='w-full flex justify-end '
                    >
                        <div
                            className='w-[70px]'
                        >
                            <input
                                placeholder="#000000"
                                value={task.color}
                                onChange={(e) => handleChange("color", e.target.value)}
                                className={` font-normal text-[14px] text-black bg-transparent focus:outline-none`}
                            />
                        </div>
                        <div
                            className='bg-pink'
                        >
                            <button
                                className='bg-primaryorange w-[150px] px-[12px] py-[4px] rounded-full text-white'
                                onClick={onSubmit}
                            >
                                Create task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BlurBackground>
    );
}
