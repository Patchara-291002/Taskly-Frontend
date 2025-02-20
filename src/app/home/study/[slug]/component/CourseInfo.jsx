import { PlusIcon } from '@/app/home/component/icon/GlobalIcon';
import { useState } from 'react'
import { DatePicker, Stack } from 'rsuite';


export default function CourseInfo({ course }) {

    const [coursePayload, setCoursePayload] = useState(course);

    const handleChange = (key, value) => {
        setCoursePayload(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div
            className='w-full bg-white z-1 overflow-y-scroll p-[10px] rounded-[15px] border-[1px] border-grayBorder'
        >
            <table className="table-auto w-full">
                <colgroup>
                    <col className='w-[250px]' />
                    <col className='w-auto' />
                </colgroup>
                <tbody>
                    <TableRow
                        label="Subject Code"
                        value={coursePayload?.courseCode || "Empty"}
                        onChange={(val) => handleChange("courseCode", val)}
                    />
                    <TableRow
                        label="Instructor"
                        value={course?.instructor?.name || "Empty"}
                        onChange={(val) => handleChange("instructorName", val)}
                    />
                    <TableRow
                        label="Location"
                        value={course?.location || "Empty"}
                        onChange={(val) => handleChange("location", val)}
                    />
                    <TableSchedule
                        label="Schedule"
                        day={course?.day || "day"}
                        onChange={(val) => handleChange("day", val)}
                    />
                    <TableRow
                        label="Links"
                        value={course?.links?.length ? <a href={course.links[0]}>View</a> : "Empty"}
                    />
                    <NewLink />
                </tbody>
            </table>
        </div>
    )
}

function TableRow({ label, value, onChange }) {
    return (
        <tr className="border-grayBorder border-b-[1px]">
            <td className="p-[10px] font-medium text-[14px] text-[#5F5F5F]">{label}</td>
            <td className="p-[10px] font-normal text-[14px] text-[#5F5F5F] border-l-[1px] border-grayBorder">
                <input
                    type="text"
                    className="w-full bg-transparent outline-none"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            </td>
        </tr>
    );
}

function TableSchedule({ label, day, onChange }) {
    const [selectedDay, setSelectedDay] = useState(day);
    const [open, setOpen] = useState(false);

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday", // *แก้ไข Wensday เป็น Wednesday*
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    return (
        <tr className="border-grayBorder border-b-[1px]">
            <td className="p-[10px] font-medium text-[14px] text-[#5F5F5F]">
                {label}
            </td>
            <td className="p-[10px] font-normal text-[14px] text-[#5F5F5F] border-l-[1px] border-grayBorder">
                <div className="w-full flex gap-[15px]">
                    <div
                        className='relative'
                    >
                        <button
                            className="bg-white border-[1px] border-grayBorder px-[6px] min-h-0 h-[25px]"
                            onClick={() => setOpen(!open)}
                        >
                            {selectedDay}
                        </button>

                        {open && (
                            <ul className="absolute left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md w-52 p-2 z-40">
                                {days.map((d) => (
                                    <li
                                        key={d}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedDay(d);
                                            onChange(d);
                                            setOpen(false);
                                        }}
                                    >
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <DatePicker format="HH:mm" />
                    </div>
                </div>
            </td>
        </tr>
    );
}


function NewLink() {
    return (
        <tr>
            <td colSpan={2} className="p-[10px]">
                <div
                    className='w-full flex items-center gap-[5px]'
                >
                    <PlusIcon w={14} h={14} color={"#FF6200"} />
                    <p
                        className='font-medium text-[14px] text-[#5F5F5F]'
                    >
                        new
                    </p>
                </div>
            </td>
        </tr>
    )
}
