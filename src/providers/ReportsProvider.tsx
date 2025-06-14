import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { debounce } from "lodash";
import { ReportsContext } from "../context/ReportsContext";
import { useGetReports } from "../hooks/useReportsApi";
import type { DragEndEvent } from "@dnd-kit/core";
import { reorderItemsById } from "../utils/dnd.utils";
import type { Report } from "../types/types";
import { Outlet, useNavigate } from "react-router-dom";

export const ReportsProvider: FC<PropsWithChildren> = () => {
  const {
    data: initialReports = [],
    isLoading: isLoadingGetReports,
    isError,
  } = useGetReports();

  const navigate = useNavigate();
  const hasRedirectedRef = useRef(false);

  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState("");
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);

  useEffect(() => {
    if (isError && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      navigate("/server-offline");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (!isError && initialReports.length > 0) {
      setReports(initialReports);
      setFilteredReports(initialReports);
    }
  }, [initialReports, isError]);

  const reorderReports = useCallback((e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    setFilteredReports((prev) =>
      reorderItemsById(prev, e.active.id, e.over!.id)
    );
  }, []);

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
    return () => debouncedFilterReports.cancel();
  }, [filter, reports, debouncedFilterReports]);

  const onFilterChange = (value: string) => setFilter(value);

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
    <ReportsContext.Provider value={value}>
      <Outlet />
    </ReportsContext.Provider>
  );
};
