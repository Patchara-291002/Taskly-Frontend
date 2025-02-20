import { MoreIcon } from "@/app/home/component/icon/DashboardIcon";


export default function CourseHeader({ course }) {
    return (
        <div
            className='w-full flex justify-between items-center pb-[40px]'
        >
            <div>
                <p className='font-semibold text-[24px] text-primaryorange'>{course && course.courseName}</p>
            </div>
            <MoreIcon  w={14} h={14} color={"#000000"}/>
        </div>
    )
}
