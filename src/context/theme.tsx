import { createContext, useEffect, useState } from "react";
import { Theme, ThemeContextType } from "../types";
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    document.body.className = theme;
  });

  const toggleTheme = (theme: Theme) => {
    console.log(theme);
    setTheme(theme === "light" ? "dark" : "light");
    document.body.className = theme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
