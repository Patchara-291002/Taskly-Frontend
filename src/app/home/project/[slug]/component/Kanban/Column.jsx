import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskItem from "./TaskItem";

export default function Column({ column, tasks }) {
  const { setNodeRef, transform, transition, isDragging, attributes, listeners } = useSortable({
    id: column._id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    width: 200,
    background: "#fafafa",
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: 8
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* ใส่ {...attributes} {...listeners} เฉพาะตรง Header ถ้าต้องการลากเฉพาะชื่อ */}
      <div
        style={{ fontWeight: "bold", marginBottom: 6, cursor: "grab" }}
        {...attributes}
        {...listeners}
      >
        {column.statusName}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {tasks.map((t) => (
          <TaskItem key={t._id} task={t} />
        ))}
      </div>
    </div>
  );
}
