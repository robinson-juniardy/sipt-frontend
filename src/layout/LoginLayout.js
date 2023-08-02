import React from "react";
import ApplicationBar2 from "./components/ApplicationBar2";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import PublicRoutes from "../PublicRoutes";

const LoginLayout = () => {
  return (
    <div>
      <PublicRoutes>
        <ApplicationBar2 />
        <Box component={"main"} sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </PublicRoutes>
    </div>
  );
};

export default LoginLayout;
