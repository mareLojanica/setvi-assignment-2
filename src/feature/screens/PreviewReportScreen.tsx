import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetReport } from "../../hooks/useReportsApi";
import { REPORT_ROUTES } from "../../constants/routes";
import PreviewLayout from "../../ui/layout/PreviewLayout";
import MarkdownRenderer from "../../ui/components/MarkdownRenderer";
import LoadingSection from "../../ui/components/LoadingSection";
import ErrorMessage from "../../ui/components/ErrorMessage";

const PreviewReportScreen = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error: reportError } = useGetReport(reportId);

  return (
    <PreviewLayout
      title={`Summarize report > ${data?.title ?? ""}`}
      backButtonOptions={{ navigateTo: () => navigate(REPORT_ROUTES.LIST) }}
    >
      {isLoading && <LoadingSection text="Fetching report..." />}
      {reportError && <ErrorMessage message="Error loading report." />}
      {data && <MarkdownRenderer content={data?.content ?? ""} />}
    </PreviewLayout>
  );
};

export default PreviewReportScreen;
