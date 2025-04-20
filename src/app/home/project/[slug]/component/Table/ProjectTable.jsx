import { useState, useEffect, useCallback, useRef } from "react";
import { PlusIcon, TrashIcon, TrashSolidIcon } from "@/app/home/component/icon/GlobalIcon";
import { AirDatepickerComponent, PrjRolePicker, StdStatusPicker, PrjPriorityPicker } from "@/app/component/GlobalComponent";
// import { updateAssignment, createAssignment } from "@/api/course"
import { updateTask, createTask } from "@/api/task";
import { createStatus } from "@/api/status";
import PrjStatusPicker from "@/app/component/GlobalComponent/PrjStatusPicker";
import { Aa, Calendar, Priority, Role, Status } from "@/app/component/GlobalIcon";
import { deleteTask } from "@/api/task";
import style from "@/app/component/Loading.module.css"

export default function ProjectTable({ project, loadProject }) {
    const [taskPayload, setTaskPayload] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const taskNameUpdateTimer = useRef(null);

    useEffect(() => {
        if (project?.tasks) {
            setTaskPayload(project.tasks);
        }
    }, [project]);

    const handleTaskNameChange = (id, value) => {
        setTaskPayload(prev =>
            prev.map(task =>
                task._id === id ? { ...task, taskName: value } : task
            )
        );

        if (taskNameUpdateTimer.current) {
            clearTimeout(taskNameUpdateTimer.current);
        }

        taskNameUpdateTimer.current = setTimeout(async () => {
            try {
                await updateTask(id, { taskName: value });
            } catch (error) {
                console.error("❌ Failed to update task name:", error);
            }
        }, 1000);
    };

    const handleImmediateChange = async (id, key, value) => {
        try {
            setIsUpdating(true);
            setTaskPayload(prev =>
                prev.map(task =>
                    task._id === id ? { ...task, [key]: value } : task
                )
            );

            await updateTask(id, { [key]: value });
            await loadProject();
        } catch (error) {
            console.error(`❌ Failed to update task ${key}:`, error);
        } finally {
            setIsUpdating(false);
        }
    };

    const newTask = async () => {
        try {
            setIsUpdating(true);
            let statusId = project.statuses?.[0]?._id;

            if (!statusId) {
                const newStatus = await createStatus(project._id, "New status", "#D6D6D6");
                if (!newStatus?._id) {
                    throw new Error("Failed to create status");
                }
                statusId = newStatus._id;
            }

            const defaultRole = project.roles?.[0]?.roleId;

            await createTask({
                projectId: project._id,
                statusId: statusId,
                roleId: defaultRole,
                taskName: "Empty",
                detail: "Empty",
                priority: 1,
                startDate: null,
                dueDate: null,
                startTime: null,
                dueTime: null,
                assignees: [],
            });

            // Add delay before reloading
            await new Promise(resolve => setTimeout(resolve, 1000));
            await loadProject();
        } catch (error) {
            console.error("❌ Failed to create task:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        return () => {
            if (taskNameUpdateTimer.current) {
                clearTimeout(taskNameUpdateTimer.current);
            }
        };
    }, []);


    return (
        <div className="relative w-full h-[400px] bg-white border border-grayBorder overflow-x-scroll p-[10px] rounded-[15px]">
            {isUpdating ? (
                <div className="absolute w-full h-full flex justify-center items-center bg-white">
                    <div className={style.loader} />
                </div>
            ) : (
                <div className="w-full min-w-[1024px] ">
                    <table className="table-fixed w-full border-collapse">
                        <colgroup>
                            <col className="w-auto" />
                            <col className="max-w-[70px]" />
                            <col className="max-w-[70px]" />
                            <col className="max-w-[70px]" />
                            <col className="w-[180px]" />
                            <col className="w-[180px]" />
                            <col className="w-[40px]" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                    <div
                                        className="flex items-end gap-[3px] "
                                    >
                                        <Aa w={22} h={22} color={"#FF6200"} />
                                        <p className="font-normal text-[14px] text-[#5F5F5F]">name of task</p>
                                    </div>
                                </th>
                                <th className="py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                    <div
                                        className="flex items-end gap-[3px] "
                                    >
                                        <Role w={19} h={19} color={"#FF6200"} />
                                        <p className="font-normal text-[14px] text-[#5F5F5F]">role</p>
                                    </div>
                                </th>
                                <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                    <div
                                        className="flex items-end gap-[3px] "
                                    >
                                        <Priority w={19} h={19} color={"#FF6200"} />
                                        <p className="font-normal text-[14px] text-[#5F5F5F]">priorty</p>
                                    </div>
                                </th>
                                <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                    <div
                                        className="flex items-end gap-[3px] "
                                    >
                                        <Status w={20} h={20} color={"#FF6200"} />
                                        <p className="font-normal text-[14px] text-[#5F5F5F]">status</p>
                                    </div>
                                </th>
                                <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                    <div
                                        className="flex items-center gap-[3px] "
                                    >
                                        <Calendar w={17} h={17} color={"#FF6200"} />
                                        <p className="font-normal text-[14px] text-[#5F5F5F]">start date</p>
                                    </div>
                                </th>
                                <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-grayBorder">
                                    <div
                                        className="flex items-center gap-[3px] "
                                    >
                                        <Calendar w={17} h={17} color={"#FF6200"} />
                                        <p className="font-normal text-[14px] text-[#5F5F5F]">due date</p>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="border-b-[1px] border-grayBorder"
                        >
                            {taskPayload.length === 0 ? (
                                emptyTable()
                            ) : (
                                taskPayload.map((task, index) => (
                                    <tr key={index}>
                                        {/* Name of Assignment */}
                                        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-l-0">
                                            <div
                                                className="flex items-center gap-[5px]"
                                            >
                                                <p className="font-normal">{index + 1}.</p>
                                                <input
                                                    type="text"
                                                    className="w-full bg-transparent outline-none"
                                                    value={task.taskName}
                                                    onChange={(e) => handleTaskNameChange(task._id, e.target.value)}
                                                />
                                            </div>
                                        </td>

                                        {/* Description */}
                                        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                            <PrjRolePicker
                                                selectedRole={project?.roles.find(r => r.roleId === task.roleId)}
                                                roleOptions={project.roles}
                                                onChange={(newRole) => handleImmediateChange(task._id, "roleId", newRole)}
                                                loadProject={loadProject}
                                            />
                                        </td>

                                        {/* Status (Dropdown) */}
                                        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                            <PrjPriorityPicker
                                                selectedPriority={task.priority}
                                                onChange={(newRole) => handleImmediateChange(task._id, "priority", newRole)}
                                            />
                                        </td>
                                        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                            <PrjStatusPicker
                                                selectedStatus={project?.statuses.find(s => s._id === task.statusId)}
                                                onChange={(newRole) => handleImmediateChange(task._id, "statusId", newRole)}
                                                statusOptions={project.statuses}
                                                loadProject={loadProject}
                                            />
                                        </td>

                                        {/* Due Date (Air Datepicker) */}
                                        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                            <AirDatepickerComponent
                                                selectedDate={task.startDate}
                                                onChange={(newRole) => handleImmediateChange(task._id, "startDate", newRole)}
                                            />
                                        </td>
                                        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-r-0">
                                            <AirDatepickerComponent
                                                selectedDate={task.dueDate}
                                                onChange={(newRole) => handleImmediateChange(task._id, "dueDate", newRole)}
                                            />
                                        </td>
                                        <td className="border-b-[1px] border-grayBorder">
                                            <TrashButton
                                                taskId={task._id}
                                                loadProject={loadProject}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                            <tr>
                                <td
                                    colSpan={4}
                                    className="flex items-center gap-[5px] py-[12px] px-[10px] cursor-pointer"
                                    onClick={newTask}
                                >
                                    <PlusIcon w={12} h={12} color={"#FF6200"} />
                                    <p className="font-normal text-[12px] text-[#5F5F5F]">New Task</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const emptyTable = () => (
    <tr className="h-[40px]">
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-l-0"></td>
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder"></td>
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder"></td>
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder"></td>
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder"></td>
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-r-0"></td>
    </tr>
);

const TrashButton = ({ taskId, loadProject }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            loadProject();
        } catch (error) {
            console.error("❌ Failed to delete task:", error);
        }
    }

    return (
        <button
            className=""
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(taskId);
            }}
        >
            <TrashSolidIcon w={16} h={16} color={isHovered ? "#FF6200" : "#D9D9D9"} />
        </button>
    )
}
