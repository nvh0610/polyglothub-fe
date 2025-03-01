import { alpha } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const brand = {
  50: "#F0F7FF",
  100: "#CEF6D7",
  200: "#57E095",
  300: "#55A6F6",
  400: "#0A66C2",
  500: "#00623B",
  600: "#064079",
  700: "#033363",
  800: "#02294F",
  900: "#015433",
};

export const secondary = {
  50: "#F9F0FF",
  100: "#E9CEFD",
  200: "#D49CFC",
  300: "#B355F6",
  400: "#750AC2",
  500: "#6709AA",
  600: "#490679",
  700: "#3B0363",
  800: "#2F024F",
  900: "#23023B",
};

export const gray = {
  50: "#FBFCFE",
  100: "#EAF0F5",
  200: "#D6E2EB",
  300: "#BFCCD9",
  400: "#94A6B8",
  500: "#5B6B7C",
  600: "#4C5967",
  700: "#364049",
  800: "#131B20",
  900: "#090E10",
};

export const green = {
  50: "#F6FEF6",
  100: "#E3FBE3",
  200: "#C7F7C7",
  300: "#A1E8A1",
  400: "#51BC51",
  500: "#1F7A1F",
  600: "#136C13",
  700: "#0A470A",
  800: "#042F04",
  900: "#021D02",
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[900],
      contrastText: brand[50],
      ...(mode === "dark" && {
        contrastText: brand[100],
        light: brand[300],
        main: brand[400],
        dark: brand[900],
      }),
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[900],
      ...(mode === "dark" && {
        light: secondary[400],
        main: secondary[500],
        dark: secondary[900],
      }),
    },
    warning: {
      main: "#F7B538",
      dark: "#F79F00",
      ...(mode === "dark" && { main: "#F7B538", dark: "#F79F00" }),
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[800],
      ...(mode === "dark" && {
        light: "#D32F2F",
        main: "#D32F2F",
        dark: "#B22A2A",
      }),
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[900],
      ...(mode === "dark" && {
        light: green[400],
        main: green[500],
        dark: green[800],
      }),
    },
    grey: {
      50: gray[50],
      100: gray[100],
      200: gray[200],
      300: gray[300],
      400: gray[400],
      500: gray[500],
      600: gray[600],
      700: gray[700],
      800: gray[800],
      900: gray[900],
    },
    divider: mode === "dark" ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
    background: {
      default: "#fff",
      paper: gray[50],
      ...(mode === "dark" && { default: gray[900], paper: gray[800] }),
    },
    text: {
      primary: gray[800],
      secondary: "#015433",
      ...(mode === "dark" && { primary: "#fff", secondary: gray[400] }),
    },
    action: {
      selected: `${alpha(brand[200], 0.2)}`,
      ...(mode === "dark" && {
        selected: alpha(brand[800], 0.2),
      }),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(","),
    h1: {
      fontSize: 60,
      fontWeight: 600,
      lineHeight: 78 / 70,
      letterSpacing: -0.2,
    },
    h2: {
      fontSize: 48,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 42,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 36,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
    navbar: {
      fontWeight: 600,
      fontSize: 14,
    },
    body1: {
      fontWeight: 400,
      fontSize: 15,
    },
    body2: {
      fontWeight: 300,
      fontSize: 10,
    },
    caption: {
      fontWeight: 200,
      fontSize: 10,
    },
  },
});

const getLPTheme = (mode) => {
  return {
    palette: {
      mode: mode,
      background: {
        default: "#ede6f4", // Màu vàng làm nền chính
      },
      primary: {
        main: "#e3c9ff", // Màu cam làm màu chính
      },
      secondary: {
        main: "#FF5722", // Màu đỏ cam cho màu phụ
      },
      text: {
        primary: "#333", // Màu đen cho chữ
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
      fontSize: 16, // Kích thước chữ mặc định
      h1: {
        fontSize: "1rem",
        fontWeight: 900,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      body2: {
        fontSize: "1rem",
        fontWeight: 300,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "e3c9ff", // Đảm bảo toàn bộ trang có nền màu vàng
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#6dff8f", // Màu đỏ cam khi hover
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: "#FF5722", // Màu đỏ cam cho gach ngang
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: "#FF5722", // Màu đỏ cam cho link
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#6dff8f", // Màu đỏ cam khi hover
            },
          },
        },
      },
    },
  };
};

export default getLPTheme;
