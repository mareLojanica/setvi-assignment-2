import MainLayout from "./Layouts/MainLayout";
import { Typography } from "@mui/material";
import ToolbarBar from "./components/Toolbar";
import ResponsiveGrid from "./components/Grid";
import { useModal } from "./context/ModalContext";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import DraggableCard from "./components/DraggableCard";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useReports } from "./context/ReportsContext";
const App = () => {
  const { openEditModal, openSummaryModal } = useModal();
  const { filteredReports, setReports } = useReports();
  const onEdit = (title: string, content: string, reportId: number) => {
    openEditModal({
      modalTitle: "Edit Report",
      title,
      content,
      reportId,
    });
  };
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

      <DndContext
        onDragEnd={reorderReports}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext items={filteredReports.map((r) => r.id)}>
          <ResponsiveGrid>
            {filteredReports.map(({ id, title, content }) => (
              <DraggableCard
                key={id}
                id={id}
                title={title}
                content={content}
                onSummarize={onSummarize}
                onEdit={onEdit}
              ></DraggableCard>
            ))}
          </ResponsiveGrid>
        </SortableContext>
      </DndContext>
    </MainLayout>
  );
};

export default App;
