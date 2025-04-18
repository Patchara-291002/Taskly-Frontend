"use client"

import Link from "next/link"
import { SearchIcon, CalendarIcon, NotificationIcon, LogoutIcon } from "./icon/LayoutIcon"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext";
import useWindowSize from "@/hooks/useWindow";
import { BurgerIcon, LineIcon, TaskIcon } from "@/app/component/GlobalIcon";
import Image from "next/image";
import { DashboardIcon, ProjectIcon, StudyIcon, HelpIcon } from "@/app/home/component/icon/LayoutIcon"
import { usePathname } from 'next/navigation';
import React from "react";
import { getNotification } from "@/api/home";
import { set } from "date-fns";
import { formatToDate } from "@/utils/dateUtils";
import { searchItems } from "@/api/home";
import { useRouter } from "next/navigation";
import { CrossIcon } from "./icon/GlobalIcon";

export default function Header() {
  const { handleLogout } = useAuth();

  const { width } = useWindowSize();
  const isMobile = width < 1440;

  return (
    <>
      {isMobile ? (
        <MobileLayout
          handleLogout={handleLogout}
        />
      ) : (
        <DeskTopLayout
          handleLogout={handleLogout}
        />
      )}
    </>
  );
}

const DeskTopLayout = ({ handleLogout }) => {
  return (
    <div className="w-[100%] pt-[30px] pb-[40px] flex justify-end">
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-row gap-[20px]">
          <SearchBar />
        </div>
        <NotificationButton width={12} height={12} />
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

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false);

  function toggleSearch() {
    setIsSearchActive(!isSearchActive);
  }

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Search API function
  const searchAPI = async (query) => {
    try {
      setIsLoading(true);
      const response = await searchItems(query);
      console.log("Search results:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = React.useCallback(
    debounce((query) => {
      if (query) searchAPI(query);
    }, 300),
    []
  );

  // Effect to trigger search when query changes
  useEffect(() => {
    if (searchQuery.length > 2) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, debouncedSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };

  return (
    <div className="relative flex flex-row gap-[20px] ">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search here"
          className={`
            input w-[300px] h-[40px] bg-white 
            focus:outline-none rounded-[15px] px-4
            transition-all duration-300 ease
            ${isSearchActive
              ? "opacity-100 translate-x-[0px] scale-100"
              : "opacity-0 translate-x-[100px] scale-x-0 pointer-events-none"
            }
          `}
        />

        {/* Search Results Dropdown */}
        {showResults && isSearchActive && (
          <div className="absolute top-[45px] left-0 w-[300px] max-h-[400px] 
                         overflow-y-auto bg-white rounded-[15px] shadow-lg z-50 p-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-2 border-primaryOrange border-t-transparent rounded-full animate-spin" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col gap-2">
                {searchResults.map((result, index) => (
                  <Link
                    key={index}
                    href={result.link}
                    onClick={() => {
                      setSearchQuery('');
                      setShowResults(false);
                      toggleSearch();
                    }}
                    className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    {/* Customize based on your API response structure */}
                    <p className="text-sm font-medium">{result.name}</p>
                    <p className="text-xs text-gray-500">{result.type}</p>
                  </Link>
                ))}
              </div>
            ) : searchQuery ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No results found
              </p>
            ) : null}
          </div>
        )}
      </div>

      <button onClick={toggleSearch} className="bg-primaryOrange w-[40px] min-w-[40px] h-[40px] flex justify-center items-center rounded-full">
        <SearchIcon w="12" h="12" color={"white"} />
      </button>
    </div>
  );
};

