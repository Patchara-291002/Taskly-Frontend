"use client";

import React, { useMemo } from "react";
import {
  parseISO,
  addDays,
  startOfDay,
  differenceInDays,
  isAfter,
  isBefore,
  format
} from "date-fns";

/**
 * generateDateRange
 * สร้าง array ของวัน (Day by Day) ระหว่าง start..end (inclusive)
 */
function generateDateRange(start, end) {
  const dates = [];
  let cur = startOfDay(start);
  const limit = startOfDay(end);
  while (cur <= limit) {
    dates.push(cur);
    cur = addDays(cur, 1);
  }
  return dates;
}

export default function GanttChart({ project }) {
  // parse project.startDate, project.dueDate
  const projectStart = startOfDay(parseISO(project.startDate));
  const projectEnd = startOfDay(parseISO(project.dueDate));

  // หา actualStart/actualEnd จาก tasks => เผื่อมี task นอกช่วง
  let actualStart = projectStart;
  let actualEnd = projectEnd;

  for (const t of project.tasks) {
    if (t.startDate) {
      const s = startOfDay(parseISO(t.startDate));
      if (isBefore(s, actualStart)) actualStart = s;
    }
    if (t.dueDate) {
      const d = startOfDay(parseISO(t.dueDate));
      if (isAfter(d, actualEnd)) actualEnd = d;
    }
  }

  // สร้างอาเรย์ทุกวัน
  const allDates = useMemo(() => generateDateRange(actualStart, actualEnd), [
    actualStart,
    actualEnd
  ]);

  // รวม role info เข้าใน tasks
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
    <div className="mt-[30px] p-[20px] overflow-x-auto bg-white border border-grayBorder rounded-[15px]">
      <table className="table-fixed border-collapse ">
        <thead>
          <tr className="">
            <th className="p-2 min-w-[200px] border text-left">
              Task / Role
            </th>
            {allDates.map((date) => (
              <th
                key={date.toISOString()}
                className="p-2 border text-[10px] text-center"
              >
                {format(date, "MMM d")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasksData.map((task) => {
            // ถ้าไม่มี startDate/dueDate => แถวว่าง
            if (!task.startDate || !task.dueDate) {
              return (
                <tr key={task._id} className="h-[30px]">
                  <td className="border p-2 text-[12px]">
                    <div className="flex items-center gap-2">
                      <span className="" >{task.taskName}</span>
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

            // แปลง start/dueDate เป็น day 00:00
            let realStart = startOfDay(parseISO(task.startDate));
            let realEnd = startOfDay(parseISO(task.dueDate));

            // ถ้า start > end => สลับ
            if (isAfter(realStart, realEnd)) {
              [realStart, realEnd] = [realEnd, realStart];
            }

            // คำนวณ index (ต่างจาก actualStart)
            let startIdx = differenceInDays(realStart, actualStart);
            let endIdx = differenceInDays(realEnd, actualStart);

            // สร้าง cells array
            let cells = Array(allDates.length).fill(null);

            // ถ้าทั้งหมดอยู่นอกช่วง => render ว่าง
            // เช่น endIdx < 0 or startIdx >= allDates.length => อยู่นอก
            if (endIdx < 0 || startIdx > allDates.length - 1) {
              // row ว่าง
            } else {
              // clamp index ไม่ให้น้อยกว่า 0, ไม่เกิน allDates.length-1
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
                {/* คอลัมน์แรก: Task + role */}
                <td className="border p-2 text-[12px]">
                  <div className="flex justify-between items-center gap-[5px]">
                    <span>{task.taskName}</span>
                    <span className="text-[10px]">
                      {task.roleName}
                    </span>
                  </div>
                </td>
                {/* map cells */}
                {cells.map((cell, i) => {
                  if (cell === "skip") {
                    return null;
                  }
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
  );
}
