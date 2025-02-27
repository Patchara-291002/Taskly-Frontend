import { useEffect, useState } from "react";
import { AddUserIcon } from "@/app/home/component/icon/GlobalIcon"
import { updateProjectById } from "@/api/project";

export default function ProjectHeader({ project, loadProject }) {

    const [selectedProjectName, setSelectedProjectName] = useState(project?.projectName)
    const projectId = project?._id

    const [isUserHover, setIsUserHover] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (projectId) {
                updateProjectById(projectId, { projectName: selectedProjectName })
                    .then(() => {
                        console.log("Name updated to:", selectedProjectName);
                        loadProject();
                    })
                    .catch((error) => console.error("Error updated name", error))
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [selectedProjectName, projectId, updateProjectById])

    return (
        <div
            className='w-full flex items-center justify-between'
        >
            <input
                type="text"
                value={selectedProjectName}
                onChange={(e) => setSelectedProjectName(e.target.value)}
                className="font-semibold text-[24px] text-primaryorange bg-[#F7F7F7] focus:outline-none"
            />
            <div
                className='flex items-center gap-[10px]'
            >
                <button
                    className='border-[1px] border-primaryorange w-[26px] h-[26px] flex justify-center items-center rounded-full'
                    style={{ background: isUserHover ? '#FF6200' : 'none' }}
                    onMouseEnter={() => setIsUserHover(true)}
                    onMouseLeave={() => setIsUserHover(false)}
                >
                    <AddUserIcon w={14} h={14} color={isUserHover ? 'white' : '#FF6200'} />
                </button>
                <div
                    className='flex -space-x-3'
                >
                    {project && project.users.map((user, index) => (
                        <div key={index} className='w-[26px] h-[26px] rounded-full overflow-hidden'>
                            <img src={user.userId.profile} alt={user.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
