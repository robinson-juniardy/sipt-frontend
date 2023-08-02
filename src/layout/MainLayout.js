import React from "react";
import ApplicationBar from "./components/ApplicationBar";
import { Outlet } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";

export const MainLayout = () => {
  return (
    <div>
      <ApplicationBar />
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </div>
  );
};
