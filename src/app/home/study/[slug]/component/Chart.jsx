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
        // ใช้ค่า enum ใหม่โดยตรง
        const statusCounts = {
            'Not started': 0,
            'Inprogress': 0,
            'Completed': 0
        };

        // นับงานตามสถานะใหม่
        assignments.forEach(assignment => {
            if (statusCounts.hasOwnProperty(assignment.status)) {
                statusCounts[assignment.status]++;
            }
        });

        return {
            labels: ['Not started', 'Inprogress', 'Completed'],
            datasets: [{
                data: [
                    statusCounts['Not started'],
                    statusCounts['Inprogress'],
                    statusCounts['Completed']
                ],
                backgroundColor: [
                    '#FEB146', // Not started - Orange
                    '#1F86FF', // Inprogress - Blue
                    '#18A900', // Completed - Green
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
                text: 'Assignments by Status',
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
    const countOverdueAssignments = (assignments) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return assignments.filter(assignment => {
            // ถ้าไม่มีวันสิ้นสุด หรือสถานะเป็น Done แล้ว ไม่นับเป็น overdue
            if (!assignment.endDate || assignment.status === 'Done') return false;

            const dueDate = new Date(assignment.endDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate < today;
        }).length;
    };

    const overdueCount = countOverdueAssignments(course.Assignments);

    return (
        <div className='w-full min-h-[160px] bg-white rounded-[15px] px-[15px] py-[25px] border border-grayBorder'>
            <div className='w-full h-full flex flex-col gap-[8px]'>
                <p className='text-center font-semibold text-[14px] text-primaryOrange'>
                    You have {overdueCount === 0 ? 'no' : ''} overdue assignment{overdueCount !== 1 ? 's' : ''}
                </p>
                <div
                    className='w-full h-full flex flex-col justify-center items-center'
                >
                    <p className='font-medium text-[128px] text-primaryOrange'>
                        {overdueCount}
                    </p>
                    {overdueCount === 0 && (
                        <p className='text-center text-primaryOrange text-[16px]'>
                            Keep it up!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

