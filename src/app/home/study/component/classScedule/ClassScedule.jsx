'use client';

import React from 'react';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, TimeScale, Tooltip, Legend);

export default function ScheduleChart() {
  const scheduleData = {
    Monday: [{ class: 'Calculus', start: '09:30', end: '12:00', color: 'orange' }],
    Wednesday: [{ class: 'Drawing', start: '10:20', end: '11:20', color: 'green' }],
    Thursday: [{ class: 'English', start: '09:30', end: '11:30', color: 'orange' }],
    Friday: [
      { class: 'Photography', start: '09:30', end: '11:30', color: 'blue' },
      { class: 'Production', start: '13:30', end: '15:30', color: 'blue' },
    ],
  };

  // Transform scheduleData into Chart.js dataset format
  const transformedData = [];
  Object.entries(scheduleData).forEach(([day, tasks]) => {
    tasks.forEach((task) => {
      transformedData.push({
        x: [task.start, task.end], // Time range
        y: day, // Day of the week
        class: task.class, // Class name
        color: task.color, // Bar color
      });
    });
  });

  const data = {
    datasets: [
      {
        label: 'Class Schedule',
        data: transformedData,
        backgroundColor: transformedData.map((task) => task.color),
        borderRadius: 10,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Horizontal bars
    scales: {
      x: {
        type: 'time',
        position: 'top',
        time: {
          parser: 'HH:mm',
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm',
          },
        },
        ticks: {
          stepSize: 0.5,
          autoSkip: false
        },
      },
      y: {
        type: 'category',
        labels: Object.keys(scheduleData), // Days of the week
        title: {
          display: true,
          text: 'Days',
        },
        ticks: {
          autoSkip: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const task = transformedData[context.dataIndex];
            return `${task.class}: ${task.x[0]} - ${task.x[1]}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full h-[500px]">
      <Bar data={data} options={options} />
    </div>
  );
}
