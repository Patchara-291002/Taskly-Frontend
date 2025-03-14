import React, { useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@/app/home/component/icon/DashboardIcon";
import { formatToDate } from "@/utils/dateUtils";

export default function KanbanCard({
  title,
  detail,
  tag,
  priority,
  color,
  startDate,
  dueDate,
  dueTime,
  assignees,
  role
}) {

  function formatPriority(priority){
    switch(priority){
      case 1:
        return <p>Normal</p>
        break;
      case 2:
        return <p>Medium</p>
        break;
      case 3:
        return <p>High</p>
        break;
      default :
        return <p>None</p>
    }
  }

  return (
    <div className="min-w-[200px] min-h-[100px] rounded-[15px] bg-white p-[15px] border-[1px] border-grayBorder flex flex-col gap-[5px]">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <p className="text-[14px] font-medium">
            {title.length > 13 ? title.slice(0, 13) + "..." : title}
          </p>
        </div>
        <div
          className="flex items-center gap-[5px]"
        >
          <div
            className="text-[10px]"
          >
            {formatPriority(priority)}
          </div>
          <div
            className="flex justify-center items-center py-[3px] px-[6px] rounded-[15px]"
            style={{ background: role?.color || "#D6D6D6" }}
          >
            <p className="text-[10px] font-semibold text-white">{role?.name || "no role"}</p>
          </div>
        </div>
      </div>

      <div className="flex -space-x-2.5">
        {assignees?.map((user, i) => (
          <div key={i} className="w-[20px] h-[20px] rounded-full overflow-hidden">
            {/* <img src={user.profile} alt="Profile" /> */}
          </div>
        ))}
      </div>
      <div
        className="mt-auto"
      >
        <div className="flex items-center gap-[5px]">
          <CalendarIcon w={12} h={12} color="#FF6200" />
          <p className="text-[10px] text-[#1F1E1D]">{dueDate}</p>
        </div>
        {/* <div className="flex items-center gap-[7px]">
          <ClockIcon w={12} h={12} color="#FF6200" />
          <p className="text-[10px] text-[#1F1E1D]">{dueTime}</p>
        </div> */}
      </div>
    </div>
  );
}
