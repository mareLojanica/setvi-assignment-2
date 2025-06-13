import React from "react";
import ReportForm, { type ReportFormValues } from "../forms/ReportForm";
import {
  useInvalidateReportsCache,
  useUpdateReport,
} from "../../../hooks/useReportsApi";
import type { UpdateReportModalProps } from "../../../types/types";
import { toast } from "react-toastify";

const UpdateReportModal: React.FC<UpdateReportModalProps> = ({
  onClose,
  reportId,
  initialTitle,
  initialContent,
}) => {
  const updateReportMutation = useUpdateReport();
  const invalidateReports = useInvalidateReportsCache();

  const handleSubmit = async (values: ReportFormValues) => {
    try {
      await updateReportMutation.mutateAsync({
        id: reportId,
        title: values.title,
        content: values.content,
      });
      invalidateReports();
      toast.success("Report updated successfully!");
    } catch (error) {
      console.error("Failed to update report", error);
      toast.error("Failed to update report.");
    } finally {
      onClose();
    }
  };

  return (
    <ReportForm
      defaultValues={{
        title: initialTitle,
        content: initialContent,
      }}
      onSubmit={handleSubmit}
      submitLabel="Save"
      handleClose={onClose}
    />
  );
};

export default UpdateReportModal;
