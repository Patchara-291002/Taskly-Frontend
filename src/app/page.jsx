'use client'

import LeftSideOverview from "./component/dashboarOverview/LeftSideOverview";
import Header from "./component/header";
import RightSideOverview from "./component/dashboarOverview/RightSideOverview";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function page() {

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/user/${userId}`, {
        withCredentials: true
      })
      .then(response => {
        dispatch(setUser(response.data));
      })
      .catch(error => {
        console.log('Error fetching user data:')
      });
      
    }
  }, [userId, dispatch]);

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