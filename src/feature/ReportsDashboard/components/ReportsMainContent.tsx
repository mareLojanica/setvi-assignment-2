import React, { useCallback } from "react";

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import Spinner from "../../../ui/components/Spinner";
import ResponsiveGrid from "../../../ui/components/ResponsiveGrid";
import { useReports } from "../../../context/ReportsContext";
import { useModal } from "../../../context/ModalContext";
import DraggableCard from "./DraggableCard";
import NoDataPlaceholder from "../../../ui/components/NoDataPlaceholder";

const ReportsMainContent = () => {
  const { openEditModal, openSummaryModal } = useModal();
  const { filteredReports, isLoading, reorderReports } = useReports();
  const onEdit = useCallback(
    (title: string, content: string, reportId: string) => {
      openEditModal({ modalTitle: "Edit Report", title, content, reportId });
    },
    [openEditModal]
  );

  const onSummarize = useCallback(
    (modalTitle: string) => {
      openSummaryModal({
        title: "",
        content: "",
        reportId: "",
        modalTitle,
      });
    },
    [openSummaryModal]
  );
  return (
    <DndContext
      onDragEnd={reorderReports}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={filteredReports.map((r) => r.id)}>
        {isLoading ? (
          <Spinner />
        ) : filteredReports.length ? (
          <ResponsiveGrid>
            {filteredReports.map(({ id, title, content }) => (
              <DraggableCard
                key={id}
                id={id}
                title={title}
                content={content}
                onSummarize={onSummarize}
                onEdit={onEdit}
              />
            ))}
          </ResponsiveGrid>
        ) : (
          <NoDataPlaceholder message={"No reports found."} />
        )}
      </SortableContext>
    </DndContext>
  );
  return;
};

export default ReportsMainContent;
