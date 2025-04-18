import { useState, useRef, useEffect } from 'react'

export default function PrjStatusPicker({ statusOptions, selectedStatus, onChange, loadProject }) {
    const [openStatus, setOpenStatus] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);



    // ฟังก์ชันเปิด dropdown และคำนวณตำแหน่ง
    const toggleDropdown = () => {
        loadProject();
        setOpenStatus(!openStatus);
    };

    // ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setOpenStatus(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <>
            {/* ปุ่มกดเพื่อเปิด dropdown */}
            <button
                ref={buttonRef}
                className="font-semibold text-white bg-white px-[10px] py-[6px] min-h-0 rounded-md cursor-pointer"
                onClick={toggleDropdown}
                style={{ background: selectedStatus.color || "#F7F7F7" }}
            >
                {selectedStatus ? selectedStatus.statusName : "Select Status"}
            </button>

            {/* Dropdown แสดงรายการ Status */}
            {openStatus && (
                <ul
                    ref={dropdownRef}
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-md w-40 p-2 z-[1000]"
                >
                    {statusOptions.map((s) => (
                        <li
                            key={s._id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                            onClick={() => {
                                onChange(s._id);
                                setOpenStatus(false);
                            }}
                        >
                            <div
                                className='w-full flex justify-between items-center'
                            >
                                <p
                                    className='text-[12px] font-medium'
                                >
                                    {s.statusName}
                                </p>
                                <span className="w-[7px] h-[7px] rounded-full" style={{ background: s.color }}></span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
