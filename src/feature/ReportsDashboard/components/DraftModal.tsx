import React from "react";

import { useModal } from "../../../context/ModalContext";

import type { ReportFormValues } from "../forms/ReportForm";
import ReportForm from "../forms/ReportForm";
import { useDraftContent } from "../../../hooks/useOpenApi";

const DraftModal: React.FC = () => {
  const { closeModal, openCreateNewReportModal, setIsSummaryLoading } =
    useModal();

  const draftMutation = useDraftContent();

  const handleDraftSubmit = async (values: ReportFormValues) => {
    setIsSummaryLoading(true);
    try {
      const response = await draftMutation.mutateAsync({
        title: values.title,
        content: values.content,
      });

      const content = response.choices?.[0]?.message?.content ?? "";

      openCreateNewReportModal({
        title: values.title,
        content,
        modalTitle: "Create Report from Draft",
        reportId: "test",
      });
    } catch (error) {
      console.error("Draft creation failed:", error);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  return (
    <ReportForm
      submitLabel="Create Draft"
      onSubmit={handleDraftSubmit}
      handleClose={closeModal}
    />
  );
};

export default DraftModal;
