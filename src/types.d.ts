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
