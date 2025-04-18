import React, { useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@/app/home/component/icon/DashboardIcon";
import { formatToDate } from "@/utils/dateUtils";
import PriorityBar from "@/app/component/GlobalComponent/PriorityBar";

export default function KanbanCard({
  projectData,
  task,
}) {

  function formatPriority(priority) {
    switch (priority) {
      case 1:
        return <PriorityBar priority={1} />
        break;
      case 2:
        return <PriorityBar priority={2} />
        break;
      case 3:
        return <PriorityBar priority={3} />
        break;
      default:
        return <PriorityBar priority={0} />
    }
  }

  const role = projectData.roles.find(r => r.roleId === task.roleId)

  const assignedUsers = projectData.users.filter(user =>
    user.projectRole?.roleId === task.roleId
  ).map(user => user.userId);

  return (
    <div className="min-w-[200px] min-h-[100px] rounded-[15px] bg-white p-[15px] border-[1px] border-grayBorder flex flex-col gap-[5px]">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] font-medium">
            {task.taskName.length > 13 ? task.taskName.slice(0, 13) + "..." : task.taskName}
          </p>
        </div>
        <div
          className="flex items-center gap-[5px]"
        >
          <div
            className="text-[10px]"
          >
            {formatPriority(task.priority)}
          </div>
          <div
            className="flex justify-center items-center py-[3px] px-[6px] rounded-[15px]"
            style={{ background: role?.color || "#D6D6D6" }}
          >
            <p className="text-[10px] font-semibold text-white">{role?.name || "no role"}</p>
          </div>
        </div>
      </div>

      <div className="flex -space-x-2.5 items-center">
        {assignedUsers.slice(0, 3).map((user, i) => (
          <div
            key={user._id}
            className="w-[20px] h-[20px] rounded-full overflow-hidden border-2 border-white"
          >
            <img
              src={user.profile}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div
        className="mt-auto"
      >
        <div className="flex items-center gap-[5px]">
          <CalendarIcon w={12} h={12} color="#FF6200" />
          <p className="text-[10px] text-[#1F1E1D]">{formatToDate(task.dueDate)}</p>
        </div>
      </div>
    </div>
  );
}
