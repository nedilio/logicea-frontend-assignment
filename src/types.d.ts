export interface Joke {
  Author: string;
  Body: string;
  CreatedAt: number;
  Title: string;
  Views: number;
  id: number;
}
export type Theme = "light" | "dark";
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
}

export interface FiltersContextType {
  dateRange: DateRangePickerValue;
  setDateRange: React.Dispatch<React.SetStateAction<DateRangePickerValue>>;
  dateFilter: string;
}
