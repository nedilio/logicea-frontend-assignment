import { createContext, useState } from "react";

interface FiltersContextProps {
  children: React.ReactNode;
}

interface FiltersContextData {
  filters: Filters;
  sortBy: SortBy;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
}

interface Filters {
  date: string;
  views: number;
}

interface SortBy {
  label: "Views" | "Date";
  order: "asc" | "desc";
}

export const FiltersContext = createContext<FiltersContextData>(
  {} as FiltersContextData
);

export function FiltersProvider({ children }: FiltersContextProps) {
  const [filters, setFilters] = useState<Filters>({ date: "", views: 0 });
  const [sortBy, setSortBy] = useState<SortBy>({
    label: "Views",
    order: "desc",
  });
  return (
    <FiltersContext.Provider value={{ filters, setFilters, sortBy, setSortBy }}>
      {children}
    </FiltersContext.Provider>
  );
}
