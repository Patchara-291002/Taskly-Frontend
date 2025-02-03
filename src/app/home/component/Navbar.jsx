"use client";

import { TasklyIcon, DashboardIcon, ProjectIcon, StudyIcon, ActivityIcon, HelpIcon, LogoutIcon } from "@/app/home/component/icon/LayoutIcon"
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import react from "react";

export default function Navbar() {

    const pathName = usePathname();

    const list_page = [
        {
            name: "Dashboard",
            link: "/home/dashboard",
            icon: <DashboardIcon w='22' h='22' />
        },
        {
            name: "Project",
            link: "/home/project",
            icon: <ProjectIcon w='22' h='22' />
        },
        {
            name: "Activity",
            link: "/home/activity",
            icon: <ActivityIcon w='22' h='22' />
        },
        {
            name: "Study Planner",
            link: "/home/study",
            icon: <StudyIcon w='22' h='22' />
        },
        {
            name: "Help",
            link: "/home/help",
            icon: <HelpIcon w='22' h='22' />
        },
        // {
        //     name: "Logout",
        //     link: "/home/logout",
        //     icon: <LogoutIcon w='22' h='22' />
        // },
    ]

    return (
        <div className="w-[260px] h-full bg-[#FF6200] rounded-r-[20px] min-h-screen">
            <div className='pt-[30px] mb-[40px] flex flex-cols justify-center items-center'>
                <h2
                    className='font-black text-[36px] leading-[36px] text-white'
                >
                    TASKLY
                </h2>
            </div>
            <div className='flex flex-col items-center gap-[10px] w-full'>
                {list_page.map((page, index) => {
                    const isActive = page.link === '/' ? pathName === '/' : pathName.startsWith(page.link);
                    return (
                        <Link key={index} href={page.link}>
                            <button
                                className={isActive
                                    ? 'w-[210px] flex justify-center items-center h-[60px] rounded-[15px] bg-white'
                                    : 'w-[210px] flex justify-center items-center h-[60px] rounded-[15px]'}
                            >
                                <div
                                    className="flex justify-start w-[150px] gap-[10px]"
                                >
                                    {react.cloneElement(page.icon, { color: isActive ? '#FF6200' : '#FFFFFF' })}
                                    <h2
                                        className={isActive ? 'font-bold  text-[#FF6200]' : 'font-medium text-white'}
                                    >
                                        {page.name}
                                    </h2>
                                </div>
                            </button>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
