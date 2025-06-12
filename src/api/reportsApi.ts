// src/api/reports.ts
import { api } from "./apiClient";
import { ENDPOINTS } from "../constants/endpoints";

export interface Report {
  id: number;
  title: string;
  content: string;
}

export const getReports = async (): Promise<Report[]> => {
  const { data } = await api.get(ENDPOINTS.REPORTS);
  return data;
};

export const createReport = async (report: Omit<Report, "id">) => {
  const { data } = await api.post(ENDPOINTS.REPORTS, report);
  return data;
};

export const updateReport = async (report: Report) => {
  const { data } = await api.put(ENDPOINTS.REPORT_BY_ID(report.id), report);
  return data;
};

export const patchReport = async (
  id: number,
  fields: Partial<Omit<Report, "id">>
) => {
  const { data } = await api.patch(ENDPOINTS.REPORT_BY_ID(id), fields);
  return data;
};