const SearchBarMobile = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Search API function
  const searchAPI = async (query) => {
    try {
      setIsLoading(true);
      const response = await searchItems(query);
      console.log("Search results:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = React.useCallback(
    debounce((query) => {
      if (query) searchAPI(query);
    }, 300),
    []
  );

  // Effect to trigger search when query changes
  useEffect(() => {
    if (searchQuery.length > 2) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, debouncedSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };

  return (
    <div className="w-full flex flex-row gap-[20px] ">
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search here"
          className={`
            w-full h-[60px] bg-white 
            focus:outline-none rounded-[15px] px-[20px]
            transition-all duration-300 ease
            border border-grayBorder
            outline-none
          `}
        />
        <div className="absolute top-1/2 right-5 -translate-y-1/2">
          {showResults ? (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowResults(false);
              }}
            >
              <CrossIcon w={12} h={12} color={"#FF6200"} />
            </button>
          ) : (
            <SearchIcon w={16} h={16} color={"#FF6200"} />
          )}
        </div>

        {showResults && (
          <div className="absolute top-[60px] left-0 w-full max-h-[400px] 
           overflow-y-auto bg-white rounded-[15px] shadow-lg z-50 p-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-2 border-primaryOrange border-t-transparent rounded-full animate-spin" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col gap-2">
                {searchResults.map((result, index) => (
                  <Link
                    key={index}
                    href={result.link}
                    onClick={() => {
                      setSearchQuery('');
                      setShowResults(false);
                      toggleSearch();
                    }}
                    className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    {/* Customize based on your API response structure */}
                    <p className="text-sm font-medium">{result.name}</p>
                    <p className="text-xs text-gray-500">{result.type}</p>
                  </Link>
                ))}
              </div>
            ) : searchQuery ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No results found
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationButton = ({ width, height }) => {

  const [notification, setNotification] = useState([]);

  const fetchNotification = async () => {
    try {
      const response = await getNotification();
      setNotification(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }

  useEffect(() => {
    fetchNotification();
  }, []);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          className=" bg-primaryOrange w-[40px] h-[40px] flex justify-center items-center rounded-full"
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        >
          <NotificationIcon w={width} h={height} />
        </button>
        {isNotificationOpen && (
          <div
            className="w-[400px] h-[620px] overflow-y-auto bg-white rounded-[15px] absolute top-[45px] right-[0px] p-[25px] shadow-lg  z-50"
          >
            <div
              className="w-full flex  justify-between items-baseline"
            >
              <p
                className="font-semibold text-[18px] text-primaryOrange"
              >
                Notifications
              </p>
              <div
                className="flex gap-[5px] items-center"
              >
                <p
                  className="text-[12px] text-[#707070]"
                >
                  Get notificaions from
                </p>
                <LineIcon w={20} h={20} color="#39CD00" />
              </div>
            </div>
            <div
              className="w-full flex flex-col gap-[10px] mt-[20px]"
            >
              {notification.length > 0 ? (
                notification.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="w-full border px-[10px] py-[15px] rounded-[15px] flex gap-[10px]"
                  >
                    <div className="w-[56px] h-[56px] flex-shrink-0 rounded-[10px] bg-primaryOrange/20 flex justify-center items-center">
                      {item.type === "task-assigned" && <ProjectIcon w={20} h={20} color="#FF6200" />}
                      {item.type === "assignment" && <StudyIcon w={20} h={20} color="#FF6200" />}
                      {item.type === "task-deadline" && <TaskIcon w={20} h={20} color="#FF6200" />}
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="text-[12px] text-[#454545]">
                        {item.message || "⏰ No message"}
                      </p>
                      <p className="text-[10px] text-[#707070]">
                        {formatToDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-[200px] flex items-center justify-center">
                  <p className="text-[14px] text-[#707070]">No notifications</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

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
        <div className="w-full h-[106px] flex flex-col justify-end bg-primaryOrange drop-shadow-lg">
          <div className="w-full h-[44px] flex justify-between pb-[8px] px-[13px]">
            <Link href="/home/dashboard">
              <p className="text-white font-bold text-[24px]">
                Taskly
              </p>
            </Link>
            <div
              className="flex items-center gap-[15px]"
            >
              <NotificationButton width={17} height={18} />
              <button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                <BurgerIcon w={25} h={25} color="#FFFFFF" />
              </button>
            </div>
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
  const { user, handleLogout } = useAuth();
  const router = useRouter();
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

  const handleItemClick = async (link) => {
    if (link === '/home/logout') {
      handleLogout();
      router.push('/login');
    } else {
      await router.push(link);
      setIsSideBarOpen(false);
    }
  };

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
          <SearchBarMobile />
          {list_page.map((page, index) => {
            const isActive = page.link === "/"
              ? pathName === "/"
              : pathName.startsWith(page.link);
            return (
              <div
                key={index}
                onClick={() => handleItemClick(page.link)}
                className="cursor-pointer mt-[20px]"
              >
                <div 
                  className="w-full flex items-center gap-[10px] rounded-[15px] px-[20px] py-[20px] font-bold"
                  style={{ backgroundColor: isActive ? "#FF6200" : "transparent" }}
                >
                  {React.cloneElement(page.icon, { color: isActive ? "#FFFFFF" : "#FF6200" })}
                  <p className={
                    isActive
                      ? "text-white"
                      : "text-primaryOrange"
                  }>
                    {page.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};