"use client"

import Link from "next/link"
import { SearchIcon, CalendarIcon, NotificationIcon } from "./icon/LayoutIcon"
import { useState } from "react"

export default function header() {

  const [isSearchActive, setIsSearchActive] = useState(false);

  function toggleSearch() {
    setIsSearchActive(!isSearchActive);
  }

  return (
    <div className='w-[100%] pt-[30px] pb-[40px] px-[30px] flex justify-between'>
      <h1
        className='text-black font-semibold leading-[48px]'
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
                className="input w-full max-w-xs bg-white focus:outline-none rounded-[15px] transition-transform duration-200 ease-in opacity-100 translate-x-[0px] scale-100 " />
              : <input type="text" placeholder="Search here"
                className="input w-full max-w-xs bg-white focus:outline-none rounded-[15px] transition-transform duration-200 ease-in opacity-30 translate-x-[100px] scale-x-0" />
          }
          <button
            onClick={toggleSearch}
            className="bg-[#FF6200] w-[50px] min-w-[50px] h-[50px] flex justify-center items-center rounded-full "
          >
            <SearchIcon w='16' h='16' />
          </button>
        </div>
        <Link href='/'>
          <div
            className="bg-[#FF6200] w-[50px] h-[50px] flex justify-center items-center rounded-full "
          >
            <CalendarIcon w='16' h='16' />
          </div>
        </Link>
        <Link href='/'>
          <div
            className="bg-[#FF6200] w-[50px] h-[50px] flex justify-center items-center rounded-full "
          >
            <NotificationIcon w='16' h='16' />
          </div>
        </Link>
      </div>
    </div>
  )
}
