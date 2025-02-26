'use client'

import { extractFormattedDate } from '@/utils/dateUtils'
import { useEffect, useState } from 'react'
import { PlusIcon } from '../../component/icon/GlobalIcon'
import Link from 'next/link'
import { createCourse } from '@/api/course'
import { useRouter } from "next/navigation";

const CourseCard = ({ course }) => {
  return (
    <div
      className="w-full h-[210px] flex flex-col border-[1px] border-grayBorder rounded-[15px] overflow-hidden"
    >
      <div
        className={`w-full h-[134px]`}
        style={{ backgroundColor: `${course.courseColor || "#FF6200"}` }}
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

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function HandleCreateCourse() {
    const defaultCourseName = "New Course"
    const createCourse = async () => {
      try {
        const data = await createCourse(defaultCourseName);
        console.log(data._id)
        router.push(`/home/study/${data._id}`);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    createCourse();
  }

  return (
    <div
      onClick={HandleCreateCourse}
      className="w-full h-[210px] flex justify-center items-center rounded-[15px] border-[1px] border-grayBorder cursor-pointer"
    >
      { loading ? <h1>loading</h1> : <PlusIcon w={25} h={25} color={'#FF6200'} /> }
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
        {coursesData.map((course) => (
          <Link
            key={course._id}
            href={`/home/study/${course._id}`}
          >
            <CourseCard course={course} />
          </Link>
        ))}
        <AddCourseCard />
      </div>
    </div>
  )
}
