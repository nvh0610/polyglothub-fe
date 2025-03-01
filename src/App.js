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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/category/:id/vocabulary",
    element: <Vocabulary />,
  },
  {
    path: "/grammar",
    element: <Grammar />,
  },
  {
    path: "/flashcard",
    element: <Flashcard />,
  }
]);

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      {/* <AuthProvider> */}
        <RouterProvider router={router} />
      {/* </AuthProvider> */}
    </CustomThemeProvider>
  );
}

export default App;
