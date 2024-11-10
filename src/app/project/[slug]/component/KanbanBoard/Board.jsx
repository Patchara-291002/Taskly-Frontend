'use client';

import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { PlusIcon } from '@/app/component/icon/GlobalIcon';
import { formatToDate } from '@/utils/dateUtils';
import KanbanCard from './KanbanCard';
import { BlurBackground } from '@/app/component/GlobalComponent';

/// API ///
import { updateTaskStatus } from '@/api/task';
import { updateStatusPosition } from '@/api/status';
import { fetchProjectByProjectId } from '@/api/project';

function SortableTask({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: `task-${task._id}`,
    });

    const style = {
        transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
        transition: transition ?? 'transform 250ms ease',
        opacity: isDragging ? 0 : 1, // Hide the original item when dragging
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <KanbanCard
                title={task.taskName}
                detail={task.detail}
                tag={task.tag}
                priority={task.priority}
                color={task.color}
                startDate={formatToDate(task.startDate)}
                dueDate={formatToDate(task.dueDate)}
                dueTime={task.dueTime}
                assignees={task.assignees}
            />
        </div>
    );
}

function SortableColumn({ column, handleOpenNewTask }) {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: `column-${column._id}`,
    });

    const style = {
        transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
        transition: transition ?? 'transform 250ms ease',
        opacity: isDragging ? 0 : 1, 
    };


    return (
        <div
            ref={setNodeRef}
            style={style}

            className="max-w-[300px] w-full flex-1 border-r-2 px-[30px]"
        >
            <div className="flex justify-between items-center w-full">
                <p
                    {...attributes}
                    {...listeners}
                    className="cursor-grab"
                >
                    {column.statusName}
                </p>
                <button
                    className="w-[18px] h-[18px] flex justify-center items-center border-primaryorange border rounded-full"
                    onClick={() => handleOpenNewTask(column._id)}
                >
                    <PlusIcon color="#FF6200" w="8px" h="8px" />
                </button>
            </div>

            <SortableContext items={column.tasks.map((task) => `task-${task._id}`)}>
                <div className="w-full mt-[20px] flex flex-col gap-[10px]">
                    {column.tasks.map((task) => (
                        <SortableTask key={task._id} task={task} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}

export default function Board({ initialProjectData, setStatusId, handleOpenNewTask }) {
    const [projectData, setProjectData] = useState(initialProjectData);
    const [activeId, setActiveId] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    const loadProjectData = async () => {
        try {
            const projectId = initialProjectData._id;
            const latestData = await fetchProjectByProjectId(projectId);
            setProjectData(latestData);
        } catch (error) {
            console.error('Failed to load project:', error);
        }
    };

    useEffect(() => {
        loadProjectData();
    }, []);

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveId(active.id);

        if (active.id.startsWith('task-')) {
            const taskId = active.id.replace('task-', '');
            const task = projectData.status
                .flatMap((column) => column.tasks)
                .find((task) => task._id === taskId);
            setActiveItem({ type: 'task', data: task });
        } else if (active.id.startsWith('column-')) {
            const columnId = active.id.replace('column-', '');
            const column = projectData.status.find((column) => column._id === columnId);
            setActiveItem({ type: 'column', data: column });
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveId(null);
        setActiveItem(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Create a deep copy to avoid mutating state directly
        const newProjectData = JSON.parse(JSON.stringify(projectData));

        if (activeId.startsWith('task-')) {
            const taskId = activeId.replace('task-', '');

            const sourceColumn = newProjectData.status.find((column) =>
                column.tasks.some((task) => task._id === taskId)
            );
            const taskIndex = sourceColumn.tasks.findIndex((task) => task._id === taskId);
            const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);

            if (overId.startsWith('column-')) {
                const targetColumnId = overId.replace('column-', '');
                const targetColumn = newProjectData.status.find((column) => column._id === targetColumnId);
                targetColumn.tasks.push(movedTask);

                // Update the task's status ID
                movedTask.statusId = targetColumnId;
            } else if (overId.startsWith('task-')) {
                const targetTaskId = overId.replace('task-', '');
                const targetColumn = newProjectData.status.find((column) =>
                    column.tasks.some((task) => task._id === targetTaskId)
                );
                if (targetColumn && targetColumn.tasks) {
                    const targetTaskIndex = targetColumn.tasks.findIndex((task) => task._id === targetTaskId);
            
                    // Check if targetTaskIndex is valid
                    if (targetTaskIndex !== -1) {
                        targetColumn.tasks.splice(targetTaskIndex, 0, movedTask);
            
                        // Update the task's status ID
                        movedTask.statusId = targetColumn._id;
                    } else {
                        console.warn("Target task index not found in target column.");
                    }
                } else {
                    console.warn("Target column not found or does not contain tasks.");
                }
            }

            setProjectData(newProjectData);

            try {
                await updateTaskStatus(taskId, movedTask.statusId);
            } catch (error) {
                console.error('Failed to move task', error);
                await loadProjectData(); // Revert to server state on error
            }
        } else if (activeId.startsWith('column-')) {
            const columnId = activeId.replace('column-', '');
            const overColumnId = overId.replace('column-', '');

            const oldIndex = newProjectData.status.findIndex((column) => column._id === columnId);
            const newIndex = newProjectData.status.findIndex((column) => column._id === overColumnId);

            if (oldIndex !== newIndex) {
                const [movedColumn] = newProjectData.status.splice(oldIndex, 1);
                newProjectData.status.splice(newIndex, 0, movedColumn);

                // Update positions for all columns
                newProjectData.status.forEach((column, index) => {
                    column.position = index + 1; // +1 to avoid starting from 0 if necessary
                });

                setProjectData(newProjectData);

                try {
                    const statusId = columnId;
                    const projectId = initialProjectData._id;
                    const position = newIndex + 1; // Adjust position to match updated array index

                    console.log("Updating position with:", { statusId, projectId, position });
                    await updateStatusPosition(statusId, projectId, position);
                    console.log('Position updated successfully');
                } catch (error) {
                    console.error('Failed to update column position', error);
                    await loadProjectData(); // Revert to server state on error
                }
            }
        }
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={projectData.status.map((column) => `column-${column._id}`)}>
                <div className="w-full flex">
                    {projectData.status.map((column) => (
                        <SortableColumn 
                            key={column._id} 
                            column={column} 
                            setStatusId={setStatusId}
                            handleOpenNewTask={handleOpenNewTask}
                        />
                    ))}
                </div>
            </SortableContext>

            <DragOverlay>
                {activeItem ? (
                    activeItem.type === 'task' ? (
                        <KanbanCard
                            title={activeItem.data.taskName}
                            detail={activeItem.data.detail}
                            tag={activeItem.data.tag}
                            priority={activeItem.data.priority}
                            color={activeItem.data.color}
                            startDate={formatToDate(activeItem.data.startDate)}
                            dueDate={formatToDate(activeItem.data.dueDate)}
                            dueTime={activeItem.data.dueTime}
                            assignees={activeItem.data.assignees}
                        />
                    ) : (
                        <div className="max-w-[300px] w-full flex-1 border-r-2 px-[30px] bg-white">
                            <div className="flex justify-between items-center w-full">
                                <p>{activeItem.data.statusName}</p>
                                <button className="w-[18px] h-[18px] flex justify-center items-center border-primaryorange border rounded-full">
                                    <PlusIcon color="#FF6200" w="8px" h="8px" />
                                </button>
                            </div>
                        </div>
                    )
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
