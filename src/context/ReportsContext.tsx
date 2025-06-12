import { createContext, useContext } from "react";

interface Report {
  id: number;
  title: string;
  content: string;
}

interface ReportsContextType {
  reports: Report[];
  filteredReports: Report[];
  onFilterChange: (value: string) => void;
  filter: string;
  isLoading: boolean;
}

export const ReportsContext = createContext<ReportsContextType | undefined>(
  undefined
);

export const useReports = (): ReportsContextType => {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used within ReportsProvider");
  return ctx;
};
