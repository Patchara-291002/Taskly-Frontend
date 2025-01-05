import Navbar from "./component/Navbar"
import Header from "./component/Header"

export default function RootLayout({ children }) {
    return (
        <div className='flex flex-row w-full'>
            <div className="w-[260px]">
                <Navbar />
            </div>
            <div className="w-full px-[30px] overflow-hidden pb-[20px]">
                <Header />
                {children}
            </div>
        </div>
    )
}
