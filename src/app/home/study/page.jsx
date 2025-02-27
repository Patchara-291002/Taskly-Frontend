'use client'

import Timetable from './component/Timetable'
import Course from './component/Course'
import Table from './component/Table'
import { useEffect, useState } from 'react'
import { fetchCourse, fetchAssignment, deleteCourseById } from '@/api/course'
export default function page() {

  const [coursesData, setCoursesData] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const data = await fetchCourse();
        setCoursesData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    const getAssignment = async () => {
      try {
        const data = await fetchAssignment();
        setAssignmentData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getCourse();
    getAssignment();
  }, [])

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div
        className='flex flex-col gap-[40px]'
      >
        <Course coursesData={coursesData} />
        <Timetable coursesData={coursesData} />
        {/* <Table assignmentData={assignmentData} /> */}
      </div>
    </>
  )
}
