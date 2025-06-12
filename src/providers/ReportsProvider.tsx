import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { reportCardData } from "../__mocks__/report.mocks";
import { ReportsContext } from "../context/ReportsContext";

export const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reports, setReports] = useState(reportCardData);
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

  return (
    <ReportsContext.Provider
      value={{ reports, setReports, filteredReports, onFilterChange, filter }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
