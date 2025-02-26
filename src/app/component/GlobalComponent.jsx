import { useState, useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import en from "air-datepicker/locale/en";
import axios from "axios";
import Link from "next/link";

export const TimePicker = ({ time = "00:00", onChange }) => {
    const [hour, setHour] = useState(time.split(":")[0]);
    const [minute, setMinute] = useState(time.split(":")[1]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    const hourButtonRef = useRef(null);
    const minuteButtonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (time) {
            setHour(time.split(":")[0]);
            setMinute(time.split(":")[1]);
        }
    }, [time]);

    // อัปเดตตำแหน่ง dropdown
    const toggleDropdown = (type) => {
        setActiveDropdown(type);
        let ref = type === "hour" ? hourButtonRef : minuteButtonRef;

        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setPosition({
                top: rect.top + rect.height + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
    };

    // ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                hourButtonRef.current && !hourButtonRef.current.contains(event.target) &&
                minuteButtonRef.current && !minuteButtonRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        const handleResizeOrScroll = () => {
            setActiveDropdown(null);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("resize", handleResizeOrScroll);
        window.addEventListener("scroll", handleResizeOrScroll);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("resize", handleResizeOrScroll);
            window.removeEventListener("scroll", handleResizeOrScroll);
        };
    }, []);

    // ฟังก์ชันอัปเดตเวลาและส่งกลับ
    const updateTime = (newHour, newMinute) => {
        setHour(newHour);
        setMinute(newMinute);
        onChange(`${newHour}:${newMinute}`);
    };

    return (
        <div className="flex items-center gap-2">
            {/* เลือกชั่วโมง */}
            <div className="relative">
                <button
                    ref={hourButtonRef}
                    className="bg-gray-100 w-[50px] text-center focus:outline-none border border-gray-300 cursor-pointer"
                    onClick={() => toggleDropdown("hour")}
                >
                    {hour}
                </button>

                {activeDropdown === "hour" && (
                    <ul
                        ref={dropdownRef}
                        className="fixed bg-white border border-gray-300 rounded-lg shadow-md w-16 p-2 z-[1000] max-h-[200px] overflow-y-auto overflow-x-hidden"
                        style={{ top: position.top, left: position.left }}
                    >
                        {hours.map((h) => (
                            <li
                                key={h}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
                                onClick={() => {
                                    updateTime(h, minute);
                                    setActiveDropdown(null);
                                }}
                            >
                                {h}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <p>:</p>

            {/* เลือกนาที */}
            <div className="relative">
                <button
                    ref={minuteButtonRef}
                    className="bg-gray-100 w-[50px] text-center focus:outline-none border border-gray-300 cursor-pointer"
                    onClick={() => toggleDropdown("minute")}
                >
                    {minute}
                </button>

                {activeDropdown === "minute" && (
                    <ul
                        ref={dropdownRef}
                        className="fixed bg-white border border-gray-300 rounded-lg shadow-md w-16 p-2 z-[1000] max-h-[200px] overflow-y-auto overflow-x-hidden"
                        style={{ top: position.top, left: position.left }}
                    >
                        {minutes.map((m) => (
                            <li
                                key={m}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
                                onClick={() => {
                                    updateTime(hour, m);
                                    setActiveDropdown(null);
                                }}
                            >
                                {m}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export const DayPicker = ({ selectedDay, onChange }) => {
    const [openDay, setOpenDay] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // ฟังก์ชันเปิด dropdown และคำนวณตำแหน่ง
    const toggleDropdown = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top + rect.height + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
        setOpenDay(!openDay);
    };

    // ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setOpenDay(false);
            }
        };

        const handleResizeOrScroll = () => {
            setOpenDay(false);
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("resize", handleResizeOrScroll);
        window.addEventListener("scroll", handleResizeOrScroll);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("resize", handleResizeOrScroll);
            window.removeEventListener("scroll", handleResizeOrScroll);
        };
    }, []);

    return (
        <>
            {/* ปุ่มกดเพื่อเปิด dropdown */}
            <button
                ref={buttonRef}
                className="bg-white border-[1px] border-grayBorder px-[6px] min-h-0 h-[25px] cursor-pointer"
                onClick={toggleDropdown}
            >
                {selectedDay}
            </button>

            {/* Dropdown แสดงรายการวัน */}
            {openDay && (
                <ul
                    ref={dropdownRef}
                    className="fixed bg-white border border-gray-300 rounded-lg shadow-md w-52 p-2 z-[1000]"
                    style={{
                        top: position.top,
                        left: position.left,
                    }}
                >
                    {days.map((d) => (
                        <li
                            key={d}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onChange(d);
                                setOpenDay(false);
                            }}
                        >
                            {d}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export const StdStatusPicker = ({ selectedStatus, onChange }) => {
    const [openStatus, setOpenStatus] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const statusOptions = [
        { name: "Todo", color: "#5F5F5F" },
        { name: "Doing", color: "#1F86FF" },
        { name: "Done", color: "#18A900" },
    ];

    // ฟังก์ชันเปิด dropdown และคำนวณตำแหน่ง
    const toggleDropdown = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top + rect.height + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
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
                style={{ color: statusOptions.find(s => s.name === selectedStatus)?.color || "black" }}
            >
                {selectedStatus}
            </button>

            {/* Dropdown แสดงรายการ Status */}
            {openStatus && (
                <ul
                    ref={dropdownRef}
                    className="fixed bg-white border border-gray-300 rounded-lg shadow-md w-40 p-2 z-[1000]"
                    style={{
                        top: position.top,
                        left: position.left,
                    }}
                >
                    {statusOptions.map((s) => (
                        <li
                            key={s.name}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                            onClick={() => {
                                onChange(s.name);
                                setOpenStatus(false);
                            }}
                        >
                            <span className="w-3 h-3 rounded-full" style={{ background: s.color }}></span>
                            {s.name}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export const PrjRolePicker = ({ selectedRole, roleOptions, onChange }) => {
    const [openRole, setOpenRole] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    // ✅ เปิด dropdown และคำนวณตำแหน่ง
    const toggleDropdown = () => {
        if (!openRole && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
        setOpenRole(!openRole);
    };

    // ✅ ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setOpenRole(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block">
            {/* ปุ่มกดเพื่อเปิด dropdown */}
            <button
                ref={buttonRef}
                className="relative bg-white border-[1px] border-grayBorder px-[10px] py-[6px] min-h-0 rounded-md cursor-pointer flex items-center gap-2"
                onClick={toggleDropdown}
            >
                {selectedRole ? (
                    <>
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ background: selectedRole.color }}
                        ></span>
                        {selectedRole.name}
                    </>
                ) : (
                    "Select Role"
                )}
            </button>

            {/* Dropdown แสดงรายการ Role */}
            {openRole && (
                <ul
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-md w-40 p-2 z-50"
                // style={{
                //     top: position.top,
                //     left: position.left,
                // }}
                >
                    {roleOptions.map((role) => (
                        <li
                            key={role.name}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                            onClick={() => {
                                onChange(role.roleId);
                                setOpenRole(false);
                            }}
                        >
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ background: role.color }}
                            ></span>
                            {role.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export const PrjPriorityPicker = ({ selectedPriority, onChange }) => {
    const [openPriority, setOpenPriority] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const priorityOptions = [
        {
            value: 1,
            lable: "Normal"
        },
        {
            value: 2,
            lable: "Medium"
        },
        {
            value: 3,
            lable: "High"
        },
    ]



    // ✅ เปิด dropdown และคำนวณตำแหน่ง
    const toggleDropdown = () => {
        // if (!openPriority && buttonRef.current) {
        //     const rect = buttonRef.current.getBoundingClientRect();
        //     console.log(rect)
        //     setPosition({
        //         top: rect.bottom + window.scrollY,
        //         left: rect.left + window.scrollX,
        //     });
        // }
        setOpenPriority(!openPriority);
    };

    // ✅ ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setOpenPriority(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block">
            {/* ปุ่มกดเพื่อเปิด dropdown */}
            <button
                ref={buttonRef}
                className="relative bg-white border-[1px] border-grayBorder px-[10px] py-[6px] min-h-0 rounded-md cursor-pointer flex items-center gap-2"
                onClick={toggleDropdown}
            >
                {(() => {
                    switch (selectedPriority) {
                        case 1: return "Normal";
                        case 2: return "Medium";
                        case 3: return "High";
                        default: return "Normal";
                    }
                })()}
            </button>

            {/* Dropdown แสดงรายการ Role */}
            {openPriority && (
                <ul
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-md w-40 p-2 z-50"
                // style={{
                //     top: position.top,
                //     left: position.left,
                // }}
                >
                    {priorityOptions.map((p, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                            onClick={() => {
                                onChange(p.value);
                                setOpenPriority(false);
                            }}
                        >
                            {p.lable}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export const AirDatepickerComponent = ({ selectedDate, onChange }) => {
    const datepickerRef = useRef(null);
    const [formattedDate, setFormattedDate] = useState("");

    // ✅ ตั้งค่าแสดงวันที่เมื่อ `selectedDate` เปลี่ยน
    useEffect(() => {
        if (selectedDate) {
            const dateObj = new Date(selectedDate);
            const options = { day: "2-digit", month: "long", year: "numeric" };
            setFormattedDate(dateObj.toLocaleDateString("en-GB", options));
        } else {
            setFormattedDate("");
        }
    }, [selectedDate]);

    useEffect(() => {
        if (!datepickerRef.current) return;

        const picker = new AirDatepicker(datepickerRef.current, {
            locale: en, // ✅ ใช้ภาษาอังกฤษเสมอ
            selectedDates: selectedDate ? [new Date(selectedDate)] : [],
            autoClose: true,
            dateFormat: "dd MMMM yyyy", // แสดงผลเป็น 15 March 2025
            onSelect({ date }) {
                if (!date) return;

                const isoDate = date.toISOString(); // ✅ แปลงเป็น ISO format
                setFormattedDate(date.toLocaleDateString("en-GB", {
                    day: "2-digit", month: "long", year: "numeric"
                }));
                onChange(isoDate); // ✅ ส่งค่าไปอัปเดต
            }
        });

        return () => picker.destroy(); // ✅ ทำลาย instance เมื่อ component ถูก unmount
    }, [selectedDate]); // ✅ ให้ Datepicker อัปเดตทุกครั้งที่ selectedDate เปลี่ยน

    return (
        <input
            ref={datepickerRef}
            type="text"
            className="max-w-[150px] bg-white focus:outline-none border-[1px] border-grayBorder px-[10px] py-[6px] rounded-md cursor-pointer"
            readOnly
            value={formattedDate}
        />
    );
};

