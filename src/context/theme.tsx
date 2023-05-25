import { createContext, useState } from "react";

interface ThemeContextTypes {
  theme: "light" | "dark";
  toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextTypes>({
  theme: "dark",
});

export const ThemeContextProvider = (children: React.ReactNode) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  //   setTheme("dark");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
