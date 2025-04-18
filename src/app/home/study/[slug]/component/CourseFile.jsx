import { useState, useRef } from "react";
import { uploadFileToCourse } from "@/api/course";
import Link from "next/link";
import { deleteFileInCourse } from "@/api/course";
import { TrashSolidIcon } from "@/app/home/component/icon/GlobalIcon";

export default function CourseFile({ course, getCourseById }) {

    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isFileLoading, setIsFileLoading] = useState(false);
    const fileInputRef = useRef(null);

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const handleFiles = async (selectedFiles) => {

        const courseId = course._id

        if (!courseId) {
            console.error("❌ ไม่มี courseId");
            return;
        }

        setIsFileLoading(true)
        const newFiles = Array.from(selectedFiles);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        for (const file of newFiles) {
            try {
                await Promise.all(
                    newFiles.map(async (file) => {
                        await uploadFileToCourse(courseId, file);
                        console.log(`✅ Uploaded: ${file.name}`);
                    })
                );
                getCourseById()
            } catch (error) {
                console.error(`❌ Failed to upload ${file.name}:`, error);
            } finally {
                setIsFileLoading(false);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDeleteFile = async (fileId) => {
        const courseId = course._id

        if (!courseId) {
            console.error
            return;
        }

        try {
            await deleteFileInCourse(courseId, fileId);
            getCourseById()
        } catch (error) {
            console.error(`❌ Failed to delete file ${fileId}:`, error);
        }
    }

    return (
        <div
            className='w-full lg:max-w-[420px] h-[300px] flex flex-col gap-[15px] bg-white border-[1px] border-grayBorder rounded-[15px] p-[15px] overflow-y-auto'
        >
            <div
                className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileDialog}
            >
                <p className="text-[12px] font-medium">
                    {isDragging ? "drag it here." : "Choose a file or drag & drop it here."}
                </p>
                <p
                    className="text-[12px] text-[#5F5F5F]"
                >
                    Up to 10 MB
                </p>
                <div
                    className="border border-primaryOrange rounded-[5px] text-primaryOrange px-[16px] py-[4px] w-fit font-medium text-[12px] mx-auto mt-[15px]"
                >
                    {isFileLoading ? "Uploading..." : "Browse File"}
                </div>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>
            <div
                className="h-full flex flex-col gap-[10px]"
            >
                {course && course.files.length > 0 ? (
                    course && course.files.map((file) => {
                        return (
                            <FileItem
                                key={file._id}
                                file={file}
                                onDelete={() => handleDeleteFile(file._id)}
                            />
                        )
                    })
                ) : (
                    <div
                        className="w-full h-full flex justify-center items-center text-[#D5D5D5] text-[14px] font-semibold"
                    >
                        Import your file to this project
                    </div>
                )}
            </div>
        </div>
    )
}

const FileItem = ({ file, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-full h-[70px] flex justify-between items-center p-[10px] border-grayBorder border-[1px] rounded-[15px]">
            <Link href={file.fileAddress} className="max-w-[250px]" target="_blank" rel="noopener noreferrer">
                <p className="line-clamp-2">{file.fileName}</p>
            </Link>
            <button
                className={`p-2 rounded-full transition-colors hover:bg-red-100`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(file._id);
                }}
            >
                <TrashSolidIcon w={12} h={12} color={isHovered ? "red" : "#CBCBCB"} />
            </button>
        </div>
    );
};
