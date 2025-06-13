export const ENDPOINTS = {
  REPORTS: "/reports",
  REPORT_BY_ID: (id: number | string) => `/reports/${id}`,
  OPENAI_CHAT_COMPLETION: "/chat/completions",
};
