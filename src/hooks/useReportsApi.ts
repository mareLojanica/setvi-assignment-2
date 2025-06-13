import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReports,
  createReport,
  updateReport,
  patchReport,
} from "../api/reportsApi";
import type { Report } from "../types/types";
import { QUERY_KEYS } from "../constants/cache-eviction";

export const useGetReports = () =>
  useQuery({
    queryKey: [QUERY_KEYS.REPORTS],
    queryFn: getReports,
  });

export const useCreateReport = () =>
  useMutation({
    mutationFn: createReport,
  });

export const useUpdateReport = () =>
  useMutation({
    mutationFn: updateReport,
  });

export const usePatchReport = () =>
  useMutation({
    mutationFn: ({ id, fields }: { id: string; fields: Partial<Report> }) =>
      patchReport(id, fields),
  });

export const useInvalidateReportsCache = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPORTS] });
};
