import { useSortable } from "@dnd-kit/sortable";
import React, { memo, type FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import ReportCard from "./ReportCard";
import type { DraggableCardProps } from "../../../types/types";

const DraggableCard: FC<DraggableCardProps> = ({
  id,
  title,
  content,
  isDraft,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id });

  const isDragging = active?.id === id;

  return (
    <Box
      component={"article"}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition ?? undefined,
        touchAction: "manipulation",
        zIndex: isDragging ? 1000 : "auto",
        cursor: isDragging ? "grabbing" : "grab",
        boxShadow: isDragging ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
        opacity: isDragging ? 0.95 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <ReportCard id={id} title={title} content={content} isDraft={isDraft} />
    </Box>
  );
};

export default memo(DraggableCard);
