'use client'

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCourseById } from '@/api/course';
import CourseInfo from './component/CourseInfo';
import CourseFile from './component/CourseFile';
import CourseHeader from './component/CourseHeader';
import CourseTable from './component/CourseTable';
export default function page() {

    const pathname = usePathname();
    const courseId = pathname.split('/').pop();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);

    const getCourseById = async () => {
        setLoading(true);
        try {
            const data = await fetchCourseById(courseId);
            setCourse(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!courseId) return;
        getCourseById()
    }, [courseId])


    return (
        <>
            {course && <div>
                <CourseHeader course={course} getCourseById={getCourseById} />
                <p
                    className='font-medium pb-[15px]'
                >
                    Subject Description
                </p>
                <div
                    className='w-full h-[280px] flex gap-[30px]'
                >
                    <CourseInfo course={course} />
                    <CourseFile course={course} />
                </div>
                <CourseTable course={course} />
            </div>}
        </>
    )
}
