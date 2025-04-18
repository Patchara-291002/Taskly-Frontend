import { useState, useEffect } from 'react';
import { BlurBackground } from '@/app/home/component/GlobalComponent';
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en.js';
import 'air-datepicker/air-datepicker.css';

export default function NewProject({ isOpen, setIsOpen, projectName, setProjectName, startDate, setStartDate, dueDate, setDueDate, onSubmit }) {
    const [startDatePicker, setStartDatePicker] = useState(null);
    const [endDatePicker, setEndDatePicker] = useState(null);

    useEffect(() => {
        // Initialize start date picker
        const startPicker = new AirDatepicker('#start-date', {
            locale: localeEn,
            dateFormat: 'yyyy-MM-dd',
            onSelect: ({ date }) => {
                setStartDate(date);
            }
        });
        setStartDatePicker(startPicker);

        // Initialize end date picker
        const endPicker = new AirDatepicker('#end-date', {
            locale: localeEn,
            dateFormat: 'yyyy-MM-dd',
            onSelect: ({ date }) => {
                setDueDate(date);
            }
        });
        setEndDatePicker(endPicker);

        return () => {
            startPicker.destroy();
            endPicker.destroy();
        };
    }, []);

    return (
        <BlurBackground isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className='flex flex-col justify-between mx-[30px] w-full max-w-[378px] h-[300px] bg-white rounded-[15px] shadow-lg p-[15px]'>
                <input
                    placeholder="Enter your project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className='w-full h-[35px] bg-[#F2F2F2] rounded-[5px] px-[10px] text-[14px] outline-none'
                />
                <div className='flex flex-col gap-[2px]'>
                    <p className='text-[12px] ml-[5px]'>start project</p>
                    <input
                        id="start-date"
                        type="text"
                        placeholder="Select Date"
                        readOnly
                        className='w-full h-[35px] bg-[#F2F2F2] rounded-[5px] px-[10px] text-[14px] outline-none'
                    />
                </div>
                <div className='flex flex-col gap-[2px]'>
                    <p className='text-[12px] ml-[5px]'>end project</p>
                    <input
                        id="end-date"
                        type="text"
                        placeholder="Select Date"
                        readOnly
                        
                        className='w-full h-[35px] bg-[#F2F2F2] rounded-[5px] px-[10px] text-[14px] outline-none'
                    />
                </div>
                <button 
                    className="w-full h-[35px] bg-primaryOrange text-white font-semibold rounded-[5px] active:bg-primaryOrange/80" 
                    onClick={onSubmit}
                >
                    Create Project
                </button>
            </div>
        </BlurBackground>
    );
}