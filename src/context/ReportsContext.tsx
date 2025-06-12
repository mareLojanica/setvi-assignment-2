import React, { createContext, useContext } from "react";

interface Report {
  id: number;
  title: string;
  content: string;
}

interface ReportsContextType {
  reports: Report[];
  filteredReports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  onFilterChange: (value: string) => void;
  filter: string;
}

export const ReportsContext = createContext<ReportsContextType | undefined>(
  undefined
);

export const useReports = (): ReportsContextType => {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used within ReportsProvider");
  return ctx;
};
