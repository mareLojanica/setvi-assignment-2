export const REPORT_ROUTES = {
  BASE: "/reports",
  LIST: "/reports",
  CREATE: "/reports/create",
  GENERATE_DRAFT: "/reports/generate-draft",
  DETAIL: (reportId: string | number) => `/reports/${reportId}`,
  SUMMARIZE_REPORT: (reportId: string | number) =>
    `/reports/summarize/${reportId}`,
  SHOW_MORE: (reportId: string | number) => `/reports/preview/${reportId}`,
};
