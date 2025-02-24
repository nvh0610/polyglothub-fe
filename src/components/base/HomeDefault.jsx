import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "./getLPTheme";

const ThemeContext = createContext({
  currentTheme: "light",
  changeCurrentTheme: () => {},
});

function getInitialMode() {
  const savedMode = JSON.parse(localStorage.getItem("mode"));
  return savedMode || "light";
}

export default function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode());
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode: mode, toggleColorMode }}>
      <ThemeProvider theme={LPtheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeProvider = () => useContext(ThemeContext);
