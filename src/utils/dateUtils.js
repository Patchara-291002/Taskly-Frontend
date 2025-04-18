export const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
};

export const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
};

export const formatToDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

export function extractFormattedDate(datetimeStr) {
    const date = new Date(datetimeStr);
    const day = date.getUTCDate(); // ดึงวันที่ (UTC)
    // กำหนดชื่อเดือนในรูปแบบเต็ม
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${monthName} ${year}`;
}

export function extractTimeRange(datetimeStr) {
    // สร้าง Date object จาก string
    const date = new Date(datetimeStr);

    // ดึงชั่วโมงและนาทีในรูปแบบ UTC (เพราะ input อยู่ในรูปแบบ Zulu/UTC)
    const startHour = date.getUTCHours();
    const startMinutes = date.getUTCMinutes();

    // ฟอร์แมตเวลาเริ่มต้นให้เป็น "HH:MM"
    const formattedStart = `${String(startHour).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')}`;

    // สร้าง Date object ใหม่เพื่อคำนวณเวลาสิ้นสุดโดยเพิ่ม 1 ชั่วโมง
    const endDate = new Date(date.getTime());
    endDate.setUTCHours(endDate.getUTCHours() + 1);
    const endHour = endDate.getUTCHours();
    const endMinutes = endDate.getUTCMinutes();

    // ฟอร์แมตเวลาสิ้นสุดให้เป็น "HH:MM"
    const formattedEnd = `${String(endHour).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;

    // คืนค่าเป็นช่วงเวลาในรูปแบบ "HH:MM HH:MM"
    return `${formattedStart} ${formattedEnd}`;
}