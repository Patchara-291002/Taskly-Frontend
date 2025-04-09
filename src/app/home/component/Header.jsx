"use client"

import Link from "next/link"
import { SearchIcon, CalendarIcon, NotificationIcon, LogoutIcon } from "./icon/LayoutIcon"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext";
import useWindowSize from "@/hooks/useWindow";
import { BurgerIcon } from "@/app/component/GlobalIcon";
import Image from "next/image";
import { DashboardIcon, ProjectIcon, StudyIcon, HelpIcon } from "@/app/home/component/icon/LayoutIcon"
import { usePathname } from 'next/navigation';
import React from "react";

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
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DeskTopLayout 
          isSearchActive={isSearchActive} 
          toggleSearch={toggleSearch} 
          handleLogout={handleLogout} 
        />
      )}
    </>
  );
}

const DeskTopLayout = ({ isSearchActive, toggleSearch, handleLogout }) => {
  return (
    <div className="w-[100%] pt-[30px] pb-[40px] flex justify-end">
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-row gap-[20px]">
          <input 
            type="text" 
            placeholder="Search here"
            className={`input w-[300px] h-[40px] bg-white focus:outline-none rounded-[15px] 
              transition-transform duration-200 ease-in
              ${isSearchActive 
                ? "opacity-100 translate-x-[0px] scale-100"
                : "opacity-30 translate-x-[100px] scale-x-0"
              }`}
          />
          <button
            onClick={toggleSearch}
            className="bg-primaryOrange w-[40px] min-w-[40px] h-[40px] flex justify-center items-center rounded-full"
          >
            <SearchIcon w="12" h="12" />
          </button>
        </div>
        <Link href="/">
          <div className="bg-primaryOrange w-[40px] h-[40px] flex justify-center items-center rounded-full">
            <NotificationIcon w="12" h="12" />
          </div>
        </Link>
        <div
          onClick={handleLogout}
          className="bg-primaryOrange w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer"
        >
          <LogoutIcon w="12" h="12" color="#ffffff" />
        </div>
      </div>
    </div>
  );
};

const MobileLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSideBarOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full h-[106px] flex flex-col justify-end bg-primaryOrange">
          <div className="w-full h-[44px] flex justify-between pb-[8px] px-[13px]">
            <p className="text-white font-bold text-[24px]">
              Taskly
            </p>
            <button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
              <BurgerIcon w={25} h={25} color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isSideBarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSideBarOpen(false)}
      />
      <div className="pt-[106px]">
        <Sidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
      </div>
    </>
  );
};

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const { user } = useAuth();
  const pathName = usePathname();
  const Avatar = "https://avatars.githubusercontent.com/u/119255542?s=48&v=4";

  const list_page = [
    {
      name: "Home",
      link: "/home/dashboard",
      icon: <DashboardIcon w="22" h="22" />
    },
    {
      name: "Project",
      link: "/home/project",
      icon: <ProjectIcon w="22" h="22" />
    },
    {
      name: "Study Planner",
      link: "/home/study",
      icon: <StudyIcon w="22" h="22" />
    },
    {
      name: "Help",
      link: "/home/help",
      icon: <HelpIcon w="22" h="22" />
    },
    {
      name: "Logout",
      link: "/home/logout",
      icon: <LogoutIcon w="22" h="22" />
    }
  ];

  return (
    <div
      className={`fixed top-[106px] right-0 w-[80%] h-[calc(100vh)] 
        bg-white shadow-lg overflow-y-auto z-50
        transform transition-transform duration-300 ease-in-out
        ${isSideBarOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-[20px]">
        {/* <p className="text-[24px] font-bold text-primaryOrange">
          TASKLY
        </p> */}
        <div className="w-full pb-[30px] flex items-center gap-[15px] border-b border-grayBorder">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            {user && (
              <Image 
                width={50} 
                height={50} 
                src={user.profile || Avatar} 
                alt="Profile" 
                referrerPolicy="no-referrer" 
              />
            )}
          </div>
          {user && (
            <p className="font-medium">
              {user.name || "User"}
            </p>
          )}
        </div>
        <div className="w-full pt-[30px] flex flex-col gap-[10px]">
          {list_page.map((page, index) => {
            const isActive = page.link === "/" 
              ? pathName === "/" 
              : pathName.startsWith(page.link);
            return (
              <Link key={index} href={page.link} onClick={() => setIsSideBarOpen(false)}>
                <div className="w-full flex items-center gap-[10px] active:bg-[#FF6200]/20 rounded-[15px] px-[20px] py-[20px]">
                  {React.cloneElement(page.icon, { color: "#FF6200" })}
                  <p className={
                    isActive 
                      ? "font-bold text-primaryOrange" 
                      : "font-medium text-[#FF6200]"
                  }>
                    {page.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};