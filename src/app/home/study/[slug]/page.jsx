'use client'

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCourseById } from '@/api/course';
import CourseInfo from './component/CourseInfo';
import CourseFile from './component/CourseFile';
import CourseHeader from './component/CourseHeader';
export default function page() {

    const pathname = usePathname();
    const courseId = pathname.split('/').pop();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    useEffect(() => {
        if (!courseId) return;
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
        getCourseById()
    }, [courseId])


    return (
        <div>
            <CourseHeader course={course} />
            <p
                className='font-medium pb-[15px]'
            >
                Subject Description
            </p>
            <div
                className='w-full flex gap-[30px]'
            >
                <CourseInfo course={course} />
                <CourseFile />
            </div>
        </div>
    )
}
