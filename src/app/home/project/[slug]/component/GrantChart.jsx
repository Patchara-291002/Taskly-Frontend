'use client'

import React from 'react'
import 'chartjs-adapter-date-fns';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary scales
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

export default function GrantChart({ project }) {

    const transformDataToDataTask = (project) => {
        const dataTask = [];

        project.status.forEach((column) => {
            column.tasks.forEach((task) => {
                dataTask.push({
                    x: [task.startDate, task.dueDate],
                    y: task.taskName,
                    color: task.color
                });
            });
        });

        return dataTask;
    };

    const dataTask = transformDataToDataTask(project);

    const rowHeight = 50;

    const allDates = dataTask.flatMap(task => task.x.map(date => new Date(date)));
    const validDates = allDates.filter(date => !isNaN(date));

    const minDate = validDates.length > 0 ? new Date(Math.min(...validDates)) : new Date();
    const maxDate = validDates.length > 0 ? new Date(Math.max(...validDates)) : new Date();
    
    minDate.setDate(minDate.getDate() - 1);
    maxDate.setDate(maxDate.getDate() + 1);

    const minDateString = minDate instanceof Date && !isNaN(minDate) ? minDate.toISOString().split('T')[0] : '';
    const maxDateString = maxDate instanceof Date && !isNaN(maxDate) ? maxDate.toISOString().split('T')[0] : '';

    const backgroundColors = dataTask.map(task => task.color ); 

    const data = {
        datasets: [{
            // label: 'My First Dataset',
            data: dataTask,
            backgroundColor: backgroundColors,
            borderSkipped: false,
            borderRadius: 15,
            barThickness: rowHeight - 20,
        }]
    };
   
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                type: 'time',
                position: 'top',
                time: {
                    unit: 'day',
                },
                min: minDateString,
                max: maxDateString,
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                }
            },
            y: {
                beginAtZero: true,
            }
        },
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false
            }
        },
        hover: {
            mode: false
        }
    };
    // </block:config>

    return (
        <div
            className='w-full  h-full'
        // style={{ height: `${chartHeight}px`}}
        >
            <Bar data={data} options={options} />
        </div>
    )
}
