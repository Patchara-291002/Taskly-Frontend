'use client'

import Timetable from './component/Timetable'
import Course from './component/Course'
import React, { useEffect, useState } from 'react'
import { fetchCourse } from '@/api/course'
import Loading from '@/app/component/GlobalComponent/Loading'

export default function Page() {
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCourse = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCourse();
      setCoursesData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const loadingCourse = async () => {
    try {
      const data = await fetchCourse();
      setCoursesData(data);
    } catch (err) {
      console.error(err);
    } 
  }

  useEffect(() => {
    getCourse();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-[40px]'>
      {coursesData && (
        <Course
          coursesData={coursesData}
          getCourse={loadingCourse}
        />
      )}
      <Timetable coursesData={coursesData} />
    </div>
  );
}