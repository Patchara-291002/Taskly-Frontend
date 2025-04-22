"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { GripIcon, PlusIcon } from "@/app/home/component/icon/GlobalIcon";
import { formatToDate } from "@/utils/dateUtils";
import KanbanCard from "./KanbanCard";

import { updateTaskStatus } from "@/api/task";
import { updateStatusPosition } from "@/api/status";
import { fetchProjectByProjectId } from "@/api/project";
import style from "@/app/component/Loading.module.css";

// Render Task
function SortableTask({ task, projectData, handleTask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: `task-${task._id}`
  });

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    transition: transition ?? "transform 250ms ease",
    opacity: isDragging ? 0 : 1
  };

  return (
    <div
      className="relative"
    >
      <div
        ref={setNodeRef} style={style} {...attributes} {...listeners}
        className="cursor-grab"
      >
        <KanbanCard
          projectData={projectData}
          task={task}
        />
      </div>
    </div>
  );
}

// Render Column
function SortableColumn({ column, tasksInColumn, handleOpenNewTask, projectData, handleTask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: `column-${column._id}`
  });

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    transition: transition ?? "transform 250ms ease",
    opacity: isDragging ? 0 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="min-w-[310px] min-h-[400px] w-full flex-1 border-r-2 px-[30px] relative"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-4 drop-shadow-lg z-50 cursor-grab"
      >
        <GripIcon w={16} h={20} />
      </div>

      {/* Header ที่สามารถลากได้ */}
      <div className="flex justify-between items-center w-full relative z-10 bg-white py-2">
        <p
          className="font-medium"
          style={{ color: column.color }}
        >
          {column.statusName}
        </p>
      </div>

      {/* แยก Task Container ออกมา */}
      <div className="w-full mt-[20px] flex flex-col gap-[10px] relative z-0">
        <SortableContext items={tasksInColumn.map((task) => `task-${task._id}`)}>
          {tasksInColumn.map((task) => (
            <SortableTask
              key={task._id}
              task={task}
              projectData={projectData}
              handleTask={handleTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

/* --------------------------------------------------
   Board Component หลัก
-------------------------------------------------- */
export default function Board({
  initialProjectData,
  setStatusId,
  handleOpenNewTask,
  handleTask,
  loadProject,
}) {
  const [projectData, setProjectData] = useState(initialProjectData);
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // โหลดข้อมูลล่าสุดจาก Backend
  const loadProjectData = async () => {
    try {
      const projectId = initialProjectData._id;
      const latestData = await fetchProjectByProjectId(projectId);
      setProjectData(latestData);
    } catch (error) {
      console.error("Failed to load project:", error);
    }
  };

  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  // เริ่ม drag
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);

    if (active.id.startsWith("task-")) {
      const taskId = active.id.replace("task-", "");
      // หา task จาก projectData.tasks
      const task = projectData.tasks.find((t) => t._id === taskId);
      setActiveItem({ type: "task", data: task });
    } else if (active.id.startsWith("column-")) {
      const columnId = active.id.replace("column-", "");
      const column = projectData.statuses.find((c) => c._id === columnId);
      setActiveItem({ type: "column", data: column });
    }
  };

  // สิ้นสุด drag
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    console.log('Dragging:', {
      from: activeId,
      to: overId,
      isColumn: activeId.startsWith('column-'),
      activeData: active.data,
      overData: over.data
    });

    // ทำ deep copy
    const newProjectData = JSON.parse(JSON.stringify(projectData));

    // -------------------
    // ถ้าเป็น TASK
    if (activeId.startsWith("task-")) {
      const taskId = activeId.replace("task-", "");

      // 1) เอา task ต้นทาง
      const sourceTaskIndex = newProjectData.tasks.findIndex(
        (t) => t._id === taskId
      );
      if (sourceTaskIndex === -1) return;
      const movedTask = newProjectData.tasks[sourceTaskIndex];

      // 2) ย้ายไป Column
      if (overId.startsWith("column-")) {
        const targetColumnId = overId.replace("column-", "");
        movedTask.statusId = targetColumnId;
      } else if (overId.startsWith("task-")) {
        // วางลงบน Task => หา Task นั้นอยู่ Column ไหน
        const targetTaskId = overId.replace("task-", "");
        const targetTask = newProjectData.tasks.find((t) => t._id === targetTaskId);
        if (!targetTask) {
          console.warn("Target task not found");
        } else {
          movedTask.statusId = targetTask.statusId;
        }
      }

      setProjectData(newProjectData);

      // Call updateTaskStatus
      try {
        setIsLoading(true);
        await updateTaskStatus(movedTask._id, movedTask.statusId);
        loadProject();
      } catch (error) {
        console.error("Failed to move task", error);
        await loadProjectData();
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }

    }
    // -------------------
    // ถ้าเป็น COLUMN
    else if (activeId.startsWith("column-")) {
      const columnId = activeId.replace("column-", "");
      const overColumnId = overId.replace("column-", "");

      const oldIndex = newProjectData.statuses.findIndex(
        (col) => col._id === columnId
      );
      const newIndex = newProjectData.statuses.findIndex(
        (col) => col._id === overColumnId
      );

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        // reorder columns local
        const [movedColumn] = newProjectData.statuses.splice(oldIndex, 1);
        newProjectData.statuses.splice(newIndex, 0, movedColumn);

        // update position
        newProjectData.statuses.forEach((col, i) => {
          col.position = i + 1;
        });

        setProjectData(newProjectData);

        try {
          const statusId = columnId;
          const projectId = initialProjectData._id;
          const position = newIndex + 1;
          setIsLoading(true);
          await updateStatusPosition(statusId, projectId, position);
          console.log("Position updated for column:", statusId, " => ", position);
        } catch (error) {
          console.error("Failed to update column position", error);
          await loadProjectData(); // revert
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <div className={style.loader} />
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Render columns as a SortableContext */}
      <SortableContext
        items={projectData.statuses.map((column) => `column-${column._id}`)}
      >
        <div className="w-full flex">
          {projectData.statuses.map((column) => {
            // หา tasks ใน column นี้
            const tasksInColumn = projectData.tasks.filter(
              (t) => t.statusId === column._id
            );
            return (
              <SortableColumn
                key={column._id}
                column={column}
                tasksInColumn={tasksInColumn}
                setStatusId={setStatusId}
                handleOpenNewTask={handleOpenNewTask}
                projectData={projectData}
                handleTask={handleTask}
              />
            );
          })}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          activeItem.type === "task" ? (
            <div
              className="w-[200px] h-[100px] rounded-[15px] bg-white p-[15px] border-[1px] border-grayBorder"
            >
            </div>
          ) : (
            <div className="max-w-[300px] w-full h-full flex-1 px-[30px]">
              <div className="flex justify-between items-center w-full">
                <p>{activeItem.data.statusName}</p>
              </div>
            </div>
          )
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
