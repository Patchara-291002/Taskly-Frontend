import React, { useMemo } from "react";

function timeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return 0;
  const [h, m] = timeStr.split(":");
  return parseInt(h, 10) * 60 + parseInt(m, 10);
}

function getMinMaxHour(schedule) {
  if (!schedule.length) return { minHour: 9, maxHour: 17 };

  const hours = schedule.flatMap(ev => [
    Math.floor(timeToMinutes(ev.startTime) / 60),
    Math.ceil(timeToMinutes(ev.endTime) / 60)
  ]);

  return {
    minHour: Math.min(9, Math.min(...hours)),
    maxHour: Math.max(17, Math.max(...hours))
  };
}

function generateTimeRanges(minHour, maxHour) {
  return Array.from(
    { length: maxHour - minHour },
    (_, i) => `${minHour + i}:00 - ${minHour + i + 1}:00`
  );
}

function getEventSpan(startTime, endTime, minHour) {
  const startIdx = Math.floor(timeToMinutes(startTime) / 60) - minHour;
  const endIdx = Math.ceil(timeToMinutes(endTime) / 60) - minHour;
  return { startIdx, span: endIdx - startIdx };
}

function transformCourseData(courseDataArray) {
  if (!Array.isArray(courseDataArray)) return [];

  return courseDataArray
    .filter(course => course.startTime && course.endTime && course.day)
    .map(course => ({
      id: course._id,
      title: course.courseName,
      day: course.day,
      startTime: course.startTime,
      endTime: course.endTime,
      color: course.courseColor || '#D6D6D6'
    }));
}

const TimeSlot = React.memo(({ event, span }) => {
  if (!event) {
    return <td className="border border-b-0 border-r-0 p-2 text-center" />;
  }

  return (
    <td
      colSpan={span}
      className="p-2 font-semibold text-white text-center text-[12px]"
      style={{ backgroundColor: event.color }}
    >
      {event.title}
    </td>
  );
});

export default function TimetableTable({ coursesData }) {
  // Early return if no data
  if (!coursesData?.length) {
    return (
      <div>
        <p className="font-medium text-[16px] pb-[15px]" >Time table</p>
        <div className="w-full h-[400px] flex justify-center items-center bg-white p-[20px] rounded-[15px] border-[#D6D6D6] border-[1px] text-center font-medium text-[16px] text-[#D4D4D4]">
          No schedule right now. Create course to add your schedule.
        </div>
      </div>
    );
  }

  const { scheduleData, days, timeRanges, eventsByDay } = useMemo(() => {
    const scheduleData = transformCourseData(coursesData);
    const baseDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const days = [
      ...baseDays,
      ...(scheduleData.some(ev => ev.day === "Saturday") ? ["Saturday"] : []),
      ...(scheduleData.some(ev => ev.day === "Sunday") ? ["Sunday"] : [])
    ];

    const { minHour, maxHour } = getMinMaxHour(scheduleData);
    const timeRanges = generateTimeRanges(minHour, maxHour);

    // Pre-calculate event spans and organize by day
    const eventsByDay = days.reduce((acc, day) => {
      const dayEvents = scheduleData
        .filter(ev => ev.day === day)
        .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
        .map(ev => ({
          ...ev,
          ...getEventSpan(ev.startTime, ev.endTime, minHour)
        }));
      acc[day] = dayEvents;
      return acc;
    }, {});

    return { scheduleData, days, timeRanges, eventsByDay };
  }, [coursesData]);

  const renderDayRow = (day) => {
    const events = eventsByDay[day];
    const cells = [];
    let timeSlotIndex = 0;
    const maxSlots = timeRanges.length;

    while (timeSlotIndex < maxSlots) {
      const event = events.find(e => e.startIdx === timeSlotIndex);
      if (event) {
        cells.push(
          <TimeSlot
            key={`${day}-${timeSlotIndex}-${event.id}`}
            event={event}
            span={event.span}
          />
        );
        timeSlotIndex += event.span;
      } else {
        cells.push(
          <TimeSlot
            key={`${day}-${timeSlotIndex}-empty`}
          />
        );
        timeSlotIndex++;
      }
    }
    return cells;
  };

  return (
    <div>
      <p className="font-medium text-[16px] pb-[15px]" >Time table</p>
      <div className="bg-white overflow-hidden rounded-[15px] border-[#D6D6D6] border-[1px]">
        <div className="m-[20px] overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-[12px] font-normal h-[80px]">
                <th className="border border-t-0 font-normal border-l-0 min-w-[80px]" />
                {timeRanges.map((range, i) => (
                  <th
                    key={i}
                    className="border border-r-0 border-t-0 font-normal min-w-[80px]"
                  >
                    {range}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td className="border border-l-0 border-b-0 text-center font-normal text-[12px] h-[70px]">
                    {day}
                  </td>
                  {renderDayRow(day)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}