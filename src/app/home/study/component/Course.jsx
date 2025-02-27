'use client'

import { extractFormattedDate } from '@/utils/dateUtils'
import { useEffect, useState } from 'react'
import { PlusIcon, TrashIcon } from '../../component/icon/GlobalIcon'
import Link from 'next/link'
import { createCourse, deleteCourseById } from '@/api/course'
import { useRouter } from "next/navigation";

const CourseCard = ({ course, deleteActive, courseId }) => {

  const deleteCourse = async () => {
    try {
      await deleteCourseById(courseId);
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCoursebutton = () => {
    return (
      <div
        onClick={deleteCourse}
        className='w-[20px] h-[20px] flex justify-center items-center  rounded-full bg-red-500'
      >
        <TrashIcon w={13} h={13} color={"#FFFFFF"} /> 
      </div>
    )
  }

  const colorPicker = () => {
    return (
      <div
        className='w-[20px] h-[20px] rounded-full border-2 border-grayBorder'
      >
        
      </div>
    )
  }

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
        className="p-[15px] flex justify-between"
      >
        <Link
          href={`/home/study/${courseId}`}
          className='cursor-pointer'
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
        </Link>
        <div
          className=''
        >
          { deleteActive && deleteActive ? deleteCoursebutton() : colorPicker() }
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
    const newCourse = async () => {
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

    newCourse();
  }

  return (
    <div
      onClick={HandleCreateCourse}
      className="w-full h-[210px] flex justify-center items-center rounded-[15px] border-[1px] border-grayBorder cursor-pointer"
    >
      {loading ? <h1>loading</h1> : <PlusIcon w={25} h={25} color={'#FF6200'} />}
    </div>
  )
}

export default function Course({ coursesData }) {

  const [deleteActive, setDeleteActive] = useState(false);

  return (
    <div
      className="w-full"
    >
      <div
        className='w-full flex justify-between items-center'
      >
        <p
          className="font-medium text-[16px] pb-[15px]"
        >
          Courses
        </p>
        <div
          onClick={() => setDeleteActive(!deleteActive)}
          className='p-[8px] rounded-full'
          style={{ background: deleteActive ? "#fc5656" : "#EDEDED" }}
        >
          {deleteActive ? <TrashIcon w={"16px"} h={"16px"} color={"#FFFFFF"} /> : <TrashIcon w={"16px"} h={"16px"} color={"#000000"} />}
        </div>
      </div>
      <div
        className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(268px,1fr))]"
      >
        {coursesData.map((course) => (
          <CourseCard key={course._id} course={course} deleteActive={deleteActive} courseId={course._id} />
        ))}
        <AddCourseCard />
      </div>
    </div>
  )
}
