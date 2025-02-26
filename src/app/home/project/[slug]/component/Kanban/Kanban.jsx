"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Column from "./Column";
import TaskItem from "./TaskItem";
import { findColumnOrTask, isColumnId, moveTaskLocal } from "./KanbanUtils";
import { updateStatusPosition } from "@/api/status";
import { updateTaskStatus } from "@/api/task";

/**
 * props.project = {
 *   _id: "...",
 *   statuses: [
 *     { _id: "col-1", statusName: "Todo", color: "...", position: 1 },
 *     { _id: "col-2", statusName: "Doing", color: "...", position: 2 },
 *     ...
 *   ],
 *   tasks: [
 *     { _id: "task-1", statusId: "col-1", taskName: "Task A", ... },
 *     ...
 *   ]
 * }
 */
export default function Kanban({ project }) {
  // แยก Columns และ Tasks ออกมาจาก prop
  const [columns, setColumns] = useState(project.statuses || []);
  const [tasks, setTasks] = useState(project.tasks || []);

  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // เมื่อเริ่มลาก
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);

    // หา object ที่จะลาก (ถ้าเป็น col => columns.find, ถ้าเป็น task => tasks.find)
    const item = findColumnOrTask(active.id, columns, tasks);
    setActiveItem(item);
  };

  // เมื่อหยุดลาก
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setActiveItem(null);
      return;
    }

    // 1. ลาก Column (status)
    if (isColumnId(active.id) && isColumnId(over.id)) {
      setColumns((prevCols) => {
        const oldIndex = prevCols.findIndex((col) => col._id === active.id);
        const newIndex = prevCols.findIndex((col) => col._id === over.id);

        const newCols = arrayMove(prevCols, oldIndex, newIndex);

        // อัพเดต Backend เฉพาะ position
        // สมมติ: newCols.forEach(...) เพื่อ updateStatusPosition
        newCols.forEach(async (col, idx) => {
          try {
            await updateStatusPosition(col._id, project._id, idx + 1);
            console.log(`✅ Updated status pos: ${col.statusName} -> ${idx + 1}`);
          } catch (error) {
            console.error("❌ Error updating status position:", error);
          }
        });

        return newCols;
      });
    }
    // 2. ลาก Task
    else {
      // ย้าย Task ใน local
      const newTasks = moveTaskLocal(tasks, active.id, over.id, columns);
      setTasks(newTasks);

      // เรียก API
      const movedTask = newTasks.find((t) => t._id === active.id);
      if (movedTask) {
        try {
          await updateTaskStatus(movedTask._id, movedTask.statusId);
          console.log(`✅ Updated task: ${movedTask.taskName} => statusId ${movedTask.statusId}`);
        } catch (error) {
          console.error("❌ Error updating task status:", error);
        }
      }
    }

    setActiveId(null);
    setActiveItem(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        {columns.map((col) => {
          // หางานที่อยู่ใน col นี้
          const tasksInCol = tasks.filter((t) => t.statusId === col._id);

          return (
            <Column key={col._id} column={col} tasks={tasksInCol} />
          );
        })}
      </div>

      <DragOverlay>
        {activeItem &&
          (isColumnId(activeItem._id) ? (
            <div style={{ background: "#eee", padding: 8, width: 120 }}>
              {activeItem.statusName}
            </div>
          ) : (
            <div style={{ background: "#ccc", padding: 8, width: 100 }}>
              {activeItem.taskName}
            </div>
          ))}
      </DragOverlay>
    </DndContext>
  );
}
