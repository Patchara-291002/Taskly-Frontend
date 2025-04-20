'use client'

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCourseById } from '@/api/course';
import CourseInfo from './component/CourseInfo';
import CourseFile from './component/CourseFile';
import CourseHeader from './component/CourseHeader';
import CourseTable from './component/CourseTable';
import useWindowSize from '@/hooks/useWindow';
import Chart from './component/Chart';
import Loading from '@/app/component/GlobalComponent/Loading';

export default function Page() {

    const { width } = useWindowSize();


    const pathname = usePathname();
    const courseId = pathname.split('/').pop();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);

    const getCourseById = async () => {
        try {
            const data = await fetchCourseById(courseId);
            setCourse(data);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        if (!courseId) return;
        const getCourse = async () => {
            setLoading(true);
            try {
                await getCourseById();
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        getCourse()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            {course &&
                <div
                    className='w-full'
                >
                    <CourseHeader course={course} getCourseById={getCourseById} />
                    <p
                        className='font-medium pb-[15px]'
                    >
                        Subject Description
                    </p>
                    {width < 1024 ?
                        <div
                            className='w-full flex flex-col gap-[25px]'
                        >
                            <CourseInfo course={course} getCourseById={getCourseById} />
                            <CourseFile course={course} getCourseById={getCourseById} />
                        </div>
                        :
                        <div
                            className='w-full h-[280px] flex gap-[30px]'
                        >
                            <CourseInfo course={course} getCourseById={getCourseById} />
                            <CourseFile course={course} getCourseById={getCourseById} />
                        </div>
                    }
                    <CourseTable course={course} getCourseById={getCourseById} />
                    <Chart course={course} getCourseById={getCourseById} />
                </div>}
        </>
    )
}
