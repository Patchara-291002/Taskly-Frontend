'use client'

import { extractFormattedDate } from '@/utils/dateUtils'
import { useEffect, useState } from 'react'
import { PlusIcon, TrashIcon, TrashSolidIcon } from '../../component/icon/GlobalIcon'
import Link from 'next/link'
import { createCourse, deleteCourseById, updateCourseById } from '@/api/course'
import { useRouter } from "next/navigation";

const CourseCard = ({ course, deleteActive, courseId, 
  getCourse 
}) => {

  const deleteCourse = async () => {
    try {
      await deleteCourseById(courseId);
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  const DeleteCourse = () => {
    return (
      <div
        onClick={deleteCourse}
        className='z-50 absolute top-2 right-2 w-[30px] h-[30px] rounded-full bg-[#FF0000] cursor-pointer'
      >
        <div
          className='w-full h-full flex justify-center items-center'
        >
          <TrashSolidIcon w={16} h={16} color={"#FFFFFF"} />
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full h-[210px] relative flex flex-col border-[1px] border-grayBorder rounded-[15px] overflow-hidden"
    >
      <Link
        href={`/home/study/${courseId}`}
        className='cursor-pointer'
      >
        <div
          className={`w-full h-[134px] flex justify-center items-center`}
          style={{ backgroundColor: `${course.courseColor || "#D6D6D6"}` }}
        >
          <p
            className='font-bold text-[24px] text-white text-center'
          >
            {course.courseName}
          </p>
        </div>
      </Link>
      <div
        className='p-[15px]'
      >
        <div
          className="flex justify-between"
        >
          <p
            className='text-[#454545] font-medium text-[12px]'
          >
            {course.Assignment} Assignment
          </p>
          <div
            className=''
          >
            <ColorPicker 
              courseId={courseId} 
              initialColor={course.courseColor} 
              getCourse={getCourse} 
            />
          </div>
        </div>
      </div>
      {deleteActive && (
        <DeleteCourse />
      )}
    </div>
  )
}

function ColorPicker({ courseId, initialColor, 
  getCourse 
}) {

  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleChangeColor = async (newColor) => {
    setSelectedColor(newColor);
    try {
      // เรียก API อัปเดตสีใน DB
      await updateCourseById(courseId, { courseColor: newColor });
      console.log("Color updated to:", newColor);
      getCourse();
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  return (
    <div className="relative w-4 h-4">
      {/* input type="color" */}
      <input
        type="color"
        value={initialColor}
        onChange={(e) => handleChangeColor(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {/* วงกลมสี */}
      <span
        className="absolute w-4 h-4 rounded-full border pointer-events-none"
        style={{ backgroundColor: selectedColor }}
      />
    </div>
  );
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

export default function Course({ coursesData, 
  getCourse
 }) {

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
          style={{ background: deleteActive ? "#FFE0E0" : "" }}
        >
          {deleteActive ? <TrashSolidIcon w={"16px"} h={"16px"} color={"#FF0000"} /> : <TrashSolidIcon w={"16px"} h={"16px"} color={"#CBCBCB"} />}
        </div>
      </div>
      <div
        className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(268px,1fr))]"
      >
        {coursesData.map((course) => (
          <CourseCard 
            key={course._id} 
            course={course} 
            deleteActive={deleteActive} 
            courseId={course._id} 
            getCourse={getCourse} 
          />
        ))} 
        <AddCourseCard />
      </div>
    </div>
  )
}
