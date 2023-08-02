import { Backdrop, CircularProgress, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hook/useAuth";

const SplashScreen = () => {
  const [open, setOpen] = useState(true);
  const { auth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
      return navigate(`${auth.role}/home`);
    }, 4000);
  }, []);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Stack
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        direction="column"
        spacing={1}
      >
        <CircularProgress color="inherit" />
        <Typography variant="overline" component="span">
          Selamat Datang , Mohon Tunggu
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default SplashScreen;
