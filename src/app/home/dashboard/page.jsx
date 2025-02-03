'use client'

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import LeftSideOverview from "../component/dashboarOverview/LeftSideOverview";
import RightSideOverview from "../component/dashboarOverview/RightSideOverview";
import ProtectedRoute from '../component/ProtectedRoute';

export default function page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/user/${userId}`, {
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
      <div
        className="w-full flex gap-[60px]"
      >
        <LeftSideOverview />
        <RightSideOverview />
      </div>
    </ProtectedRoute>

  );
}