"use client"

import Link from "next/link"
import { SearchIcon, CalendarIcon, NotificationIcon, LogoutIcon } from "./icon/LayoutIcon"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext";
import useWindowSize from "@/hooks/useWindow";

export default function Header() {

  const { handleLogout } = useAuth();

  const [isSearchActive, setIsSearchActive] = useState(false);

  const { width } = useWindowSize();
  const isMobile = width < 1440;


  function toggleSearch() {
    setIsSearchActive(!isSearchActive);
  }

  return (
    <>
      {isMobile
        ? <MobileLayout />
        : <DeskTopLayout isSearchActive={isSearchActive} toggleSearch={toggleSearch} handleLogout={handleLogout} />}
    </>
  )
}

const DeskTopLayout = ({ isSearchActive, toggleSearch, handleLogout }) => {
  return (
    <div className='w-[100%] pt-[30px] pb-[40px] flex justify-end'>
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

const MobileLayout = () => {
  return (
    <>
      <div
        className="w-full h-[106px] flex flex-col justify-end bg-primaryOrange"
      >
        <div
          className="w-full h-[44px] flex justify-between pb-[8px] px-[13px]"
        >
          <p
            className="text-white font-bold text-[24px]"
          >
            Taskly
          </p>
        </div>
      </div>
    </>
  )
}