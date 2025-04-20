import { createContent, updateCourseById } from '@/api/course';
import { DayPicker, TimePicker } from '@/app/component/GlobalComponent';
import { LinkIcon, PlusIcon, TrashSolidIcon } from '@/app/home/component/icon/GlobalIcon';
import { useState, useEffect, useCallback, useRef } from 'react';
import { deleteContentInCourse } from '@/api/course';
import style from '@/app/component/Loading.module.css';

export default function CourseInfo({ course, getCourseById }) {

    const [isLoading, setIsLoading] = useState(false);

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
        try {;
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
        <div className='w-full h-[300px]  z-10 bg-white p-[10px] rounded-[15px] border-[1px] border-grayBorder overflow-y-auto overflow-x-auto'>
            {isLoading ? (
                <div
                    className='w-full h-full flex justify-center items-center'
                >
                    <div className={style.loader} />
                </div>
            ) : (
                <table className="table-auto w-full">
                    <colgroup>
                        <col className='w-[160px]' />
                        <col className='w-auto' />
                        <col className='w-[50px]' />
                    </colgroup>
                    <tbody>
                        <TableSchedule label="Schedule" day={coursePayload.day} startTime={coursePayload.startTime} endTime={coursePayload.endTime} onChange={handleChange} />
                        <TableRow label="Subject Code" value={coursePayload.courseCode || ""} onChange={(val) => handleChange("courseCode", val)} />
                        <TableRow label="Instructor" value={coursePayload.instructorName || ""} onChange={(val) => handleChange("instructorName", val)} />
                        <TableRow label="Location" value={coursePayload.location || ""} onChange={(val) => handleChange("location", val)} />
                        <TableContent getCourseById={getCourseById} courseId={coursePayload._id} contents={coursePayload.contents || []} onContentChange={handleContentChange} setIsLoading={setIsLoading} />
                        <NewLink courseId={coursePayload._id} getCourseById={getCourseById} setIsLoading={setIsLoading} />
                    </tbody>
                </table>
            )}
        </div>
    );
}

function TableRow({ label, value, onChange }) {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }, [value]);

    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        onChange(e.target.value);
    };

    return (
        <tr className="border-grayBorder border-b-[1px]">
            <td className="p-[10px] font-medium text-[14px] text-[#5F5F5F]">{label}</td>
            <td className="p-[10px] font-normal text-[14px] text-[#5F5F5F] border-l-[1px] border-grayBorder">
                <textarea
                    ref={textareaRef}
                    className="w-full bg-transparent outline-none resize-none overflow-hidden leading-tight py-[2px]"
                    value={typeof value === "string" ? value : ""}
                    onChange={handleInput}
                    rows={1}
                    style={{ minHeight: '24px' }}
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
                <div className="w-full flex gap-[15px] items-center">
                    <DayPicker selectedDay={day} onChange={(val) => onChange("day", val)} />
                    <TimePicker time={startTime} onChange={(val) => onChange("startTime", val)} />
                    <p> - </p>
                    <TimePicker time={endTime} onChange={(val) => onChange("endTime", val)} />
                </div>
            </td>
        </tr>
    );
}

function TableContent({ contents, onContentChange, courseId, getCourseById, setIsLoading }) {
    const titleRefs = useRef([]);
    const contentRefs = useRef([]);

    useEffect(() => {
        contents.forEach((_, index) => {
            const titleTextarea = titleRefs.current[index];
            const contentTextarea = contentRefs.current[index];

            if (titleTextarea) {
                titleTextarea.style.height = 'auto';
                titleTextarea.style.height = titleTextarea.scrollHeight + 'px';
            }
            if (contentTextarea) {
                contentTextarea.style.height = 'auto';
                contentTextarea.style.height = contentTextarea.scrollHeight + 'px';
            }
        });
    }, [contents]);

    const handleInput = (textarea, index, key, value) => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        onContentChange(index, key, value);
    };

    const handleDeleteContent = async (courseId, contentId) => {
        try {
            setIsLoading(true);
            await deleteContentInCourse(courseId, contentId);
            await getCourseById();
        } catch (error) {
            console.error("❌ Failed to delete assignment:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {contents.map((content, index) => (
                <tr key={index} className="border-grayBorder border-b-[1px]">
                    <td className="p-[10px] font-medium text-[14px] text-[#5F5F5F]">
                        <textarea
                            ref={el => titleRefs.current[index] = el}
                            className="w-full bg-transparent outline-none resize-none overflow-hidden leading-tight py-[2px]"
                            value={content.title}
                            onChange={(e) => handleInput(e.target, index, "title", e.target.value)}
                            rows={1}
                            style={{ minHeight: '24px' }}
                        />
                    </td>
                    <td className="relative p-[10px] font-normal text-[14px] text-[#5F5F5F] border-l-[1px] border-grayBorder">
                        <textarea
                            ref={el => contentRefs.current[index] = el}
                            className={`w-full bg-transparent outline-none resize-none overflow-hidden leading-tight py-[2px] ${content.isLink ? 'text-blue-500 underline' : ''
                                }`}
                            value={content.content}
                            onChange={(e) => handleInput(e.target, index, "content", e.target.value)}
                            rows={1}
                            style={{ minHeight: '24px' }}
                        />
                    </td>
                    <td>
                        <div
                            className='flex justify-center items-center gap-[10px]'
                        >
                            <div
                                onClick={() => onContentChange(index, "isLink", !content.isLink)}
                                className='cursor-pointer'
                            >
                                <LinkIcon
                                    w="12px"
                                    h="12px"
                                    color={content.isLink ? "#FF6200" : "#5F5F5F"}
                                />
                            </div>
                            <button
                                onClick={() => handleDeleteContent(courseId, content._id)}
                            >
                                <TrashSolidIcon w={12} h={12} color="#5F5F5F" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

function NewLink({ courseId, getCourseById, setIsLoading }) {

    const handleCreateContent = async () => {
        try {
            setIsLoading(true);
            await createContent(courseId)
            await getCourseById();
        } catch (error) {
            console.error("❌ Failed to create content:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <tr>
            <td colSpan={2} className="p-[10px] border-b-[1px] border-grayBorder">
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
