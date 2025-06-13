import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { ReportsContext } from "../context/ReportsContext";
import { useGetReports } from "../hooks/useReportsApi";

import type { DragEndEvent } from "@dnd-kit/core";
import { reorderItemsById } from "../utils/dnd.utils";
import type { Report } from "../types/types";

export const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: initialReports = [], isLoading: isLoadingGetReports } =
    useGetReports();

  const [reports, setReports] = useState<Report[]>(initialReports);
  const [filter, setFilter] = useState("");
  const [filteredReports, setFilteredReports] =
    useState<Report[]>(initialReports);

  const reorderReports = useCallback(
    (e: DragEndEvent) => {
      if (!e.over || e.active.id === e.over.id) return;

      setFilteredReports((prev) =>
        reorderItemsById(prev, e.active.id, e.over!.id)
      );
    },
    [setFilteredReports]
  );
  useEffect(() => {
    setReports(initialReports);
    setFilteredReports(initialReports);
  }, [initialReports]);

  const debouncedFilterReports = useMemo(
    () =>
      debounce((value: string, allReports: Report[]) => {
        const lower = value.toLowerCase();
        const filtered = allReports.filter((r) =>
          r.title.toLowerCase().includes(lower)
        );
        setFilteredReports(filtered);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedFilterReports(filter, reports);
    return () => {
      debouncedFilterReports.cancel();
    };
  }, [filter, reports, debouncedFilterReports]);

  const onFilterChange = (value: string) => {
    setFilter(value);
  };

  const value = useMemo(
    () => ({
      reports,
      filteredReports,
      onFilterChange,
      filter,
      isLoading: isLoadingGetReports,
      setFilteredReports,
      reorderReports,
    }),
    [reports, filteredReports, filter, isLoadingGetReports, reorderReports]
  );

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
};
