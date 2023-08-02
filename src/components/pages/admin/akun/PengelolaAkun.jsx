import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import Http from "../../../utils/HttpServices";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";

const PengelolaAkun = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [pegawai, setPegawai] = React.useState([]);
  const [role, setRole] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      data_pegawai: null,
      username: "",
      password: "",
      role: null,
      id_pegawai: null,
    },
    onSubmit: (values) => {
      Http.post("/users/add", {
        username: values.username,
        password: values.password,
        role: values.role?.role_id,
        id_pegawai: values.id_pegawai,
      })
        .then((response) => {
          enqueueSnackbar("Data Berhasil Ditambahkan", {
            variant: "success",
            persist: false,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
          GetMaster();
          formik.resetForm();
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Data Gagal Ditambahkan", {
            variant: "error",
            persist: false,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        });
    },
  });

  const GetMaster = () => {
    Http.get("/master/pegawai").then((response) => {
      setPegawai(response.data);
    });
    Http.get("/users/all-role").then((response) => {
      setRole(response.data);
    });
    Http.get("/users/all-users").then((response) => {
      setUsers(response.data);
    });
  };

  React.useEffect(() => {
    GetMaster();
  }, []);

  console.log(formik.values);

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Autocomplete
            getOptionLabel={(option) => option.nama}
            isOptionEqualToValue={(option, value) => option.nip === value.nip}
            value={formik.values.data_pegawai}
            onChange={(event, value) => {
              formik.setFieldValue("data_pegawai", value);
              formik.setFieldValue("username", value.nip);
              formik.setFieldValue("id_pegawai", value.id_pegawai);
            }}
            options={pegawai}
            renderInput={(props) => (
              <TextField {...props} label="Pilih Pegawai" variant="standard" />
            )}
          />
          <Autocomplete
            getOptionLabel={(option) => option.role_name}
            isOptionEqualToValue={(option, value) =>
              option.role_id === value.role_id
            }
            value={formik.values.role}
            onChange={(event, value) => {
              formik.setFieldValue("role", value);
            }}
            options={role}
            renderInput={(props) => (
              <TextField {...props} label="Pilih Role" variant="standard" />
            )}
          />
          <TextField
            fullWidth
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
            label="Nama Pengguna"
            variant="standard"
          />
          <TextField
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            label="Kata Sandi"
            variant="standard"
          />
          <Button
            sx={{ mb: 3, mt: 3 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Simpan Data Pengguna
          </Button>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={users}
            columns={[
              {
                field: "username",
                flex: 1,
                headerName: "Nama Pengguna / Nip",
              },
              {
                field: "nama",
                flex: 1,
                headerName: "Nama Pegawai",
                valueGetter: (params) => params.row.pegawai.nama,
              },
              {
                field: "role",
                flex: 1,
                headerName: "Role User",
                valueGetter: (params) => {
                  return params.row.roles.role_name;
                },
              },
            ]}
            getRowId={(row) => row.id}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default PengelolaAkun;
