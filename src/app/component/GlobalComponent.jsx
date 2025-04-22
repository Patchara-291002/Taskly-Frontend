import { useState, useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import en from "air-datepicker/locale/en";
import PriorityBar from "./GlobalComponent/PriorityBar";


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
                    className="bg-white rounded-[2px] px-[5px] text-center focus:outline-none border border-grayBorder cursor-pointer"
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
                    className="bg-white rounded-[2px] px-[5px] text-center focus:outline-none border border-grayBorder cursor-pointer"
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
                className="bg-white border border-grayBorder rounded-[5px] px-[20px] min-h-0 h-[25px] cursor-pointer text-[14px]"
                onClick={toggleDropdown}
            >
                {selectedDay || "Select day"}
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
        { name: "Not started", color: "#5F5F5F" },
        { name: "In progress", color: "#1F86FF" },
        { name: "Completed", color: "#18A900" },
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
            <button
                ref={buttonRef}
                className="relative flex gap-[5px] items-center text-white font-semibold  bg-white px-[10px] py-[4px] min-h-0 rounded-full cursor-pointer"
                onClick={toggleDropdown}
                style={{ background: statusOptions.find(s => s.name === selectedStatus)?.color || "black" }}
            >
                <div className="w-[7px] h-[7px] bg-white rounded-full" />
                {selectedStatus}
            </button>

            {openStatus && (
                <ul
                    ref={dropdownRef}
                    className="absolute bg-white border border-gray-300 rounded-lg shadow-md w-40 p-2 z-[1000] mt-1"
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

export const PrjRolePicker = ({ selectedRole, roleOptions, onChange, loadProject }) => {
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
        loadProject()
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
        <>
            <button
                ref={buttonRef}
                className="font-medium text-[12px] text-white bg-white px-[20px] py-[6px] min-h-0 rounded-full cursor-pointer"
                style={{ background: selectedRole ? selectedRole.color : "#CACACA" }}
                onClick={toggleDropdown}
            >
                {selectedRole ? (
                    <>
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
        </>
    );
};

export const PrjPriorityPicker = ({ selectedPriority, onChange }) => {
    const [openPriority, setOpenPriority] = useState(false);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const priorityOptions = [
        {
            value: 1,
            label: "Normal",
            bgColor: "#F7F7F7",
            textColor: "#5F5F5F"
        },
        {
            value: 2,
            label: "Medium",
            bgColor: "#FFF7E5",
            textColor: "#FF9900"
        },
        {
            value: 3,
            label: "High",
            bgColor: "#FFE5E5",
            textColor: "#FF0000"
        }
    ];

    const getPriorityStyle = (value) => {
        const option = priorityOptions.find(p => p.value === value);
        return {
            backgroundColor: option?.bgColor || "#F7F7F7",
            color: option?.textColor || "#5F5F5F"
        };
    };

    const toggleDropdown = () => {
        setOpenPriority(!openPriority);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setOpenPriority(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <>
            <button
                ref={buttonRef}
                className="font-medium text-[12px] text-[#5F5F5F] bg-[#F1F1F1] px-[20px] py-[6px] min-h-0 rounded-full cursor-pointer"
                onClick={toggleDropdown}
            >
                {priorityOptions.find(p => p.value === selectedPriority)?.label || "Normal"}
            </button>

            {openPriority && (
                <ul
                    ref={dropdownRef}
                    className="absolute bg-white border border-graBorder rounded-lg shadow-md w-40 p-2 z-50"
                >
                    {priorityOptions.map((priority) => (
                        <li
                            key={priority.value}
                            className="font-medium text-black px-4 py-2 cursor-pointer rounded-md hover:bg-[#F2F2F2]"
                            // style={getPriorityStyle(priority.value)}
                            onClick={() => {
                                onChange(priority.value);
                                setOpenPriority(false);
                            }}
                        >
                            <div
                                className="flex justify-between items-center gap-2"
                            >
                                {priority.label}
                                <PriorityBar priority={priority.value} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
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
            position: "bottom right",
            onSelect({ date }) {
                if (!date) return;s

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
            className="max-w-[120px] text-[12px] text-[#5F5F5F] bg-white focus:outline-none border-[1px] border-grayBorder px-[10px] py-[6px] rounded-md cursor-pointer"
            readOnly
            value={formattedDate}
        />
    );
};

