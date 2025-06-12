import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { reportCardData } from "../__mocks__/report.mocks";
import { ReportsContext } from "../context/ReportsContext";
import { useGetReports } from "../hooks/useReportsApi";

export const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: reports = [], isLoading: isLoadingGetReports } =
    useGetReports();
  const [filter, setFilter] = useState("");
  const [filteredReports, setFilteredReports] = useState(reportCardData);

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      const lower = filter.toLowerCase();
      const result = reports.filter((r) =>
        r.title.toLowerCase().includes(lower)
      );
      setFilteredReports(result);
    }, 300);

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [filter, reports]);

  const onFilterChange = (value: string) => {
    setFilter(value);
  };
  const isLoading = isLoadingGetReports;
  return (
    <ReportsContext.Provider
      value={{ reports, filteredReports, onFilterChange, filter, isLoading }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
