import { useEffect, useState } from "react";
import { AddUserIcon } from "@/app/home/component/icon/GlobalIcon";
import { updateProjectById } from "@/api/project";
import { AirDatepickerComponent } from "@/app/component/GlobalComponent";

export default function ProjectHeader({ project, loadProject }) {
    const [projectData, setProjectData] = useState({
        projectName: '',
        startDate: '',
        dueDate: ''
    });
    const [isUserHover, setIsUserHover] = useState(false);

    // Sync with project props
    useEffect(() => {
        if (project) {
            setProjectData({
                projectName: project.projectName || '',
                startDate: project.startDate || '',
                dueDate: project.dueDate || ''
            });
        }
    }, [project]);

    // Auto-save with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (project?._id) {
                updateProjectById(project._id, projectData)
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [projectData, project?._id]);

    // Generic change handler
    const handleChange = (field, value) => {
        setProjectData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className='w-full flex items-center justify-between'>
            <div className="flex w-full items-center gap-[15px]">
                <input
                    type="text"
                    value={projectData.projectName}
                    onChange={(e) => handleChange('projectName', e.target.value)}
                    className="w-full font-semibold text-[24px] text-primaryorange bg-[#F7F7F7] focus:outline-none"
                    placeholder="Enter project name"
                />
            </div>
            <div
                className="flex items-center gap-[15px]"
            >
                <div className="flex w-full items-center gap-[10px]">
                    <div className="flex items-center gap-[5px]">
                        <span className="text-gray-500">Start:</span>
                        <AirDatepickerComponent
                            selectedDate={projectData.startDate}
                            onChange={(value) => handleChange('startDate', value)}
                        />
                    </div>
                    <div className="flex items-center gap-[5px]">
                        <span className="text-gray-500">Due:</span>
                        <AirDatepickerComponent
                            selectedDate={projectData.dueDate}
                            onChange={(value) => handleChange('dueDate', value)}
                        />
                    </div>
                </div>
                <div className='flex items-center gap-[10px]'>
                    <button
                        className='border-[1px] border-primaryorange w-[26px] h-[26px] flex justify-center items-center rounded-full transition-colors duration-200'
                        style={{ background: isUserHover ? '#FF6200' : 'none' }}
                        onMouseEnter={() => setIsUserHover(true)}
                        onMouseLeave={() => setIsUserHover(false)}
                    >
                        <AddUserIcon
                            w={14}
                            h={14}
                            color={isUserHover ? 'white' : '#FF6200'}
                        />
                    </button>
                    <div className='flex -space-x-3'>
                        {project?.users?.map((user, index) => (
                            <div
                                key={user.userId._id || index}
                                className='w-[26px] h-[26px] rounded-full overflow-hidden border-2 border-white'
                            >
                                <img
                                    src={user.userId.profile}
                                    alt={user.userId.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}