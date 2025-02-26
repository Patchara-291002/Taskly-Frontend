import { createContent, updateCourseById } from '@/api/course';
import { DayPicker, TimePicker } from '@/app/component/GlobalComponent';
import { PlusIcon } from '@/app/home/component/icon/GlobalIcon';
import { useState, useEffect, useCallback } from 'react';

export default function CourseInfo({ course }) {
    const [coursePayload, setCoursePayload] = useState(course || []);
    useEffect(() => {
        if (course) {
            setCoursePayload(course);
        }
    }, [course]);

    const handleChange = (key, value) => {
        setCoursePayload(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleContentChange = (index, key, value) => {
        setCoursePayload(prev => {
            const updatedContents = [...prev.contents];
            updatedContents[index][key] = value;
            return { ...prev, contents: updatedContents };
        });
    };

    const updateCourse = useCallback(async () => {
        if (!coursePayload._id) return;
        try {
            await updateCourseById(coursePayload._id, coursePayload);
        } catch (error) {
            console.error("❌ Failed to update course:", error);
        }
    }, [coursePayload]);

    useEffect(() => {
        const delay = setTimeout(() => {
            updateCourse();
        }, 1000);
        return () => clearTimeout(delay);
    }, [updateCourse]);

    return (
        <div className='w-full z-10 bg-white p-[10px] rounded-[15px] border-[1px] border-grayBorder overflow-y-auto'>
            <table className="table-auto w-full">
                <colgroup>
                    <col className='w-[250px]' />
                    <col className='w-auto' />
                </colgroup>
                <tbody>
                    <TableRow label="Subject Code" value={coursePayload.courseCode || ""} onChange={(val) => handleChange("courseCode", val)} />
                    <TableRow label="Instructor" value={coursePayload.instructorName || ""} onChange={(val) => handleChange("instructorName", val)} />
                    <TableRow label="Location" value={coursePayload.location || ""} onChange={(val) => handleChange("location", val)} />
                    <TableSchedule label="Schedule" day={coursePayload.day} startTime={coursePayload.startTime} endTime={coursePayload.endTime} onChange={handleChange} />
                    <TableContent contents={coursePayload.contents || []} onContentChange={handleContentChange} />
                    <NewLink courseId={coursePayload._id} />
                </tbody>
            </table>
        </div>
    );
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

function TableSchedule({ label, day, startTime, endTime, onChange }) {
    return (
        <tr className="border-grayBorder border-b-[1px]">
            <td className="p-[10px] font-medium text-[14px] text-[#5F5F5F]">{label}</td>
            <td className="p-[10px] font-normal text-[14px] text-[#5F5F5F] border-l-[1px] border-grayBorder">
                <div className="w-full flex gap-[15px] items-center border-2">
                    <DayPicker selectedDay={day} onChange={(val) => onChange("day", val)} />
                    <TimePicker time={startTime} onChange={(val) => onChange("startTime", val)} />
                    <p> - </p>
                    <TimePicker time={endTime} onChange={(val) => onChange("endTime", val)} />
                </div>
            </td>
        </tr>
    );
}

function TableContent({ contents, onContentChange }) {
    return (
        <>
            {contents.map((content, index) => (
                <tr key={index} className="border-grayBorder border-b-[1px]">
                    <td className="p-[10px] font-medium text-[14px] text-[#5F5F5F]">
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none"
                            value={content.title}
                            onChange={(e) => onContentChange(index, "title", e.target.value)}
                        />
                    </td>
                    <td className="relative p-[10px] font-normal text-[14px] text-[#5F5F5F] border-l-[1px] border-grayBorder">
                        {content.isLink ? (
                            <input
                                type="text"
                                className="w-full bg-transparent outline-none text-blue-500 underline"
                                value={content.content}
                                onChange={(e) => onContentChange(index, "content", e.target.value)}
                            />
                        ) : (
                            <input
                                type="text"
                                className="w-full bg-transparent outline-none"
                                value={content.content}
                                onChange={(e) => onContentChange(index, "content", e.target.value)}
                            />
                        )}
                        <div
                            onClick={() => onContentChange(index, "isLink", !content.isLink)}
                            className='absolute right-0 top-[30%] cursor-pointer'
                        >
                            {content.isLink ? "Unlink" : "Make Link"}
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

function NewLink({ courseId }) {

    const handleCreateContent = async () => {
        try {
            await createContent(courseId)
        } catch (error) {
            console.error("❌ Failed to create content:", error);
        }
    }

    return (
        <tr>
            <td colSpan={2} className="p-[10px]">
                <div
                    onClick={handleCreateContent}
                    className='w-full flex items-center gap-[5px] cursor-pointer'
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
