import { createContext, useEffect, useState } from "react";
import { FiltersContextType } from "../types";
import { DateRangePickerValue } from "@tremor/react";

interface FiltersContextProps {
  children: React.ReactNode;
}

export const FiltersContext = createContext<FiltersContextType | null>(null);

export function FiltersProvider({ children }: FiltersContextProps) {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([
    new Date(0),
    new Date(Date.now()),
  ]);
  const [dateFilter, setDateFilter] = useState<string>(
    `CreatedAt_gte=${0}&CreatedAt_lte=${Date.now()}`
  );
  const [viewFilter, setViewFilter] = useState<number>(0);
  const [viewFilterString, setViewFilterString] = useState<string>(
    `&View_gte=${viewFilter}`
  );

  useEffect(() => {
    const [low, high] = dateRange;
    const lowNumber = low?.getTime() || 0;
    const highNumber =
      high?.getTime() ||
      (new Date().getTime() > lowNumber ? lowNumber : new Date().getTime());
    setDateFilter(`&CreatedAt_gte=${lowNumber}&CreatedAt_lte=${highNumber}`);
  }, [dateRange]);

  useEffect(() => {
    const x = setTimeout(() => {
      setViewFilterString(`&Views_gte=${viewFilter}`);
    }, 250);
    return () => {
      clearTimeout(x);
    };
  }, [viewFilter]);

  return (
    <FiltersContext.Provider
      value={{
        dateRange,
        setDateRange,
        dateFilter,
        viewFilter,
        setViewFilter,
        viewFilterString,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
