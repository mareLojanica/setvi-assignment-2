import React from "react";

import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import Spinner from "../../../ui/components/Spinner";
import ResponsiveGrid from "../../../ui/components/ResponsiveGrid";
import { useReports } from "../../../context/ReportsContext";
import DraggableCard from "./DraggableCard";
import NoDataPlaceholder from "../../../ui/components/NoDataPlaceholder";

const ReportsMainContent = () => {
  const { filteredReports, isLoading, reorderReports } = useReports();

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
            {filteredReports.map(({ id, title, content, isDraft }) => (
              <DraggableCard
                key={id}
                id={id}
                title={title}
                content={content}
                isDraft={isDraft}
              />
            ))}
          </ResponsiveGrid>
        ) : (
          <NoDataPlaceholder message={"No reports found."} />
        )}
      </SortableContext>
    </DndContext>
  );
};

export default ReportsMainContent;
