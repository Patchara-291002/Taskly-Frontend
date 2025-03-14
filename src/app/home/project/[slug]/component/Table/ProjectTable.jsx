import { useState, useEffect, useCallback } from "react";
import { PlusIcon } from "@/app/home/component/icon/GlobalIcon";
import { AirDatepickerComponent, PrjRolePicker, StdStatusPicker, PrjPriorityPicker } from "@/app/component/GlobalComponent";
// import { updateAssignment, createAssignment } from "@/api/course"
import { updateTask, createTask } from "@/api/task";
import { createStatus } from "@/api/status";
import PrjStatusPicker from "@/app/component/GlobalComponent/PrjStatusPicker";

export default function ProjectTable({ project }) {
    const [taskPayload, setTaskPayload] = useState([]);

    useEffect(() => {
        if (project?.tasks) {
            setTaskPayload(project.tasks);
        }
    }, [project]);

    const handleChange = (id, key, value) => {
        setTaskPayload((prev) =>
            prev.map(task =>
                task._id === id ? { ...task, [key]: value } : task
            )
        );
    };

    // Code จาก Component ตัวอย่าง
    // ✅ ใช้ useCallback เพื่ออัปเดต API อัตโนมัติ
    const updateTaskData = useCallback(async (task) => {
        const updatedTask = {
            taskName: task.taskName,
            startDate: task.startDate,
            dueDate: task.dueDate,
            statusId: task.statusId,
            roleId: task.roleId,
            priority: task.priority
        };

        try {
            await updateTask(
                task._id,
                updatedTask
            );
        } catch (error) {
            console.error("❌ Failed to update task:", error);
        }
    }, []);

    // ✅ ใช้ useEffect ให้ API อัปเดตทุกครั้งที่ค่าเปลี่ยน
    useEffect(() => {
        const delay = setTimeout(() => {
            taskPayload.forEach(updateTaskData);
        }, 1000);

        return () => clearTimeout(delay);
    }, [taskPayload, updateTaskData]);

    const newTask = async () => {
        try {
            let statusId = project.statuses?.[0]?._id;

            if (!statusId) {
                console.log("⚠ No status found, creating a new status...");

                // ✅ สร้าง Status ใหม่ชื่อ "New status"
                const newStatus = await createStatus(project._id, "New status", "#D6D6D6");

                if (!newStatus?._id) {
                    console.error("❌ Failed to create a new status");
                    return;
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

            window.location.reload();
        } catch (error) {
            console.error("❌ Failed to create task:", error);
        }
    };


    return (
        <div className="w-full min-h-[500px]">
            <p className="font-medium text-[16px] pb-[15px]">Tasks</p>
            <div className="w-full border-[1px] border-grayBorder bg-white p-[10px] rounded-[15px]">
                <table className="table-fixed w-full border-collapse">
                    <colgroup>
                        <col className="w-auto" />
                        <col className="w-[140px]" />
                        <col className="w-[140px]" />
                        <col className="w-[140px]" />
                        <col className="w-auto" />
                        <col className="w-auto" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                Name of Assignment
                            </th>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                Role
                            </th>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                Priority
                            </th>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                Status
                            </th>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                Start date
                            </th>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-grayBorder">
                                Due Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskPayload.length === 0 ? (
                            emptyTable()
                        ) : (
                            taskPayload.map((task, index) => (
                                <tr key={index}>
                                    {/* Name of Assignment */}
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-l-0">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent outline-none"
                                            value={task.taskName}
                                            onChange={(e) => handleChange(task._id, "taskName", e.target.value)}
                                        />
                                    </td>

                                    {/* Description */}
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                        <PrjRolePicker
                                            selectedRole={project?.roles.find(r => r.roleId === task.roleId)}
                                            roleOptions={project.roles}
                                            onChange={(newRole) => handleChange(task._id, "roleId", newRole)}
                                        />
                                    </td>

                                    {/* Status (Dropdown) */}
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                        <PrjPriorityPicker
                                            selectedPriority={task.priority}
                                            onChange={(priorityValue) => handleChange(task._id, "priority", priorityValue)}
                                        />
                                    </td>
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                        <PrjStatusPicker
                                            selectedStatus={project?.statuses.find(s => s._id === task.statusId)}
                                            onChange={(newStatus) => handleChange(task._id, "statusId", newStatus)}
                                            statusOptions={project.statuses}
                                        />
                                    </td>

                                    {/* Due Date (Air Datepicker) */}
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                        <AirDatepickerComponent
                                            selectedDate={task.startDate}
                                            onChange={(newDate) => handleChange(task._id, "startDate", newDate)}
                                        />
                                    </td>
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-r-0">
                                        <AirDatepickerComponent
                                            selectedDate={task.dueDate}
                                            onChange={(newDate) => handleChange(task._id, "dueDate", newDate)}
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
