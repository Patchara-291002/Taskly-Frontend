"use client";

import { TasklyIcon, DashboardIcon } from "@/app/component/icon/layoutIcon"
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import react from "react";

export default function Navbar() {

    const pathName = usePathname();

    const navbarStyle = "max-w-[300px] w-[100%] bg-[#FF6200] rounded-r-[20px] px-[30px]";

    const list_page = [
        {
            name: "Dashboard",
            link: "/",
            icon: <DashboardIcon w='25' h='25'/>
        },
        {
            name: "Project",
            link: "/project",
            icon: <DashboardIcon w='25' h='25' />
        },
        {
            name: "Activity",
            link: "/activity",
            icon: <DashboardIcon w='25' h='25' />
        },
        {
            name: "Study Planner",
            link: "/study",
            icon: <DashboardIcon w='25' h='25' />
        },
        {
            name: "Help",
            link: "/help",
            icon: <DashboardIcon w='25' h='25' />
        }
    ]

    return (
        <div className={navbarStyle}>
            <div className='mt-[30px] mb-[40px] flex justify-center items-center'>
                <p
                    className='font-bold text-[48px] text-white'
                >
                    TASKLY
                </p>
            </div>
            <div className='flex flex-col gap-[10px]'>
                {list_page.map((page, index) => {
                    const isActive = page.link === '/' ? pathName === '/' : pathName.startsWith(page.link);
                    return (
                        <Link key={index} href={page.link}>
                            <button
                                className={isActive 
                                    ? 'w-[100%] flex justify-start items-center pl-[46px] bg-white h-[75px] gap-[10px] rounded-[15px]' 
                                    : 'w-[100%] flex justify-start items-center pl-[46px] h-[75px] gap-[10px] rounded-[15px]'}
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
