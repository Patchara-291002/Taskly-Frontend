import { useEffect, useState, useRef } from "react";
import { AddUserIcon, EditIcon, LinkIcon } from "@/app/home/component/icon/GlobalIcon";
import { updateProjectById, updateUserRole } from "@/api/project";
import { AirDatepickerComponent } from "@/app/component/GlobalComponent";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindow";

export default function ProjectHeader({ project, loadProject }) {
    const [projectData, setProjectData] = useState({
        projectName: '',
        startDate: '',
        dueDate: ''
    });
    const [isUserHover, setIsUserHover] = useState(false);

    const [isMemberOpen, setIsMemberOpen] = useState(false);

    const { width } = useWindowSize();

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

    const handleOpenMemberCard = () => {
        loadProject();
        setIsMemberOpen(true);
    }

    return (
        <>
            <div className='w-full flex items-center justify-between'>
                <div className="flex w-full items-center gap-[5px]">
                    <EditIcon w={14} h={14} color={"#FF6200"} />
                    <input
                        type="text"
                        value={projectData.projectName}
                        onChange={(e) => handleChange('projectName', e.target.value)}
                        className="w-full font-semibold text-[24px] text-primaryOrange bg-[#F7F7F7] focus:outline-none"
                        placeholder="Enter project name"
                    />
                </div>
                <div className='flex items-center gap-[10px]'>
                    <button
                        className='border-[1px] border-primaryorange w-[26px] h-[26px] flex justify-center items-center rounded-full transition-colors duration-200'
                        style={{ background: isUserHover ? '#FF6200' : 'none' }}
                        onMouseEnter={() => setIsUserHover(true)}
                        onMouseLeave={() => setIsUserHover(false)}
                        onClick={handleOpenMemberCard}
                    >
                        <AddUserIcon
                            w={14}
                            h={14}
                            color={isUserHover ? 'white' : '#FF6200'}
                        />
                    </button>
                    {width > 460 ? (
                        <div className='flex -space-x-3'>
                            {project?.users?.slice(0, 10).map((user, index) => (
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
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div
                className="w-full flex justify-end"
            >
                <div className="flex items-center gap-[10px] mt-[20px]">
                    <div className="relative">
                        <span className="text-[#5F5F5F] text-[12px] absolute top-[-20px]">start</span>
                        <AirDatepickerComponent
                            selectedDate={projectData.startDate}
                            onChange={(value) => handleChange('startDate', value)}
                        />
                    </div>

                    <div className="relative">
                        <span className="text-[#5F5F5F] text-[12px] absolute top-[-20px]">due</span>
                        <AirDatepickerComponent
                            selectedDate={projectData.dueDate}
                            onChange={(value) => handleChange('dueDate', value)}
                        />
                    </div>
                </div>
            </div>
            {isMemberOpen && (
                <MemberCard
                    users={project.users}
                    project={project}
                    setIsMemberOpen={setIsMemberOpen}
                    loadProject={loadProject}
                />
            )}
        </>
    );
}

const MemberCard = ({ users, project, setIsMemberOpen, loadProject }) => {

    const [openRoleMenu, setOpenRoleMenu] = useState(null);

    const findProjectRole = (user) => {
        if (!user.projectRole?.roleId) return null;
        const projectRole = project.roles.find(r => r.roleId === user.projectRole.roleId);
        return projectRole || null;
    };

    const handleRoleChange = async (userId, roleId) => {
        try {
            await updateUserRole(project._id, userId, roleId);
            loadProject();
            setOpenRoleMenu(null);
        } catch (error) {
            console.error('Failed to update role:', error);
        }
    };

    const modalRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Lock scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Handle click outside
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsMemberOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsMemberOpen]);

    const handleCopyLink = () => {
        // สร้าง URL จาก window.location หรือ process.env
        const projectLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/home/project/${project._id}`;

        // Copy to clipboard
        navigator.clipboard.writeText(projectLink)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    return (
        <div className="fixed inset-0 z-[999] bg-[#000000]/[0.5] flex items-center justify-center">
            <div
                ref={modalRef}
                className="flex flex-col w-full max-w-[600px] h-[350px] bg-white rounded-[15px] p-[25px]"
            >
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-[20px] text-primaryOrange">
                        Member
                    </p>
                    <button
                        className="flex items-center gap-[3px]"
                        onClick={handleCopyLink}
                    >
                        <LinkIcon w={12} h={12} color={"#FF6200"} />
                        <p className="font-medium text-[12px] text-primaryOrange">
                            {copied ? "Copied!" : "Invite Link"}
                        </p>
                    </button>
                </div>
                <div
                    className="mt-[25px]"
                >
                    <p
                        className="font-medium text-[14px]"
                    >
                        Who has access
                    </p>
                </div>
                <div className="w-full h-full py-[5px] pr-[5px] flex flex-col gap-[20px]">
                    {users.map((user, index) => (
                        <div key={user.userId._id || index} className="flex justify-between items-center">
                            <div className="flex items-center gap-[12px]">
                                <Image
                                    src={user.userId.profile}
                                    width={28}
                                    height={28}
                                    alt={user.userId.name || 'User profile'}
                                    className="rounded-full"
                                />
                                <div className="flex flex-col">
                                    <p className="text-[12px]">{user.userId.name}</p>
                                    <p className="text-[10px] text-gray-500">{user.role}</p>
                                </div>
                            </div>
                            {/* Project Role Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setOpenRoleMenu(openRoleMenu === user.userId._id ? null : user.userId._id)}
                                    className={`px-3 py-1 text-[12px] rounded-md ${findProjectRole(user)
                                        ? 'text-white'
                                        : 'text-[#5F5F5F] border border-[#D6D6D6]'
                                        }`}
                                    style={{
                                        backgroundColor: findProjectRole(user)?.color || 'transparent'
                                    }}
                                >
                                    {findProjectRole(user)?.name || 'No role'}
                                </button>

                                {openRoleMenu === user.userId._id && (
                                    <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                                        <button
                                            className="w-full px-4 py-2 text-left text-[12px] text-[#5F5F5F] hover:bg-gray-50 border-b border-gray-200"
                                            onClick={() => handleRoleChange(user.userId._id, null)}
                                        >
                                            No role
                                        </button>
                                        {project.roles.map((role) => (
                                            <button
                                                key={role.roleId}
                                                className="w-full px-4 py-2 text-left text-[12px] hover:bg-gray-50 flex items-center justify-between"
                                                onClick={() => handleRoleChange(user.userId._id, role.roleId)}
                                            >
                                                <span>{role.name}</span>
                                                <span
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: role.color }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="w-full flex justify-end "
                >
                    <button
                        className="py-[7px] px-[20px] bg-primaryOrange text-white rounded-[5px] text-[12px]"
                        onClick={() => setIsMemberOpen(false)}
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
    )
}