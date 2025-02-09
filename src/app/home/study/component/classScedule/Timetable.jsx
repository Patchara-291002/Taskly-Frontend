import React from "react";

// ตัวอย่างข้อมูล
const scheduleData = [
  { title: "Math", day: "Monday", startTime: "09:10", endTime: "11:30", color: "bg-green-500" },
  { title: "Math", day: "Monday", startTime: "11:30", endTime: "12:30", color: "bg-green-500" },
  { title: "Science", day: "Tuesday", startTime: "10:30", endTime: "11:30", color: "bg-blue-500" },
  { title: "Art", day: "Wednesday", startTime: "09:00", endTime: "12:00", color: "bg-yellow-500" },
  { title: "History", day: "Thursday", startTime: "13:15", endTime: "14:20", color: "bg-red-500" },
  { title: "Music", day: "Friday", startTime: "14:00", endTime: "15:00", color: "bg-purple-500" },
  { title: "Extra", day: "Sunday", startTime: "15:00", endTime: "19:00", color: "bg-pink-500" },
];

// 1) ฟังก์ชันแปลง HH:MM => จำนวนนาที
function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":");
  return parseInt(h, 10) * 60 + parseInt(m, 10);
}

// 2) หา minHour, maxHour (เป็นชั่วโมงเต็ม) จากข้อมูล
function getMinMaxHour(schedule) {
  let minVal = Infinity;
  let maxVal = -Infinity;
  schedule.forEach((ev) => {
    const s = timeToMinutes(ev.startTime);
    const e = timeToMinutes(ev.endTime);
    if (s < minVal) minVal = s;
    if (e > maxVal) maxVal = e;
  });
  const minHour = Math.floor(minVal / 60);
  const maxHour = Math.ceil(maxVal / 60);
  return { minHour, maxHour };
}

// 3) สร้าง slot ครึ่งชั่วโมง
function generateHalfHourSlots(minHour, maxHour) {
  const slots = [];
  for (let hour = minHour; hour < maxHour; hour++) {
    // เช่น hour=7 => 7:00, 7:30
    slots.push(`${hour}:00`);
    // slots.push(`${hour}:30`);
  }
  return slots;
}

// 4) แปลง "HH:MM" => index ใน halfHourSlots
// เช่นถ้า minHour=7 => slot[0]="7:00", slot[1]="7:30", slot[2]="8:00", ...
function timeToSlotIndex(timeStr, minHour) {
  const totalMins = timeToMinutes(timeStr);
  const base = minHour * 60; // นาทีของ minHour
  const diff = totalMins - base; // ห่างจาก minHour กี่นาที
  // แต่ละ slot = 30 นาที => index = diff / 30 (ปัดลง)
  return Math.floor(diff / 30);
}

// 5) คำนวณจำนวน slot ที่คาบกิน (startIndex..endIndex)
function getEventSpan(startTime, endTime, minHour) {
  const startIdx = timeToSlotIndex(startTime, minHour);
  const endIdx = timeToSlotIndex(endTime, minHour);
  // ถ้า endTime อยู่ตรงเป๊ะ เช่น 9:30 => endIdx คือ slotIndex เดียวกับ 9:30
  // แต่เราอยากให้ colSpan รวมช่อง 9:00-9:30 => colSpan = (endIdx - startIdx)
  // ถ้าอยากให้กินเต็มช่องปลาย ถ้า endTime=9:30 => endIdx= (startIdx+1)
  // อันนี้แล้วแต่ดีไซน์
  return { startIdx, span: endIdx - startIdx };
}

export default function TimetableTable() {
  // สร้างชุดวัน (default = Monday-Friday) ถ้ามี Saturday/Sunday ก็เพิ่ม
  const baseDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hasSaturday = scheduleData.some((ev) => ev.day === "Saturday");
  const hasSunday = scheduleData.some((ev) => ev.day === "Sunday");

  let days = [...baseDays];
  if (hasSaturday) days.push("Saturday");
  if (hasSunday) days.push("Saturday", "Sunday");

  // หาเวลาต่ำสุด-สูงสุด แล้วสร้าง halfHourSlots
  const { minHour, maxHour } = getMinMaxHour(scheduleData);
  const halfHourSlots = generateHalfHourSlots(minHour, maxHour);

  const borderTopZero = "border border-t-0"
  const borderDays = "border border-l-0 border-b-0"

  return (
    <div className="container mx-auto bg-white overflow-hidden rounded-[15px] border-[#D6D6D6] border-[1px]">
      <div
        className="m-[20px] overflow-hidden overflow-x-auto"
      >
        <table className="table-auto">
          <thead>
            <tr className="text-[12px] font-normal h-[80px]">
              {/* หัวมุมซ้าย */}
              <th className={`${borderTopZero} font-normal border-l-0`}>Day \ Time</th>
              {/* หัวตาราง: แต่ละ halfHourSlot */}
              {halfHourSlots.map((slot, i) => (
                <th key={i} className={`${borderTopZero} font-normal min-w-[120px]`}>
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              // กรองเอา event เฉพาะของ day นี้ และ sort ตาม startTime
              const dayEvents = scheduleData
                .filter((ev) => ev.day === day)
                .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

              return (
                <tr key={day}>
                  {/* คอลัมน์แรก แสดงชื่อวัน */}
                  <td className={`${borderDays} text-center text-[12px] w-[130px] h-[60px]`}>{day}</td>

                  {/* สร้างเซลล์สำหรับ halfHourSlots (แบบไล่ index) + colSpan */}
                  {(() => {
                    // we'll produce an array of <td> for each half-hour
                    // using a while loop to handle colSpan easily
                    const cells = [];
                    let i = 0; // index ของ slot
                    while (i < halfHourSlots.length) {
                      // เช็คว่ามี event ที่เริ่มตอน i ไหม
                      // ตัวอย่าง: ถ้า event.startIdx == i => สร้าง <td colSpan=event.span>
                      //            แล้วข้าม i += event.span
                      const ev = dayEvents.find((e) => {
                        const { startIdx } = getEventSpan(e.startTime, e.endTime, minHour);
                        return startIdx === i; // มี event ที่เริ่ม slotIndex = i
                      });

                      if (ev) {
                        // มี event ที่เริ่มตรงช่องนี้
                        const { startIdx, span } = getEventSpan(ev.startTime, ev.endTime, minHour);
                        const colorClass = ev.color || "bg-gray-400";

                        // สร้าง cell ที่กิน colSpan = span
                        cells.push(
                          <td
                            key={`ev-${i}`}
                            className={`border p-2 text-white text-center ${colorClass}`}
                            colSpan={span}
                          >
                            {ev.title}
                          </td>
                        );
                        i += span; // ข้าม span ช่อง
                      } else {
                        // ไม่มี event เริ่มที่ช่องนี้ => cell ว่าง
                        cells.push(
                          <td
                            key={`empty-${i}`}
                            className="border p-2 text-center"
                          >

                          </td>
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
