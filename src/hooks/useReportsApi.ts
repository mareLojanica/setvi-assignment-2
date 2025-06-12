import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReports,
  createReport,
  updateReport,
  patchReport,
  type Report,
} from "../api/reportsApi";

export const useGetReports = () =>
  useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

export const useCreateReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};

export const useUpdateReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};

export const usePatchReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, fields }: { id: number; fields: Partial<Report> }) =>
      patchReport(id, fields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};
