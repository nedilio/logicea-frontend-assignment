import React from "react";
import { ThemeContext } from "../context/theme";
import { ThemeContextType } from "../types";
import { Button } from "@tremor/react";

const ThemeToggler = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = React.useContext(
    ThemeContext
  ) as ThemeContextType;

  return (
    <div className="dark:bg-gray-800 bg-gray-200 dark:text-gray-100 text-gray-900 min-h-screen p-8">
      <Button className="mb-2" onClick={() => toggleTheme(theme)}>
        Toggle theme : {theme}
      </Button>
      {children}
    </div>
  );
};
export default ThemeToggler;
