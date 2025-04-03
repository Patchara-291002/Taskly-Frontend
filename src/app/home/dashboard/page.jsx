'use client'

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import LeftSideOverview from "../component/dashboarOverview/LeftSideOverview";
import RightSideOverview from "../component/dashboarOverview/RightSideOverview";
import ProtectedRoute from '../component/ProtectedRoute';
import useWindowSize from '@/hooks/useWindow';
import BannerOverview from '../component/dashboarOverview/Banner/BannerOverview';
import ClassOverview from '../component/dashboarOverview/ClassToDay/ClassOverview';
import AssignmentOverview from '../component/dashboarOverview/Assignment/AssignmentOverview';
import ProjectOverview from '../component/dashboarOverview/Project/ProjectOverview';
import TaskOverview from '../component/dashboarOverview/Task/TaskOverview';

export default function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const { width } = useWindowSize();

  const isMobile = width < 1440;

  useEffect(() => {
    if (userId) {
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}`, {
        withCredentials: true
      })
        .then(response => {
          const data = response.data
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(error => {
          console.log('Error fetching user data:')
        });

    }
  }, [userId]);

  return (
    <ProtectedRoute>
      {isMobile ? (
        <MobileLayout />
      ) : <DeskTopLayout />}
    </ProtectedRoute>

  );
}

const DeskTopLayout = () => {
  return (
    <>
      <div className="w-full flex gap-[60px]">
        <LeftSideOverview />
        <RightSideOverview />
      </div>
    </>
  )
}

const MobileLayout = () => {
  return (
    <>
      <div
        className='w-full flex flex-col gap-[25px]'
      >
        <BannerOverview />
        <ClassOverview />
        <AssignmentOverview />
        <ProjectOverview />
        <TaskOverview />
      </div>
    </>
  )
}
