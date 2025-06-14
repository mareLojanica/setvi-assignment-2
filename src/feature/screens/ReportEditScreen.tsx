import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useGetReport,
  useUpdateReport,
  useInvalidateReportsCache,
} from "../../hooks/useReportsApi";

import { REPORT_ROUTES } from "../../constants/routes";
import type { ReportFormValues } from "../../types/types";

import PreviewLayout from "../../ui/layout/PreviewLayout";
import ReportForm from "../ReportsDashboard/forms/ReportForm";
import LoadingSection from "../../ui/components/LoadingSection";
import ErrorMessage from "../../ui/components/ErrorMessage";

const ReportEditScreen = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetReport(reportId);
  const updateReport = useUpdateReport();
  const invalidateCache = useInvalidateReportsCache();

  const handleSubmit = async (values: ReportFormValues) => {
    try {
      await updateReport.mutateAsync({
        id: data!.id,
        title: values.title,
        content: values.content,
        isDraft: values.isDraft,
      });

      invalidateCache(data!.id);
      toast.success("Report updated successfully!");
      navigate(REPORT_ROUTES.LIST);
    } catch (err) {
      console.error("Failed to update report:", err);
      toast.error("Failed to update report.");
    }
  };

  return (
    <PreviewLayout
      title={`Edit Report - ${data?.title ?? ""}`}
      backButtonOptions={{
        navigateTo: () => navigate(REPORT_ROUTES.LIST),
        label: "Back to Reports",
      }}
    >
      {isLoading && <LoadingSection text="Loading report..." />}
      {error && <ErrorMessage message="Error loading report." />}
      {data && (
        <ReportForm
          defaultValues={data}
          onSubmit={handleSubmit}
          submitLabel="Update"
          handleClose={() => navigate(REPORT_ROUTES.LIST)}
        />
      )}
    </PreviewLayout>
  );
};

export default ReportEditScreen;
