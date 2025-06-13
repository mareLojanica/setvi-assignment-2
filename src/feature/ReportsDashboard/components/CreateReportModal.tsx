import React from "react";
import {
  useCreateReport,
  useInvalidateReportsCache,
} from "../../../hooks/useReportsApi";
import ReportForm from "../forms/ReportForm";
import type { CreateReportModalProps } from "../../../types/types";
import { toast } from "react-toastify";
import { useModal } from "../../../context/ModalContext";

const CreateReportModal: React.FC<CreateReportModalProps> = ({ onClose }) => {
  const createMutation = useCreateReport();
  const invalidateReports = useInvalidateReportsCache();
  const { modalState } = useModal();

  const handleCreate = async (data: { title: string; content: string }) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        timestamp: new Date().toISOString(),
      });
      invalidateReports();
      toast.success("Report created successfully!");
    } catch (error) {
      console.error("Failed to create report", error);
      toast.error("Failed to create report.");
    } finally {
      onClose();
    }
  };

  return (
    <ReportForm
      onSubmit={handleCreate}
      submitLabel="Create"
      handleClose={onClose}
      defaultValues={{
        title: modalState.data?.title ?? "",
        content: modalState.data?.content ?? "",
      }}
    />
  );
};

export default CreateReportModal;
