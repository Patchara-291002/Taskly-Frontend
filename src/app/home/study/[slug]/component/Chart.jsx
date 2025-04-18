import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

export default function Chart({ course, getCourseById }) {


    return (
        <div
            className='w-ful mt-[20px] mb-[200px] overflow-hidden flex flex-col md:grid md:grid-flow-col md:grid-cols-2 gap-[15px]'
        >
            <StatusDoughnut course={course} />
            <OverdueAssignmentBar course={course} />
        </div>
    )
}

export const StatusDoughnut = ({ course }) => {
    const formatStatusData = (assignments) => {
        // Initialize counters for each status
        const statusCounts = {
            'Todo': 0,
            'Doing': 0,
            'Done': 0
        };

        // Count assignments by status
        assignments.forEach(assignment => {
            if (statusCounts.hasOwnProperty(assignment.status)) {
                statusCounts[assignment.status]++;
            }
        });

        return {
            labels: ['Todo', 'Doing', 'Done'],
            datasets: [{
                data: [
                    statusCounts['Todo'],
                    statusCounts['Doing'],
                    statusCounts['Done']
                ],
                backgroundColor: [
                    '#FEB146', // Todo - Orange
                    '#1F86FF', // Doing - Blue
                    '#18A900', // Done - Green
                ],
                borderWidth: 0
            }]
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12,
                    },
                    usePointStyle: true,
                    padding: 10
                }
            },
            title: {
                display: true,
                text: 'Tasks by Priority',
                font: {
                    size: 14,
                    weight: 'bold'
                },
                color: '#FF6200',
                padding: {
                    bottom: 20
                }
            }
        },
        cutout: '60%',
        spacing: 5,
    };

    const data = formatStatusData(course.Assignments);
    const hasAssignments = course.Assignments.length > 0;

    return (
        <div className='w-full max-h-[400px] flex justify-center bg-white rounded-[15px] p-[15px] border border-grayBorder'>
            {hasAssignments ? (
                <Doughnut data={data} options={options} />
            ) : (
                <div
                    className='w-full h-full flex flex-col justify-center items-center'
                >
                    <p className='text-center text-[#D5D5D5]'>Try create assignment !</p>
                </div>
            )}
        </div>
    );
}

export const OverdueAssignmentBar = ({ course }) => {
    const formatAssignmentData = (assignments) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let overdueCount = 0;
        let totalCount = assignments.length;

        assignments.forEach(assignment => {
            const dueDate = new Date(assignment.endDate);
            dueDate.setHours(0, 0, 0, 0);

            if (assignment.status !== 'Done' && dueDate < today) {
                overdueCount++;
            }
        });

        return {
            labels: ['Overdue', 'On Track'],
            datasets: [{
                data: [
                    overdueCount,
                    totalCount - overdueCount
                ],
                backgroundColor: [
                    '#FF4646',  // Overdue - Red
                    '#F1F1F1',  // On Track - Gray
                ],
                borderWidth: 0
            }]
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 12,
                    },
                    usePointStyle: true,
                    padding: 10
                }
            },
            title: {
                display: true,
                text: 'Overdue Assignments',
                font: {
                    size: 14,
                    weight: 'bold'
                },
                color: '#FF6200',
                padding: {
                    bottom: 20
                }
            }
        },
        cutout: '60%',
        spacing: 10,
    };

    const data = formatAssignmentData(course.Assignments);
    const hasOverdue = data.datasets[0].data[0] > 0;

    return (
        <div className='w-full h-[400px] bg-white rounded-[15px] p-[15px] border border-grayBorder'>
            {hasOverdue ? (
                <Doughnut data={data} options={options} />
            ) : (
                <div
                    className='w-full h-full flex flex-col justify-center items-center'
                >
                    <p className='text-center text-[#D5D5D5]'>You have no overdue assignment.</p>
                    <p className='text-center text-[#D5D5D5]'>Keep it up.</p>
                </div>
            )}
        </div>
    );
};

