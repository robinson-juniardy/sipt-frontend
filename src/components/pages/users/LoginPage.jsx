import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import HttpServices from "../../utils/HttpServices";
import { useSnackbar } from "notistack";
import useAuth from "../../../hook/useAuth";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { setAuth, auth } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      HttpServices.get(
        "/users/check-users/" + values.username + "/" + values.password
      ).then((response) => {
        if (response.data.status) {
          localStorage.setItem("users_id", response.data.data[0].id);
          localStorage.setItem("nip", response.data.data[0].username);
          localStorage.setItem("username", response.data.data[0].username);
          localStorage.setItem("nama", response.data.data[0].pegawai?.nama);
          localStorage.setItem(
            "id_pegawai",
            response.data.data[0].pegawai?.id_pegawai
          );
          localStorage.setItem("role", response.data.data[0].roles.role_name);

          setAuth({
            users_id: response.data.data[0].id,
            nip: response.data.data[0].username,
            username: response.data.data[0].username,
            role: response.data.data[0].roles.role_name,
            nama: response.data.data[0].pegawai?.nama,
            id_pegawai: response.data.data[0].pegawai?.id_pegawai,
          });
        } else {
          enqueueSnackbar(response.data.message, {
            variant: "error",
            persist: false,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      });
    },
  });

  return (
    <div>
      <Container component={"main"} maxWidth="xs">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username / NIP"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              // autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
