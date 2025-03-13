import * as React from "react";
import "./App.css";
import Home from "./views/home/Home";
import Dashboard from "./views/dashboard/Dashboard";
import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "./components/base/HomeDefault";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Category from "./views/category/Category";
import Vocabulary from "./views/vocabulary/Vocabulary";
import Grammar from "./views/grammar/Grammar";
import Flashcard from "./views/flashcard/Flashcard";
import { Outlet } from "react-router-dom";
import AuthProvider from "./components/hooks/AuthProvider";
import { PATHNAME } from "./constants/PathUri";

const ProtectedRoutes = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <ProtectedRoutes />, // Tất cả các route bên dưới đều cần AuthProvider
    children: [
      { path: PATHNAME.DASHBOARD, element: <Dashboard /> },
      { path: PATHNAME.CATEGORY, element: <Category /> },
      { path: PATHNAME.VOCABULARY, element: <Vocabulary /> },
      { path: PATHNAME.GRAMMAR, element: <Grammar /> },
      { path: PATHNAME.FLASHCARD, element: <Flashcard /> },
    ],
  },
]);

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </CustomThemeProvider>
  );
}

export default App;
