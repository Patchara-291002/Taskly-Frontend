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
import useWindowSize from '@/hooks/useWindow';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);
  
export default function Chart({ project }) {

    const { width } = useWindowSize();
    const isMobile = width < 1024;

    return (
        <>
            {isMobile ? (
                <div
                    className='w-full flex flex-col gap-[15px]'
                >
                    <div
                        className='w-full'
                    >
                        <PercentBar percent={project.progress} />
                    </div>
                    <div
                        className='w-full grid grid-flow-row grid-cols-2 gap-[15px]'
                    >
                        <PriorityDonut project={project} />
                        <TaskOverdue project={project} />
                    </div>
                    <div
                        className='w-full'
                    >
                        <StatusBar project={project} />
                    </div>
                    <div>
                        <RoleBar project={project} />
                    </div>
                </div>
            ) : (
                <div
                    className="w-full overflow-hidden gap-[15px] h-[400px] grid grid-flow-col grid-rows-6 grid-cols-12"
                >
                    <div
                        className='col-span-3 row-span-2'
                    >
                        <PercentBar percent={project.progress} />
                    </div>
                    <div
                        className='col-span-3 row-span-4'
                    >
                        <PriorityDonut project={project} />
                    </div>
                    <div
                        className='col-span-6 lg:col-span-7 row-span-3'
                    >
                        <StatusBar project={project} />
                    </div>
                    <div
                        className='col-span-6 lg:col-span-7 row-span-3'
                    >
                        <RoleBar project={project} />
                    </div>
                    <div
                        className='col-span-3 lg:col-span-2 row-span-3'
                    >
                        <TaskOverdue project={project} />
                    </div>
                </div>
            )}
        </>
    )
}

const PercentBar = ({ percent }) => {
    return (
        <div
            className="w-full h-full bg-white rounded-[15px] px-[15px] py-[25px] border border-grayBorder"
        >
            <div
                className="flex flex-col gap-[10px]"
            >
                <p
                    className="font-medium text-[12px] text-primaryOrange"
                >
                    Complete
                </p>
                <div
                    className="w-full h-[15px] bg-[#EDEDED] rounded-full"
                >
                    <div
                        className="h-full bg-primaryOrange rounded-full"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
        </div>
    )
}

const PriorityDonut = ({ project }) => {

    const formatPriorityData = (tasks) => {

        // Initialize counters
        const priorityCounts = {
            1: 0, // Normal
            2: 0, // Medium
            3: 0  // High
        };

        // Count tasks by priority
        tasks.forEach(task => {
            if (priorityCounts.hasOwnProperty(task.priority)) {
                priorityCounts[task.priority]++;
            }
        });

        return {
            labels: ['Normal', 'Medium', 'High'],
            datasets: [{
                data: [
                    priorityCounts[1],
                    priorityCounts[2],
                    priorityCounts[3]
                ],
                backgroundColor: [
                    '#1CC500', // Normal
                    '#FEB146', // Medium
                    '#FF2425'  // High
                ],
                borderWidth: 0
            }]
        };
    };

    const data = formatPriorityData(project.tasks);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 8,
                    },
                    usePointStyle: true,
                    padding: 5
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
                    bottom: 10
                }
            }
        },
        cutout: '60%',
        spacing: 5,
    };

    return (
        <div
            className='w-full h-full bg-white rounded-[15px] p-[15px] border border-grayBorder'
        >
            <Doughnut data={data} options={options} />
        </div>
    )
}

const StatusBar = ({ project }) => {
    const formatStatusData = (statuses, tasks) => {
        // Sort statuses by position
        const sortedStatuses = [...statuses].sort((a, b) => a.position - b.position);

        // Count tasks for each status
        const statusCounts = sortedStatuses.map(status => {
            return tasks.filter(task => task.statusId === status._id).length;
        });

        return {
            labels: sortedStatuses.map(status => status.statusName),
            datasets: [{
                label: 'Tasks',
                data: statusCounts,
                backgroundColor: sortedStatuses.map(status => status.color),
                borderRadius: 5,
                maxBarThickness: 35
            }]
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Tasks by Status',
                font: {
                    size: 14,
                    weight: 'bold'
                },
                color: '#FF6200',
                padding: {
                    bottom: 0
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    const data = formatStatusData(project.statuses, project.tasks);

    return (
        <div className='w-full h-full min-h-[200px] flex justify-center bg-white rounded-[15px] p-[15px] border border-grayBorder'>
            <Bar data={data} options={options} />
        </div>
    );
};

const RoleBar = ({ project }) => {
    const formatRoleData = (roles, tasks) => {
        // Count tasks for each role
        const roleCounts = roles.map(role => {
            return tasks.filter(task => task.roleId === role.roleId).length;
        });

        return {
            labels: roles.map(role => role.name),
            datasets: [{
                label: 'Tasks',
                data: roleCounts,
                backgroundColor: roles.map(role => role.color),
                borderRadius: 5,
                maxBarThickness: 35
            }]
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Tasks by Role',
                font: {
                    size: 14,
                    weight: 'bold'
                },
                color: '#FF6200',
                padding: {
                    bottom: 0
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    const data = formatRoleData(project.roles, project.tasks);

    return (
        <div className='w-full h-full min-h-[200px] flex justify-center bg-white rounded-[15px] p-[15px] border border-grayBorder'>
            <Bar data={data} options={options} />
        </div>
    );
};

const TaskOverdue = ({ project }) => {
    const countOverdueTasks = (tasks) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // ตั้งเวลาเป็น 00:00:00

        return tasks.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate < today;
        }).length;
    };

    const overdueCount = countOverdueTasks(project.tasks);

    return (
        <div className='w-full min-h-[160px] bg-white rounded-[15px] px-[15px] py-[25px] border border-grayBorder'>
            <div className='w-full h-full flex flex-col justify-center items-center gap-[8px]'>
                <p className='text-center font-medium text-[12px] text-primaryOrange'>
                    You have {overdueCount === 0 ? 'no' : ''} overdue task{overdueCount !== 1 ? 's' : ''}
                </p>
                <p className='font-medium text-[64px] text-primaryOrange'>
                    {overdueCount}
                </p>
            </div>
        </div>
    );
};