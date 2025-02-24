import * as React from "react";

import "./App.css";
import Home from "./views/home/Home";
import Dashboard from "./views/dashboard/Dashboard";
import Vocabulary from "./views/vocabulary/Vocabulary";
import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "./components/base/HomeDefault";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    path: "/vocabulary",
    element: <Vocabulary />,
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
