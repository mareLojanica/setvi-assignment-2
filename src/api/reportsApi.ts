import { api } from "./apiClient";
import { ENDPOINTS } from "../constants/endpoints";
import type { Report } from "../types/types";


export const getReports = async () => {
  const { data } = await api.get(ENDPOINTS.REPORTS);
    return data.sort(
      (a: Report, b: Report) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
};

export const createReport = async (report: Omit<Report, "id">) => {
  const { data } = await api.post(ENDPOINTS.REPORTS, report);
  return data;
};

export const updateReport = async (report: Omit<Report, "timestamp">) => {
  const { data } = await api.patch(ENDPOINTS.REPORT_BY_ID(report.id), report);
  return data;
};

export const patchReport = async (
  id: string,
  fields: Partial<Omit<Report, "id">>
) => {
  const { data } = await api.patch(ENDPOINTS.REPORT_BY_ID(id), fields);
  return data;
};
export const getReportById = async (id: string): Promise<Report> => {
  const { data } = await api.get(`/reports/${id}`);
  return data;
};
