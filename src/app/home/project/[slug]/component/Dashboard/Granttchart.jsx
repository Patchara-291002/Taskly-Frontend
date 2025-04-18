"use client";

import React, { useMemo, useState } from "react";
import {
  parseISO,
  addDays,
  addWeeks,
  addMonths,
  startOfDay,
  startOfWeek,
  startOfMonth,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  isAfter,
  isBefore,
  format
} from "date-fns";
import { MinusIcon, PlusIcon } from "@/app/home/component/icon/GlobalIcon";

// Zoom Levels
const ZOOM_LEVELS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month'
};

function generateDateRange(start, end, zoomLevel) {
  const dates = [];
  let current = zoomLevel === ZOOM_LEVELS.MONTH ? startOfMonth(start) :
    zoomLevel === ZOOM_LEVELS.WEEK ? startOfWeek(start) :
      startOfDay(start);
  const limit = startOfDay(end);

  while (current <= limit) {
    dates.push(current);
    current = zoomLevel === ZOOM_LEVELS.MONTH ? addMonths(current, 1) :
      zoomLevel === ZOOM_LEVELS.WEEK ? addWeeks(current, 1) :
        addDays(current, 1);
  }
  return dates;
}

export default function GanttChart({ project }) {
  const [zoomLevel, setZoomLevel] = useState(ZOOM_LEVELS.WEEK);
  const ZOOM_ORDER = [ZOOM_LEVELS.MONTH, ZOOM_LEVELS.WEEK, ZOOM_LEVELS.DAY];

  const handleZoom = (direction) => {
    const currentIndex = ZOOM_ORDER.indexOf(zoomLevel);
    if (direction === 'in') {
      // ถ้ากด + และยังไม่ถึงระดับสูงสุด (DAY)
      if (currentIndex < ZOOM_ORDER.length - 1) {
        setZoomLevel(ZOOM_ORDER[currentIndex + 1]);
      }
    } else {
      // ถ้ากด - และยังไม่ถึงระดับต่ำสุด (MONTH)
      if (currentIndex > 0) {
        setZoomLevel(ZOOM_ORDER[currentIndex - 1]);
      }
    }
  };

  // Parse project dates
  const projectStart = startOfDay(parseISO(project.startDate));
  const projectEnd = startOfDay(parseISO(project.dueDate));

  // Find actual start/end from tasks
  let actualStart = projectStart;
  let actualEnd = projectEnd;

  for (const task of project.tasks) {
    if (task.startDate) {
      const start = startOfDay(parseISO(task.startDate));
      if (isBefore(start, actualStart)) actualStart = start;
    }
    if (task.dueDate) {
      const end = startOfDay(parseISO(task.dueDate));
      if (isAfter(end, actualEnd)) actualEnd = end;
    }
  }

  // Generate dates based on zoom level
  const allDates = useMemo(() =>
    generateDateRange(actualStart, actualEnd, zoomLevel),
    [actualStart, actualEnd, zoomLevel]
  );

  // Format date according to zoom level
  const formatDate = (date) => {
    switch (zoomLevel) {
      case ZOOM_LEVELS.MONTH:
        return format(date, "MMM yyyy");
      case ZOOM_LEVELS.WEEK: {
        // หาวันแรกและวันสุดท้ายของสัปดาห์
        const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // เริ่มวันจันทร์
        const weekEnd = addDays(weekStart, 6); // วันอาทิตย์

        // ถ้าเดือนเดียวกัน
        if (format(weekStart, 'MMM') === format(weekEnd, 'MMM')) {
          return `${format(weekStart, 'd')} - ${format(weekEnd, 'd')} ${format(weekStart, 'MMM')}`;
        }
        // ถ้าคนละเดือน
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`;
      }
      default:
        return format(date, "MMM d"); // รายวัน
    }
  };

  // Calculate difference according to zoom level
  const getDateDifference = (date1, date2) => {
    switch (zoomLevel) {
      case ZOOM_LEVELS.MONTH:
        return differenceInMonths(date2, date1);
      case ZOOM_LEVELS.WEEK:
        return differenceInWeeks(date2, date1);
      default:
        return differenceInDays(date2, date1);
    }
  };

  // Prepare tasks data
  const tasksData = useMemo(() => {
    return project.tasks.map((task) => {
      const roleObj = project.roles.find((r) => r.roleId === task.roleId) || {};
      return {
        ...task,
        roleName: roleObj.name || "No Role",
        roleColor: roleObj.color || "#ccc"
      };
    });
  }, [project]);

  return (
    <div
      className="mt-[30px]"
    >
      {/* Zoom Controls */}
      <div className="flex justify-end items-center gap-[5px] mb-[10px]">
        <button
          className="border border-primaryOrange rounded-full p-[4px] "
          onClick={() => handleZoom('in')}
          disabled={zoomLevel === ZOOM_LEVELS.DAY}
        >
          <div>
            <PlusIcon w={10} h={10} color={"#FF6200"} />
          </div>
        </button>
        <span className="font-semibold text-[12px] text-primaryOrange">
          {zoomLevel === ZOOM_LEVELS.DAY ? 'Day' :
            zoomLevel === ZOOM_LEVELS.WEEK ? 'Week' : 'Month'}
        </span>
        <button
          className="border border-primaryOrange rounded-full p-[4px]"
          onClick={() => handleZoom('out')}
          disabled={zoomLevel === ZOOM_LEVELS.MONTH}
        >
          <MinusIcon w={10} h={10} color={"#FF6200"} />
        </button>
      </div>

      <div className="w-full h-[400px] p-[20px] overflow-x-auto bg-white border border-grayBorder rounded-[15px]">
        <table className="w-full min-w-[1024px] border-collapse">
          <colgroup>
            <col className="w-[200px] min-w-[200px] max-w-[200px]" />
            {allDates.map((_, index) => (
              <col
                key={index}
                className={`
                  ${zoomLevel === ZOOM_LEVELS.MONTH ? 'w-[120px]' :
                    zoomLevel === ZOOM_LEVELS.WEEK ? 'w-[90px]' :
                      'w-[60px]'}
                  min-w-[60px]
                `}
              />
            ))}
          </colgroup>
          <thead>
            <tr
            >
              <th className="p-2 border text-left">
                <div
                  className="flex justify-between items-center gap-2"
                >
                  <span className="text-[12px] font-medium">Task</span>
                  <span className="text-[12px] font-medium">Role</span>                  
                </div>
              </th>
              {allDates.map((date) => (
                <th
                  key={date.toISOString()}
                  className="p-2 border text-[10px] text-center whitespace-nowrap"
                >
                  {formatDate(date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasksData.map((task) => {
              if (!task.startDate || !task.dueDate) {
                return (
                  <tr key={task._id} className="h-[30px]">
                    <td className="border p-2 text-[12px]">
                      <div className="flex items-center gap-2">
                        <span>{task.taskName}</span>
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ backgroundColor: task.roleColor }}
                        />
                        <span className="text-[10px] text-gray-500">
                          {task.roleName}
                        </span>
                      </div>
                    </td>
                    {allDates.map((_, i) => (
                      <td key={i} className="border" />
                    ))}
                  </tr>
                );
              }

              let realStart = startOfDay(parseISO(task.startDate));
              let realEnd = startOfDay(parseISO(task.dueDate));

              if (isAfter(realStart, realEnd)) {
                [realStart, realEnd] = [realEnd, realStart];
              }

              let startIdx = getDateDifference(actualStart, realStart);
              let endIdx = getDateDifference(actualStart, realEnd);

              let cells = Array(allDates.length).fill(null);

              if (endIdx < 0 || startIdx > allDates.length - 1) {
                // Empty row
              } else {
                if (startIdx < 0) startIdx = 0;
                if (endIdx > allDates.length - 1) endIdx = allDates.length - 1;

                const span = endIdx - startIdx + 1;
                cells[startIdx] = {
                  bar: true,
                  colSpan: span,
                  color: task.roleColor
                };
                for (let i = startIdx + 1; i <= endIdx; i++) {
                  cells[i] = "skip";
                }
              }

              return (
                <tr key={task._id} className="h-[30px]">
                  <td className="border p-2 text-[12px]">
                    <div className="flex justify-between items-center gap-[5px]">
                      <span>{task.taskName}</span>
                      <span className="text-[10px]">{task.roleName}</span>
                    </div>
                  </td>
                  {cells.map((cell, i) => {
                    if (cell === "skip") return null;
                    if (cell && cell.bar) {
                      return (
                        <td
                          key={`bar-${i}`}
                          colSpan={cell.colSpan}
                          className="border text-center"
                          style={{ backgroundColor: cell.color, opacity: 0.8 }}
                        />
                      );
                    }
                    return <td key={`empty-${i}`} className="border" />;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}