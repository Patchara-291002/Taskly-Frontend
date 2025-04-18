"use client";

import { MoreIcon } from "@/app/home/component/icon/DashboardIcon";
import { useState, useEffect } from "react";
import { updateCourseById } from "@/api/course";
import { EditIcon } from "@/app/home/component/icon/GlobalIcon";

export default function CourseHeader({ course, getCourseById }) {
  const [selectedName, setSelectedName] = useState(course?.courseName);
  const courseId = course?._id;

  // ใช้ useEffect เพื่อ debounce การอัปเดตชื่อโปรเจกต์ 1 วินาที
  useEffect(() => {
    const timer = setTimeout(() => {
      if (courseId) {
        updateCourseById(courseId, { courseName: selectedName })
          .then(() => {
            console.log("Name updated to:", selectedName);
            getCourseById();
          })
          .catch((error) => console.error("Error updating name:", error));
      }
    }, 1000); // delay 1 วินาที

    return () => clearTimeout(timer);
  }, [selectedName, courseId, updateCourseById]);

  return (
    <div className="w-full overflow-hidden flex justify-between items-center pb-[40px]">
      <div
        className="flex items-center gap-[5px]"
      >
        <EditIcon w={14} h={14} color={"#FF6200"} />
        <input
          type="text"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          className="font-semibold text-[24px] text-primaryOrange bg-[#F7F7F7] focus:outline-none"
        />
      </div>
    </div>
  );
}
