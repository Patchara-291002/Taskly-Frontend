'use client'

import { extractFormattedDate } from '@/utils/dateUtils'
import { useEffect } from 'react'
import { PlusIcon } from '../../component/icon/GlobalIcon'

const CourseCard = ({ course }) => {
  return (
    <div
      className="w-full h-[210px] flex flex-col border-[1px] border-grayBorder rounded-[15px] overflow-hidden"
    >
      <div
        className={`w-full h-[134px]`}
        style={{ backgroundColor: `${course.courseColor}` }}
      >

      </div>
      <div
        className="w-full p-[15px]"
      >
        <div>
          <p
            className='text-[#454545] font-medium text-[14px]'
          >
            {course.courseName}
          </p>
        </div>
        <div>
          <p
            className='text-[#454545] font-medium text-[12px]'
          >
            {course.Assignment} Assignment
          </p>
        </div>
      </div>
    </div>
  )
}

const AddCourseCard = () => {
  return (
    <div
      className="w-full h-[210px] flex justify-center items-center border-[1px] border-grayBorder"
    >
      <PlusIcon w={25} h={25} color={'#FF6200'} />
    </div>
  )
}

export default function Course({ coursesData }) {


  return (
    <div
      className="w-full"
    >
      <p
        className="font-medium text-[16px] pb-[15px]"
      >
        Courses
      </p>
      <div
        className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(268px,1fr))]"
      >
        {coursesData.map((course, index) => (
          <CourseCard key={course._id} course={course} />
        ))}
        <AddCourseCard />
      </div>
    </div>
  )
}
