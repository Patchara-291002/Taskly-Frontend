import { useState, useEffect, useCallback } from "react";
import { PlusIcon } from "@/app/home/component/icon/GlobalIcon";
import { AirDatepickerComponent, StdStatusPicker } from "@/app/component/GlobalComponent";
import { updateAssignment, createAssignment } from "@/api/course"

export default function CourseTable({ course }) {
    const [assignmentPayload, setAssignmentPayload] = useState([]);

    useEffect(() => {
        if (course?.Assignments) {
            setAssignmentPayload(course.Assignments);
        }
    }, [course]);

    const handleChange = (index, key, value) => {
        setAssignmentPayload((prev) =>
            prev.map((assignment, i) => (i === index ? { ...assignment, [key]: value } : assignment))
        );
    };

    // ✅ ใช้ useCallback เพื่ออัปเดต API อัตโนมัติ
    const updateAssignmentData = useCallback(async (assignment) => {
        try {
            await updateAssignment(
                assignment._id, 
                assignment.assignmentName,
                assignment.description,
                assignment.status,
                assignment.startDate,
                assignment.endDate
            );
            console.log(`✅ Updated assignment: ${assignment.assignmentName}`);
        } catch (error) {
            console.error("❌ Failed to update assignment:", error);
        }
    }, []);

    // ✅ ใช้ useEffect ให้ API อัปเดตทุกครั้งที่ค่าเปลี่ยน
    useEffect(() => {
        const delay = setTimeout(() => {
            assignmentPayload.forEach(updateAssignmentData);
        }, 1000); // Debounce 1 วินาที

        return () => clearTimeout(delay);
    }, [assignmentPayload, updateAssignmentData]);

    const newAssignment = async () => {
        try {
            await createAssignment(course._id)
            window.location.reload();
        } catch (error) {
            console.error("❌ Failed to create assignment:", error)
        }
    }

    return (
        <div className="w-full pt-[40px]">
            <p className="font-medium text-[16px] pb-[15px]">Assignments</p>
            <div className="w-full border-[1px] border-grayBorder bg-white p-[10px] rounded-[15px]">
                <table className="table-fixed w-full border-collapse">
                    <colgroup>
                        <col className="w-auto" />
                        <col className="w-auto" />
                        <col className="w-[160px]" />
                        <col className="w-auto" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                Name of Assignment
                            </th>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                Description
                            </th>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-r-[1px] border-grayBorder">
                                Status
                            </th>
                            <th className="text-[14px] font-normal text-left py-[12px] px-[10px] border-grayBorder">
                                Due Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignmentPayload.length === 0 ? (
                            emptyTable()
                        ) : (
                            assignmentPayload.map((assignment, index) => (
                                <tr key={index}>
                                    {/* Name of Assignment */}
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-l-0">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent outline-none"
                                            value={assignment.assignmentName}
                                            onChange={(e) => handleChange(index, "assignmentName", e.target.value)}
                                        />
                                    </td>

                                    {/* Description */}
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent outline-none"
                                            value={assignment.description}
                                            onChange={(e) => handleChange(index, "description", e.target.value)}
                                        />
                                    </td>

                                    {/* Status (Dropdown) */}
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder">
                                        <StdStatusPicker
                                            selectedStatus={assignment.status}
                                            onChange={(newStatus) => handleChange(index, "status", newStatus)}
                                        />
                                    </td>

                                    {/* Due Date (Air Datepicker) */}
                                    <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-r-0">
                                        <AirDatepickerComponent
                                            selectedDate={assignment.endDate}
                                            onChange={(newDate) => handleChange(index, "endDate", newDate)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                        <tr>
                            <td 
                                colSpan={4} 
                                className="flex items-center gap-[5px] py-[12px] px-[10px] cursor-pointer"
                                onClick={newAssignment}
                            >
                                <PlusIcon w={12} h={12} color={"#FF6200"} />
                                <p className="font-normal text-[12px] text-[#5F5F5F]">New Assignment</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ฟังก์ชันสำหรับแสดงตารางเปล่า */
const emptyTable = () => (
    <tr className="h-[40px]">
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-l-0"></td>
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder"></td>
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder"></td>
        <td className="font-normal text-[12px] text-[#5F5F5F] py-[12px] px-[10px] border-[1px] border-grayBorder border-r-0"></td>
    </tr>
);
