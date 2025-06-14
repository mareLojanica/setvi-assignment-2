import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PreviewLayout from "../../ui/layout/PreviewLayout";
import ReportForm from "../ReportsDashboard/forms/ReportForm";
import {
  useCreateReport,
  useInvalidateReportsCache,
} from "../../hooks/useReportsApi";
import { REPORT_ROUTES } from "../../constants/routes";

const ReportCreateScreen = () => {
  const navigate = useNavigate();
  const createReport = useCreateReport();
  const invalidateCache = useInvalidateReportsCache();

  const handleCreate = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    try {
      await createReport.mutateAsync({
        title,
        content,
        timestamp: new Date().toISOString(),
        isDraft: false,
      });

      invalidateCache();
      toast.success("Report created successfully!");
      navigate(REPORT_ROUTES.LIST);
    } catch (err) {
      console.error("Create report failed:", err);
      toast.error("Failed to create report.");
    }
  };

  return (
    <PreviewLayout
      title="Create New Report"
      backButtonOptions={{
        navigateTo: () => navigate(REPORT_ROUTES.LIST),
        label: "Back to Reports",
      }}
    >
      <ReportForm
        onSubmit={handleCreate}
        submitLabel="Create"
        handleClose={() => navigate(REPORT_ROUTES.LIST)}
      />
    </PreviewLayout>
  );
};

export default ReportCreateScreen;
