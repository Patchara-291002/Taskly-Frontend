'use client'

import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';  // Add this import
import { PlusIcon } from '@/app/component/icon/GlobalIcon';

export default function Board({ projects, setProjects }) {

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

    const Droppable = ({ children, id, type }) => {
        const { setNodeRef } = useDroppable({
            id: id,
            data: { type }
        });

        return (
            <div ref={setNodeRef} className="border-r mr-[30px] pr- rounded w-[207px]">
                {children}
            </div>
        );
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeType = active.data.current?.type;
        const overType = over.data.current?.type;

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

        if (activeType === 'task' && overType === 'task') {
            const activeStatusId = active.data.current.statusId;
            const overStatusId = over.data.current.statusId;

            if (activeStatusId !== overStatusId) {
                const activeTask = projects.board
                    .find(board => board.statusId === activeStatusId)
                    .tasks.find(task => task.taskId === active.id);

                setProjects(prevData => {
                    const newBoard = prevData.board.map(board => {
                        if (board.statusId === activeStatusId) {
                            return {
                                ...board,
                                tasks: board.tasks.filter(task => task.taskId !== active.id)
                            };
                        }
                        if (board.statusId === overStatusId) {
                            return {
                                ...board,
                                tasks: [...board.tasks, activeTask]
                            };
                        }
                        return board;
                    });

                    return { ...prevData, board: newBoard };
                });
            }
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex">
                {projects.board.map((column) => (
                    <Droppable key={column.statusId} id={column.statusId} type="column">
                        <div className='w-full mr-[30px] pr-[30px]'>

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
                                        <div className="bg-white p-2 rounded shadow">
                                            <p>{task.taskName}</p>
                                            <small>{task.state} | Due: {task.dueDate}</small>
                                        </div>
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
