import { useState, useRef } from "react";
import { uploadFileToProject, deleteFileFromProject } from "@/api/project";
import Link from "next/link";
import { TrashSolidIcon } from "@/app/home/component/icon/GlobalIcon";

export default function ProjectFile({ project, loadProject }) {

    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isFileLoading, setIsFileLoading] = useState(false);
    const fileInputRef = useRef(null);

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const handleFiles = async (selectedFiles) => {

        const projectId = project._id

        if (!projectId) {
            console.error
            return;
        }

        setIsFileLoading(true)
        const newFiles = Array.from(selectedFiles);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        for (const file of newFiles) {
            try {
                await Promise.all(
                    newFiles.map(async (file) => {
                        await uploadFileToProject(projectId, file);
                    })
                );
                loadProject();
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
        const projectId = project._id

        if (!projectId) {
            console.error
            return;
        }

        try {
            await deleteFileFromProject(projectId, fileId);
            loadProject();
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
                <p className="text-gray-500">
                    {isDragging ? "drag it here." : "Choose a file or drag & drop it here."}
                </p>
                {isFileLoading && <p className="text-blue-500">Uploading...</p>}
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>
            <div
                className="flex flex-col gap-[10px]"
            >
                {project && project.files.map((file) => {
                    return (
                        <FileItem
                            key={file._id}
                            file={file}
                            onDelete={() => handleDeleteFile(file._id)}
                        />
                    )
                })}
            </div>
        </div>
    )
}


const FileItem = ({ file, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-full h-[70px] flex justify-between items-center p-[10px] border-grayBorder border-[1px] rounded-[15px]">
            <Link href={file.fileAddress} className="max-w-[250px]">
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