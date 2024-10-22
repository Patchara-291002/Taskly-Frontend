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

export default function GrantChart() {

    const colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(201, 203, 207, 0.6)'
    ];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const dataTask = [
        { x: ['2024-10-02', '2024-10-25'], y: 'Task 1' },
        { x: ['2024-10-12', '2024-11-02'], y: 'Task 2' },
        { x: ['2024-10-15', '2024-11-06'], y: 'Task 3' },
        { x: ['2024-10-26', '2024-11-25'], y: 'Task 4' },
        { x: ['2024-11-26', '2024-12-10'], y: 'Task 5' },
        { x: ['2024-12-11', '2024-12-15'], y: 'Task 6' },
        { x: ['2024-12-16', '2024-12-25'], y: 'Task 7' },
        { x: ['2024-12-26', '2024-12-30'], y: 'Task 8' },
        { x: ['2024-12-31', '2025-01-05'], y: 'Task 9' },
        { x: ['2025-01-06', '2025-01-10'], y: 'Task 10' },
    ];

    const rowHeight = 50;
    const chartHeight = dataTask.length * rowHeight;

    const getNonRepeatingColors = (numOfTask) => {
        let avalibleColors = [...colors];
        let assignedColors = [];

        for (let i = 0; i < numOfTask; i++) {
            if (avalibleColors.length === 0) {
                avalibleColors = [...colors];
            }

            const randomIndex = Math.floor(Math.random() * avalibleColors.length);
            assignedColors.push(avalibleColors[randomIndex]);
            avalibleColors.splice(randomIndex, 1);
        }
        return assignedColors;
    };

    // Dynamically calculate the min and max dates
    const allDates = dataTask.flatMap(task => task.x);
    const minDate = new Date(Math.min(...allDates.map(date => new Date(date))));
    const maxDate = new Date(Math.max(...allDates.map(date => new Date(date))));

    const backgroundColors = getNonRepeatingColors(dataTask.length);

    // <block:setup:1>
    const data = {
        datasets: [{
            label: 'My First Dataset',
            data: dataTask,
            backgroundColor: backgroundColors,
            borderSkipped: false,
            borderRadius: 15,
            barThickness: rowHeight - 20
        }]
    };
    // </block:setup>

    // <block:config:0>
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
                    // stepSize: 1,
                },
                min: minDate.toISOString().split('T')[0],
                max: maxDate.toISOString().split('T')[0],
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
