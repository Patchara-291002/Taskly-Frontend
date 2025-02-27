import { getTaskById } from '@/api/task'
import { DayPicker } from '@/app/component/GlobalComponent'
import { useEffect, useState } from 'react'

export default function TaskCard({ selectedTask, setSelectedTask, setOpenTask }) {

    const [taskPayload, setTaskPayload] = useState([])

    useEffect(() => {
        const getTask = async () => {
            try {
                const data = await getTaskById(selectedTask)
                setTaskPayload(data.task)
                console.log(data)
            } catch (error) {
                console.error("error", error)
            }
        }
        getTask()
    }, [selectedTask])

    return (
        <div className='fixed inset-0 bg-black/60 z-[60]'>
            {/* Overlay ที่คลิกจะปิด modal */}
            <div
                className='absolute w-full h-full'
                onClick={() => setOpenTask(false)}
            ></div>
            {/* Modal Content: เมื่อคลิกใน modal จะไม่ปิด */}
            {taskPayload &&
                <>
                    <div
                        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[378px] bg-white rounded-[15px] p-[25px] '
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className='w-full flex justify-between items-center'
                        >
                            <input
                                type='text'
                                value={taskPayload.taskName}
                                className='bg-white'
                            />
                        </div>
                        <div
                        className='w-full'
                    >
                        <div
                            className=''
                        >
                            DueDate
                            <DayPicker />
                        </div>
                    </div>
                    </div>
                </>
            }
        </div>
    )
}
