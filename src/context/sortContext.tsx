import { createContext, useState, useEffect } from "react";
import { Sort, SortContextType } from "../types";

export const SortContext = createContext<SortContextType | null>(null);

export const SortContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sort, setSort] = useState<Sort>({ label: null, order: null });
  const [sortString, setSortString] = useState<string>("");
  console.log(sortString);
  useEffect(() => {
    const { label, order } = sort;
    if (label === null || order === null) {
      setSortString("");
      return;
    } else {
      setSortString(`&_sort=${label}&_order=${order}`);
    }
  }, [sort]);

  return (
    <SortContext.Provider value={{ sort, setSort, sortString }}>
      {children}
    </SortContext.Provider>
  );
};
