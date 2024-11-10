'use client'

import LeftSideOverview from "./component/dashboarOverview/LeftSideOverview";
import Header from "./component/header";
import RightSideOverview from "./component/dashboarOverview/RightSideOverview";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

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
    <div
      className="
        w-full
        flex
        gap-[60px]
      "
    >
      <LeftSideOverview />
      <RightSideOverview />
    </div>
  );
}