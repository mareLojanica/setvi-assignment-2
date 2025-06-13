import { createContext, useContext } from "react";
import type { ReportsContextType } from "../types/types";

export const ReportsContext = createContext<ReportsContextType | undefined>(
  undefined
);

export const useReports = (): ReportsContextType => {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used within ReportsProvider");
  return ctx;
};
