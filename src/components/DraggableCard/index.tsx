import { useSortable } from "@dnd-kit/sortable";
import React, { memo, type FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import ReportCard from "../ReportCard";

export type DraggableCardProps = {
  title: string;
  content: string;
  onSummarize: () => void;
  onEdit: (title: string, content: string, reportId: number) => void;
  id: number;
};

const DraggableCard: FC<DraggableCardProps> = ({
  id,
  title,
  content,
  onEdit,
  onSummarize,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id });

  const isDragging = active?.id === id;

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition ?? undefined,
        touchAction: "manipulation",
        zIndex: isDragging ? 1000 : "auto",
      }}
    >
      <ReportCard
        id={id}
        title={title}
        content={content}
        onEdit={onEdit}
        onSummarize={onSummarize}
        isDragging={isDragging}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </article>
  );
};

export default memo(DraggableCard);
