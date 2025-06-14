import React from "react";
import { useNavigate } from "react-router-dom";
import PreviewLayout from "../../ui/layout/PreviewLayout";
import ReportForm from "../ReportsDashboard/forms/ReportForm";
import { useDraftContent } from "../../hooks/useOpenApi";
import { REPORT_ROUTES } from "../../constants/routes";
import type { ReportFormValues } from "../../types/types";
import {
  useCreateReport,
  useInvalidateReportsCache,
} from "../../hooks/useReportsApi";
import { toast } from "react-toastify";

const ReportGenerateDraftScreen = () => {
  const navigate = useNavigate();
  const draftMutation = useDraftContent();
  const createMutation = useCreateReport();
  const invalidateReports = useInvalidateReportsCache();

  const handleDraftSubmit = async (values: ReportFormValues) => {
    try {
      const response = await draftMutation.mutateAsync({
        title: values.title,
        content: values.content,
      });

      const content = response.choices?.[0]?.message?.content ?? "";

      await createMutation.mutateAsync({
        title: values.title,
        content,
        timestamp: new Date().toISOString(),
        isDraft: true,
      });

      invalidateReports();
      toast.success("Draft report generated successfully!");
      navigate(REPORT_ROUTES.LIST);
    } catch (error) {
      console.error("Draft creation failed:", error);
      toast.error("Failed to generate draft report.");
    }
  };

  return (
    <PreviewLayout
      title="Generate a Draft Report using AI"
      backButtonOptions={{
        navigateTo: () => navigate(REPORT_ROUTES.LIST),
        label: "Back to Reports",
      }}
    >
      <ReportForm
        submitLabel="Create Draft"
        onSubmit={handleDraftSubmit}
        handleClose={() => navigate(REPORT_ROUTES.LIST)}
        defaultValues={{ isDraft: true, content: "", title: "" }}
      />
    </PreviewLayout>
  );
};

export default ReportGenerateDraftScreen;
