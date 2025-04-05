import { DayPicker, TimePicker } from '@/app/component/GlobalComponent';
import { LinkIcon, PlusIcon } from '@/app/home/component/icon/GlobalIcon';
import { useState, useEffect } from 'react';
import { AirDatepickerComponent } from "@/app/component/GlobalComponent";
import { updateProjectById, createContent } from '@/api/project';
import Link from 'next/link';

export default function ProjectInfo({ project }) {
    const [projectPayload, setProjectPayload] = useState({
        ...project,
        contents: project?.contents ?? [], // ✅ ป้องกัน undefined
    });

    // ✅ อัปเดตค่าจาก `project` ทันทีที่ component โหลด
    useEffect(() => {
        if (project) {
            setProjectPayload(prev => ({
                ...prev,
                ...project,
                contents: project.contents ?? [],
            }));
        }
    }, [project]);

    // ✅ ใช้ debounce 1 วินาที ก่อนส่ง API (ป้องกัน API spam)
    useEffect(() => {
        if (projectPayload._id) {
            const delay = setTimeout(() => {
                updateProjectById(projectPayload._id, projectPayload);
            }, 1000);

            return () => clearTimeout(delay);
        }
    }, [projectPayload]);

    // ✅ อัปเดตค่าใน `projectPayload`
    const handleChange = (key, value) => {
        setProjectPayload(prev => ({
            ...prev,
            [key]: value ?? "", // ✅ ป้องกัน undefined
        }));
    };

    // ✅ อัปเดต `contents` ใน `projectPayload`
    const handleContentChange = (index, key, value) => {
        setProjectPayload(prev => {
            const updatedContents = [...(prev.contents ?? [])]; // ✅ ป้องกัน undefined
            updatedContents[index] = { ...(updatedContents[index] ?? {}), [key]: value }; // ✅ ป้องกัน object undefined
            return { ...prev, contents: updatedContents };
        });
    };

    return (
        <div className='w-full max-h-[300px] z-10 bg-white p-[10px] rounded-[15px] border-[1px] border-grayBorder overflow-y-auto no-scrollbar'>
            <table className="table-auto w-full">
                <colgroup>
                    <col className='w-[250px]' />
                    <col className='w-auto' />
                </colgroup>
                <tbody>
                    {/* Project Start & Due Date */}
                    <TableSchedule
                        label={"Project Start"}
                        project={projectPayload}
                        onChange={handleChange}
                    />
                    {/* Content List */}
                    <TableContent
                        contents={projectPayload.contents}
                        onContentChange={handleContentChange}
                    />
                    {/* Add New Content */}
                    <NewContent projectId={projectPayload._id} />
                </tbody>
            </table>
        </div>
    );
}

// ✅ Component แสดง `startDate` และ `dueDate`
function TableSchedule({ label, onChange, project }) {
    return (
        <tr className="border-grayBorder border-b-[1px]">
            <td className="p-[10px] font-medium text-[14px] text-[#5F5F5F]">{label}</td>
            <td className="p-[10px] font-normal text-[14px] text-[#5F5F5F] border-l-[1px] border-grayBorder">
                <div className="w-full flex gap-[15px] items-center">
                    <AirDatepickerComponent
                        selectedDate={project?.startDate}
                        onChange={(newDate) => onChange("startDate", newDate)}
                    />
                    -
                    <AirDatepickerComponent
                        selectedDate={project?.dueDate}
                        onChange={(newDate) => onChange("dueDate", newDate)}
                    />
                </div>
            </td>
        </tr>
    );
}

// ✅ Component จัดการ `contents`
function TableContent({ contents, onContentChange }) {
    return (
        <>
            {contents?.map((content, index) => (
                <tr key={index} className="border-grayBorder border-b-[1px]">
                    <td className="p-[10px] font-medium text-[14px] text-[#5F5F5F]">
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none"
                            value={content.title}
                            onChange={(e) => onContentChange(index, "title", e.target.value)}
                        />
                    </td>
                    <td className="relative p-[10px] font-normal text-[14px] text-[#5F5F5F] border-l-[1px] border-grayBorder text-nowrap">
                        {content.isLink ?
                            <Link
                                href={content.content}
                            >
                                <input
                                    type="text"
                                    className={`w-full bg-transparent outline-none ${content.isLink ? "text-blue-500 underline" : ""}`}
                                    value={content.content}
                                    onChange={(e) => onContentChange(index, "content", e.target.value)}
                                />
                            </Link> :
                            <input
                                type="text"
                                className={`w-full bg-transparent outline-none ${content.isLink ? "text-blue-500 underline cursor-pointer" : ""}`}
                                value={content.content}
                                onChange={(e) => onContentChange(index, "content", e.target.value)}
                            />
                        }
                    </td>
                    <td>
                        <div
                            onClick={() => onContentChange(index, "isLink", !content.isLink)}
                            className='cursor-pointer text-[12px]'
                        >
                            {content.isLink ? <LinkIcon w={"12px"} h={"12px"} color={"#3b82f6"} /> : <LinkIcon w={"12px"} h={"12px"} color={"#000000"} />}
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

// ✅ Component เพิ่ม `content` ใหม่
function NewContent({ projectId }) {
    const handleCreateContent = async () => {
        try {
            await createContent(projectId);
        } catch (error) {
            console.error("❌ Failed to create content:", error);
        }
    };

    return (
        <tr>
            <td colSpan={2} className="p-[10px]">
                <div
                    onClick={handleCreateContent}
                    className='w-full flex items-center gap-[5px] cursor-pointer'
                >
                    <PlusIcon w={14} h={14} color={"#FF6200"} />
                    <p className='font-medium text-[14px] text-[#5F5F5F]'>
                        new
                    </p>
                </div>
            </td>
        </tr>
    );
}
