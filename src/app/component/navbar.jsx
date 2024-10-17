"use client";

import { TasklyIcon, DashboardIcon } from "@/app/component/icon/LayoutIcon"
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import react from "react";

export default function Navbar() {

    const pathName = usePathname();

    const list_page = [
        {
            name: "Dashboard",
            link: "/",
            icon: <DashboardIcon w='22' h='22'/>
        },
        {
            name: "Project",
            link: "/project",
            icon: <DashboardIcon w='22' h='22' />
        },
        {
            name: "Activity",
            link: "/activity",
            icon: <DashboardIcon w='22' h='22' />
        },
        {
            name: "Study Planner",
            link: "/study",
            icon: <DashboardIcon w='22' h='22' />
        },
        {
            name: "Help",
            link: "/help",
            icon: <DashboardIcon w='22' h='22' />
        }
    ]

    return (
        <div className="max-w-[260px] w-[100%] bg-[#FF6200] rounded-r-[20px] px-[25px] min-h-screen">
            <div className='mt-[30px] mb-[40px] flex flex-cols justify-center items-center'>
                <h2
                    className='font-black text-[36px] leading-[36px] text-white'
                >
                    TASKLY
                </h2>
            </div>
            <div className='flex flex-col gap-[10px]'>
                {list_page.map((page, index) => {
                    const isActive = page.link === '/' ? pathName === '/' : pathName.startsWith(page.link);
                    return (
                        <Link key={index} href={page.link}>
                            <button
                                className={isActive 
                                    ? 'w-full flex justify-start items-center pl-[46px] h-[75px] gap-[10px] rounded-[15px] bg-white' 
                                    : 'w-full flex justify-start items-center pl-[46px] h-[75px] gap-[10px] rounded-[15px]'}
                            >
                                {react.cloneElement(page.icon, { color: isActive ? '#FF6200' : '#FFFFFF' })}
                                <h2
                                    className={isActive ? 'font-bold  text-[#FF6200]' : 'font-medium text-white'}
                                >
                                    {page.name}
                                </h2>
                            </button>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
