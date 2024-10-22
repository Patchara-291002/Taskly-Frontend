'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";

export default function Chart() {

    const data = {
        labels: ['Complete', 'In progress', 'Fail'],
        datasets: [
            {
                data: [60, 30, 10],
                backgroundColor: ['#3479FF', '#FFC56A', '#5AC3B4'],
            },
        ],
    };
    const options = {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, 
            },
        },
        hoverOffset: 5
    };

    return <Doughnut data={data} options={options} />
}
