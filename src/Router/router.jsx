import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/notFound/notFound";
import Dashboard from "pages/dashboard/dashboard";

export default function Routers() {
  return useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    { path: "*", element: <NotFound /> },
  ]);
}
