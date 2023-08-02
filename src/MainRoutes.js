import React from "react";
import { routes, public_routes } from "./data/routesdata";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import useAuth from "./hook/useAuth";

// const adminRouter = createBrowserRouter([...admin_routes]);
const router = createBrowserRouter([...routes]);
// const publicRouter = createBrowserRouter([...public_routes]);

export default function MainRoutes() {
  const { auth } = useAuth();

  // console.log(createRouter());

  return (
    <RouterProvider router={router} fallbackElement={<CircularProgress />} />
  );
}
