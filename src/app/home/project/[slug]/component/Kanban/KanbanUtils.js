import { structuredClone } from "structured-clone"; // ถ้า Node <17 ให้ npm i structured-clone

// เช็คว่าเป็น column id หรือไม่ (เช่น length === 24)
export function isColumnId(id) {
  return id.length === 24; // หรือเช็ค logic ของ `_id` ของ status
}

// หา object column หรือ task
export function findColumnOrTask(itemId, columns, tasks) {
  const col = columns.find((c) => c._id === itemId);
  if (col) return col;
  const t = tasks.find((tk) => tk._id === itemId);
  return t || null;
}

// ย้าย task ใน local => เปลี่ยน statusId
export function moveTaskLocal(prevTasks, activeId, overId, columns) {
  const newTasks = structuredClone(prevTasks);

  // หา index ของ task ต้นทาง
  const sourceIndex = newTasks.findIndex((t) => t._id === activeId);
  if (sourceIndex < 0) return newTasks;

  const sourceTask = newTasks[sourceIndex];

  // overId => column หรือ task?
  const overIsCol = isColumnId(overId);

  let targetColId = "";

  if (overIsCol) {
    targetColId = overId;
  } else {
    const overTask = newTasks.find((t) => t._id === overId);
    if (!overTask) return newTasks;
    targetColId = overTask.statusId;
  }

  // update statusId ของ task
  if (sourceTask.statusId !== targetColId) {
    newTasks[sourceIndex].statusId = targetColId;
  }

  return newTasks;
}
