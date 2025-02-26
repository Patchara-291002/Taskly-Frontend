import { useState, useRef, useEffect } from 'react'

export default function PrjStatusPicker({ statusOptions, selectedStatus, onChange }) {
    const [openStatus, setOpenStatus] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);



    // ฟังก์ชันเปิด dropdown และคำนวณตำแหน่ง
    const toggleDropdown = () => {
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
                className="bg-white border-[1px] border-grayBorder px-[10px] py-[6px] min-h-0 rounded-md cursor-pointer"
                onClick={toggleDropdown}
                // style={{ color: selectedStatus.color || "black" }}
            >
                {selectedStatus ? selectedStatus.statusName : "Select Status"}
            </button>

            {/* Dropdown แสดงรายการ Status */}
            {openStatus && (
                <ul
                    ref={dropdownRef}
                    className="fixed bg-white border border-gray-300 rounded-lg shadow-md w-40 p-2 z-[1000]"
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
                            <span className="w-3 h-3 rounded-full" style={{ background: s.color }}></span>
                            {s.statusName}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
