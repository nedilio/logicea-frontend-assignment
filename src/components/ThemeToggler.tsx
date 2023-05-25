import React from "react";
import { ThemeContext } from "../context/theme";
import { ThemeContextType } from "../types";
import { Button } from "@tremor/react";

const ThemeToggler = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = React.useContext(
    ThemeContext
  ) as ThemeContextType;

  return (
    <div data-theme={theme}>
      <Button
        onClick={() => toggleTheme(theme)}
        className="absolute top-2 right-2"
      >
        Toggle theme : {theme}
      </Button>
      {children}
    </div>
  );
};
export default ThemeToggler;
