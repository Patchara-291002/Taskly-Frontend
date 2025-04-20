'use client'

import Navbar from "./component/Navbar"
import Header from "./component/Header"
import useWindowSize from "@/hooks/useWindow";

export default function RootLayout({ children }) {

    const { width } = useWindowSize();
    const isMobile = width < 1440;

    return (
        <>
            { isMobile 
                ? 
                <MobileLayout children={children} />
                : 
                <DesktopLayout children={children} />
                }
        </>
    )
}

const DesktopLayout = ({children}) => {
    return (
        <>
            <div className='flex flex-row w-full'>
                <div className="w-[260px] pr-[260px]">
                    <Navbar />
                </div>
                <div className="w-full min-h-screen px-[30px] overflow-hidden pb-[20px]">
                    <Header />
                    {children}
                </div>
            </div>
        </>
    )
}

const MobileLayout = ({children}) => {
    return (
        <>
            <div
                className="w-full min-h-screen"
            >
                <Header />
                <div
                    className="w-full h-full bg-grayBackground px-[16px] py-[20px]"
                >
                    {children}
                </div>
            </div>
        </>
    )
}
