import React from "react";


function timeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== "string") {
      return 0;
  }
  const [h, m] = timeStr.split(":");
  return parseInt(h, 10) * 60 + parseInt(m, 10);
}


// หา minHour, maxHour (default 9-17)
function getMinMaxHour(schedule) {
  let minHour = 9;
  let maxHour = 17;
  if (schedule.length > 0) {
    let minVal = Infinity;
    let maxVal = -Infinity;
    schedule.forEach((ev) => {
      const s = timeToMinutes(ev.startTime);
      const e = timeToMinutes(ev.endTime);
      if (s < minVal) minVal = s;
      if (e > maxVal) maxVal = e;
    });
    minHour = Math.min(minHour, Math.floor(minVal / 60));
    maxHour = Math.max(maxHour, Math.ceil(maxVal / 60));
  }
  return { minHour, maxHour };
}

// สร้างช่วงเวลา "9:00-10:00", "10:00-11:00" ...
function generateTimeRanges(minHour, maxHour) {
  const slots = [];
  for (let hour = minHour; hour < maxHour; hour++) {
    slots.push(`${hour}:00 - ${hour + 1}:00`);
  }
  return slots;
}

// คำนวณ colSpan
function getEventSpan(startTime, endTime, minHour) {
  const startIdx = Math.floor(timeToMinutes(startTime) / 60) - minHour;
  const endIdx = Math.ceil(timeToMinutes(endTime) / 60) - minHour;
  return { startIdx, span: endIdx - startIdx };
}

// แปลง courseData -> scheduleData
function transformCourseData(courseDataArray) {
  return courseDataArray.map((course) => ({
    title: course.courseName,
    day: course.day,
    startTime: course.startTime,
    endTime: course.endTime,
    color: course.courseColor, // ใช้ HEX Code ตรงๆ
  }));
}

export default function TimetableTable({ coursesData }) {
  // แปลงข้อมูล
  const scheduleData = transformCourseData(coursesData);

  // กำหนดวันในตาราง
  const baseDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hasSaturday = scheduleData.some((ev) => ev.day === "Saturday");
  const hasSunday = scheduleData.some((ev) => ev.day === "Sunday");
  let days = [...baseDays];
  if (hasSaturday) days.push("Saturday");
  if (hasSunday) days.push("Sunday");

  // คำนวณช่วงเวลา
  const { minHour, maxHour } = getMinMaxHour(scheduleData);
  const timeRanges = generateTimeRanges(minHour, maxHour);

  return (
    <div className="bg-white overflow-hidden rounded-[15px] border-[#D6D6D6] border-[1px]">
      <div className="m-[20px] overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-[12px] font-normal h-[80px]">
              <th className="border border-t-0 font-normal border-l-0 min-w-[80px]"></th>
              {timeRanges.map((range, i) => (
                <th key={i} className="border border-r-0 border-t-0 font-normal min-w-[80px]">
                  {range}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const dayEvents = scheduleData
                .filter((ev) => ev.day === day)
                .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

              return (
                <tr key={day}>
                  <td className="border border-l-0 border-b-0 text-center font-normal text-[12px] h-[70px]">
                    {day}
                  </td>
                  {(() => {
                    const cells = [];
                    let i = 0;
                    while (i < timeRanges.length) {
                      const ev = dayEvents.find((e) => {
                        const { startIdx } = getEventSpan(e.startTime, e.endTime, minHour);
                        return startIdx === i;
                      });
                      if (ev) {
                        const { span } = getEventSpan(ev.startTime, ev.endTime, minHour);
                        cells.push(
                          <td
                            key={`ev-${i}`}
                            colSpan={span}
                            className="p-2 text-white text-center"
                            style={{ backgroundColor: ev.color }}
                          >
                            {ev.title}
                          </td>
                        );
                        i += span;
                      } else {
                        cells.push(
                          <td key={`empty-${i}`} className="border border-b-0 border-r-0 p-2 text-center"></td>
                        );
                        i++;
                      }
                    }
                    return cells;
                  })()}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
