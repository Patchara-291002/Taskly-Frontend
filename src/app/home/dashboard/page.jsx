'use client'

import { Suspense } from "react";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import api from '@/utils/api';
import LeftSideOverview from "../component/dashboarOverview/LeftSideOverview";
import RightSideOverview from "../component/dashboarOverview/RightSideOverview";
import ProtectedRoute from '../component/ProtectedRoute';
import useWindowSize from '@/hooks/useWindow';
import BannerOverview from '../component/dashboarOverview/Banner/BannerOverview';
import ClassOverview from '../component/dashboarOverview/ClassToDay/ClassOverview';
import AssignmentOverview from '../component/dashboarOverview/Assignment/AssignmentOverview';
import ProjectOverview from '../component/dashboarOverview/Project/ProjectOverview';
import TaskOverview from '../component/dashboarOverview/Task/TaskOverview';

function DashboardContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const { width } = useWindowSize();
  const isMobile = width < 1440;

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await api.get(`/user/${userId}`);
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.error('❌ Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <ProtectedRoute>
      {isMobile ? <MobileLayout /> : <DeskTopLayout />}
    </ProtectedRoute>
  );
}

const DeskTopLayout = () => {
  return (
    <div className="w-full flex gap-[60px]">
      <LeftSideOverview />
      <RightSideOverview />
    </div>
  );
}

const MobileLayout = () => {
  return (
    <div className='w-full flex flex-col gap-[25px]'>
      <BannerOverview />
      <ClassOverview />
      <AssignmentOverview />
      <ProjectOverview />
      <TaskOverview />
    </div>
  );
}

// Main component wrapped with Suspense
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-primaryOrange border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}