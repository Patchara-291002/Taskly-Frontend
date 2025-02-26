import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ task }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task._id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: 4,
    padding: 6,
    cursor: "grab"
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {task.taskName}
    </div>
  );
}
