import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetReport } from "../../hooks/useReportsApi";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Box, Alert } from "@mui/material";
import { useSummarizeContent } from "../../hooks/useOpenApi";
import { REPORT_ROUTES } from "../../constants/routes";
import PreviewLayout from "../../ui/layout/PreviewLayout";
import ErrorMessage from "../../ui/components/ErrorMessage";
import LoadingSection from "../../ui/components/LoadingSection";

const SummarizeReportScreen = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();

  const {
    data: report,
    isLoading: isReportLoading,
    error: reportError,
  } = useGetReport(reportId);

  const {
    mutate,
    data: summary,
    isPending: isSummarizing,
    isSuccess,
    error: summarizeError,
  } = useSummarizeContent();

  useEffect(() => {
    if (report) {
      mutate({ title: report.title, content: report.content });
    }
  }, [report, mutate]);

  if (isReportLoading) return <LoadingSection text="Loading report..." />;
  if (reportError || !report)
    return <ErrorMessage message="Failed to load report." />;

  return (
    <PreviewLayout
      title={`Summarize report > ${report.title}`}
      backButtonOptions={{ navigateTo: () => navigate(REPORT_ROUTES.LIST) }}
    >
      {isSummarizing && <LoadingSection text="Generating summary.." />}

      {summarizeError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to summarize the report.
        </Alert>
      )}

      {isSuccess && (
        <Box sx={{ mt: 2 }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {summary.choices[0].message.content}
          </ReactMarkdown>
        </Box>
      )}
    </PreviewLayout>
  );
};

export default SummarizeReportScreen;
