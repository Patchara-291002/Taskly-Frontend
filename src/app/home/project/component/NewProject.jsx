import { useState } from 'react';
import { BlurBackground } from '@/app/home/component/GlobalComponent';
import { DatePicker, Input } from 'rsuite';
import "rsuite/dist/rsuite-no-reset.min.css";

export default function NewProject({ isOpen, setIsOpen, projectName, setProjectName, startDate, setStartDate, dueDate, setDueDate, onSubmit }) {
    return (
        <BlurBackground isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className='flex flex-col justify-between w-[650px] h-[300px] bg-white rounded-[15px] shadow-lg p-[15px]'>
                <Input 
                    placeholder="Project name" 
                    value={projectName}
                    onChange={(value) => setProjectName(value)}
                />
                <DatePicker
                    format="yyyy-MM-dd"
                    value={startDate}
                    onChange={date => setStartDate(date)}
                    placeholder="Select Date"
                    style={{ width: 200 }}
                />
                <DatePicker
                    format="yyyy-MM-dd"
                    value={dueDate}
                    onChange={date => setDueDate(date)}
                    placeholder="Select Date"
                    style={{ width: 200 }}
                />
                <button className="btn btn-primary mt-4" onClick={onSubmit}>
                    Create Project
                </button>
            </div>
        </BlurBackground>
    );
}
