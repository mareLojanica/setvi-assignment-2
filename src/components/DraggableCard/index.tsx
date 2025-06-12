import { useSortable } from "@dnd-kit/sortable";
import React, { type FC, type ReactNode } from "react";
import { CSS } from "@dnd-kit/utilities";
export type DraggableCardProps = {
  children: ReactNode;
  id: number;
};
const DraggableCard: FC<DraggableCardProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  return (
    <article
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {children}
    </article>
  );
};
export default DraggableCard;
