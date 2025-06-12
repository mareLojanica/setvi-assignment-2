import React, { useState } from "react";
import MainLayout from "./Laoyuts/MainLayout";
import { Typography } from "@mui/material";
import ToolbarBar from "./components/Toolbar";
import ResponsiveGrid from "./components/Grid";
import ReportCard from "./components/ReportCard";
import { reportCardData } from "./__mocks__/report.mocks";
import { useModal } from "./context/ModalContext";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import DraggableCard from "./components/DraggableCard";

const App = () => {
  const [reports, setReports] = useState(reportCardData);
  const { openEditModal, openSummaryModal } = useModal();

  const onEdit = () => openEditModal();
  const onSummarize = () => openSummaryModal();

  const reorderReports = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;

    setReports((prev) => {
      const oldIdx = prev.findIndex(
        (r) => r.id.toString() === e.active.id.toString()
      );
      const newIdx = prev.findIndex(
        (r) => r.id.toString() === e.over!.id.toString()
      );
      return arrayMove(prev, oldIdx, newIdx);
    });
  };

  return (
    <MainLayout>
      <Typography
        variant="h1"
        component="h1"
        sx={{ mt: 4, mb: 2, color: "primary.main" }}
      >
        Reports Dashboard
      </Typography>

      <ToolbarBar />

      <DndContext onDragEnd={reorderReports}>
        <SortableContext items={reports.map((r) => r.id)}>
          <ResponsiveGrid>
            {reports.map(({ id, title, content }) => (
              <DraggableCard key={id} id={id}>
                <ReportCard
                  id={id}
                  title={title}
                  content={content}
                  onEdit={onEdit}
                  onSummarize={onSummarize}
                />
              </DraggableCard>
            ))}
          </ResponsiveGrid>
        </SortableContext>
      </DndContext>
    </MainLayout>
  );
};

export default App;
