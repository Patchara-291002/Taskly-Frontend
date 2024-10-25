'use client'

import React, { useState } from 'react';
import { DndContext, closestCenter, useDroppable, useDraggable, useSensor, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { PlusIcon } from '@/app/component/icon/GlobalIcon';
import TaskCard from '@/app/component/dashboarOverview/Task/TaskCard';
import KanbanCard from './KanbanCard';

export default function Board({ projects, setProjects }) {

    // Draggable Header for moving columns
    const DraggableHeader = ({ id, children }) => {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: id,
            data: { type: 'column' }
        });

        const style = {
            transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        };

        return (
            <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
                {children}
            </div>
        );
    };

    // Draggable Task for moving tasks between columns
    const DraggableTask = ({ id, statusId, children }) => {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: id,
            data: { type: 'task', statusId }
        });

        const style = {
            transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        };

        return (
            <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
                {children}
            </div>
        );
    };

    const Droppable = ({ children, id }) => {
        const { setNodeRef } = useDroppable({
            id: id,
            data: { type: 'column' }
        });

        return (
            <div ref={setNodeRef} className="min-w-[210px] border-r px-[30px] rounded">
                {children}
            </div>
        );
    };

    console.log(projects)

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeType = active.data.current?.type;
        const overType = over?.data.current?.type;

        // Handle column reordering
        if (activeType === 'column' && overType === 'column') {
            const activeColumnIndex = projects.board.findIndex(column => column.statusId === active.id);
            const overColumnIndex = projects.board.findIndex(column => column.statusId === over.id);

            if (activeColumnIndex !== overColumnIndex) {
                setProjects(prevData => {
                    const reorderedBoard = arrayMove(prevData.board, activeColumnIndex, overColumnIndex);
                    return { ...prevData, board: reorderedBoard };
                });
            }
        }

        // Handle task moving between columns or reordering within the same column
        if (activeType === 'task') {
            const activeStatusId = active.data.current.statusId;
            const overStatusId = over?.data.current?.statusId || over?.id;

            const activeColumnIndex = projects.board.findIndex(column => column.statusId === activeStatusId);
            const activeTaskIndex = projects.board[activeColumnIndex].tasks.findIndex(task => task.taskId === active.id);

            // Move task between columns or reorder within the same column
            setProjects(prevData => {
                const newBoard = prevData.board.map(column => {
                    // Remove task from original column
                    if (column.statusId === activeStatusId) {
                        column = {
                            ...column,
                            tasks: column.tasks.filter(task => task.taskId !== active.id)
                        };
                    }

                    // Add task to the new column
                    if (column.statusId === overStatusId) {
                        const newTasks = [...column.tasks];
                        if (overType === 'task') {
                            // Insert task at the target position
                            const overTaskIndex = column.tasks.findIndex(task => task.taskId === over.id);
                            newTasks.splice(overTaskIndex, 0, prevData.board[activeColumnIndex].tasks[activeTaskIndex]);
                        } else {
                            // If dropped on a column (empty area), add task to the end
                            newTasks.push(prevData.board[activeColumnIndex].tasks[activeTaskIndex]);
                        }
                        column = { ...column, tasks: newTasks };
                    }

                    return column;
                });

                return { ...prevData, board: newBoard };
            });
        }
    };



    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex w-full">
                {projects.board.map((column) => (
                    <Droppable key={column.statusId} id={column.statusId}>
                        <div className='w-full'>
                            <DraggableHeader id={column.statusId}>
                                <div className='flex justify-between items-center w-full mb-[20px]'>
                                    <p className='font-medium'>{column.status}</p>
                                    <button className='w-[18px] h-[18px] border-[1.5px] border-[#FF6200] flex justify-center items-center rounded-full'>
                                        <PlusIcon w={6} h={6} color={"#FF6200"} />
                                    </button>
                                </div>
                            </DraggableHeader>

                            <div className='flex flex-col gap-[10px]'>
                                {column.tasks.map((task) => (
                                    <DraggableTask key={task.taskId} id={task.taskId} statusId={column.statusId}>
                                        <KanbanCard 
                                            title={task.taskName}
                                            detail={task.detail}
                                            priority={task.priority}
                                            startDate={task.creatAt}
                                            dueDate={task.dueDate}
                                            dueTime={task.dueTime}
                                            users={task.assignees}
                                            tag={task.tag}
                                            color={task.color}
                                            status={task.state}
                                        />
                                    </DraggableTask>
                                ))}
                            </div>
                        </div>
                    </Droppable>
                ))}
            </div>
        </DndContext>
    );
}
