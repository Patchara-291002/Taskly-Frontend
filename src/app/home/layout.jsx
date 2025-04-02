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
                <MobileLayout>
                    {children}
                </MobileLayout> 
                : 
                <DesktopLayout>
                    {children}
                </DesktopLayout>
                }
        </>
    )
}

const DesktopLayout = () => {
    return (
        <>
            <div className='flex flex-row w-full'>
                <div className="w-[260px]">
                    <Navbar />
                </div>
                <div className="w-full px-[30px] overflow-hidden pb-[20px]">
                    <Header />
                </div>
            </div>
        </>
    )
}

const MobileLayout = () => {
    return (
        <>
            <div
                className="w-full min-h-screen"
            >
                <Header />
                <div
                    className="w-full h-full bg-grayBackground px-[16px] py-[20px]"
                >
                    
                </div>
            </div>
        </>
    )
}
