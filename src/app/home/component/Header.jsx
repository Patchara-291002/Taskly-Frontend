"use client"

import Link from "next/link"
import { SearchIcon, CalendarIcon, NotificationIcon, LogoutIcon } from "./icon/LayoutIcon"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext";

export default function header() {

  const { handleLogout } = useAuth();

  const [isSearchActive, setIsSearchActive] = useState(false);

  function toggleSearch() {
    setIsSearchActive(!isSearchActive);
  }

  return (
    <div className='w-[100%] pt-[30px] pb-[40px] flex justify-between'>
      <h1
        className='text-primaryorange font-semibold leading-[32px]'
      >
        Dashboard
      </h1>
      <div
        className='flex flex-row gap-[20px]'
      >
        <div
          className="flex flex-row gap-[20px]"
        >
          {
            isSearchActive
              ? <input type="text" placeholder="Search here"
                className="input w-[300px] h-[40px] bg-white focus:outline-none rounded-[15px] transition-transform duration-200 ease-in opacity-100 translate-x-[0px] scale-100 " />
              : <input type="text" placeholder="Search here"
                className="input w-[300px] h-[40px] bg-white focus:outline-none rounded-[15px] transition-transform duration-200 ease-in opacity-30 translate-x-[100px] scale-x-0" />
          }
          <button
            onClick={toggleSearch}
            className="bg-[#FF6200] w-[40px] min-w-[40px] h-[40px] flex justify-center items-center rounded-full "
          >
            <SearchIcon w='12' h='12' />
          </button>
        </div>
        <Link href='/'>
          <div
            className="bg-[#FF6200] w-[40px] h-[40px] flex justify-center items-center rounded-full "
          >
            <CalendarIcon w='12' h='12' />
          </div>
        </Link>
        <Link href='/'>
          <div
            className="bg-[#FF6200] w-[40px] h-[40px] flex justify-center items-center rounded-full "
          >
            <NotificationIcon w='12' h='12' />
          </div>
        </Link>
        <Link href='/'>
          <div
            onClick={handleLogout}
            className="bg-[#FF6200] w-[40px] h-[40px] flex justify-center items-center rounded-full "
          >
            <LogoutIcon w='12' h='12' color={'#ffffff'} />
          </div>
        </Link>
      </div>
    </div>
  )
}
