import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Http from "../../../../utils/HttpServices";
import { useSnackbar } from "notistack";
import { Cancel, Save } from "@mui/icons-material";

const FormInputPegawai = (props) => {
  const [jabatan, setJabatan] = React.useState([]);
  const [pangkat, setPangkat] = React.useState([]);
  const [golongan, setGolongan] = React.useState([]);
  const [pegawai, setPegawai] = React.useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      id_pegawai: null,
      nip: "",
      nama: "",
      jabatan: null,
      golongan: null,
      pangkat: null,
      atasan_langsung: null,
    },
    onSubmit: (value) => {
      if (!props.editMode) {
        Http.post("/master/pegawai/add", {
          nip: value.nip,
          nama: value.nama,
          jabatan: value.jabatan?.id_jabatan,
          golongan: value.golongan?.id_golongan,
          pangkat: value.pangkat?.id_pangkat,
          atasan_langsung: value.atasan_langsung?.id_pegawai,
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
            formik.resetForm();
            props.setIsActive(false);
            props.display();
          })

          .catch((err) => {
            enqueueSnackbar("Data Gagal Ditambahkan", {
              variant: "error",
              persist: false,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          });
      } else {
        Http.patch("/master/pegawai/update", {
          id_pegawai: value.id_pegawai,
          nip: value.nip,
          nama: value.nama,
          jabatan: value.jabatan?.id_jabatan,
          golongan: value.golongan?.id_golongan,
          pangkat: value.pangkat?.id_pangkat,
          atasan_langsung: value.atasan_langsung.id_pegawai,
        })
          .then((response) => {
            enqueueSnackbar("Data Berhasil Di Update", {
              variant: "success",
              persist: false,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
            formik.resetForm();
            RestoreForm();
            props.setEditMode(false);
            props.setIsActive(false);
            props.display();
          })

          .catch((err) => {
            enqueueSnackbar("Data Gagal Di Update", {
              variant: "error",
              persist: false,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            });
          });
      }
    },
  });

  const GetMaster = () => {
    Http.get("/master/jabatan").then((response) => setJabatan(response.data));
    Http.get("/master/pangkat").then((response) => setPangkat(response.data));
    Http.get("/master/golongan").then((response) => setGolongan(response.data));
    Http.get("/master/pegawai").then((response) => setPegawai(response.data));
  };

  React.useEffect(() => {
    GetMaster();
  }, []);

  React.useEffect(() => {
    if (props.editMode === true) {
      formik.setValues({
        id_pegawai: props.editValue.id_pegawai,
        nip: props.editValue.nip,
        nama: props.editValue.nama,
        golongan: golongan.find(
          (row) => row.id_golongan === props.editValue.golongan
        ),
        jabatan: jabatan.find(
          (row) => row.id_jabatan === props.editValue.jabatan
        ),
        pangkat: pangkat.find(
          (row) => row.id_pangkat === props.editValue.pangkat
        ),
        atasan_langsung:
          props.editValue.atasan !== null
            ? pegawai.find(
                (row) => row.id_pegawai === props.editValue.atasan_langsung
              )
            : null,
      });
    } else {
      RestoreForm();
    }
  }, [props.editMode]);

  const RestoreForm = () => {
    formik.setValues({
      id_pegawai: "",
      nip: "",
      nama: "",
      golongan: null,
      jabatan: null,
      pangkat: null,
      atasan_langsung: null,
    });
  };

  console.log(props.editValue);

  return (
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        px: 4,
        py: 6,
        marginTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography component={"caption"} variant="overline">
        Input Data Pegawai
      </Typography>
      <Box
        component="form"
        onReset={formik.handleReset}
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <TextField
          name="nip"
          label="NIP Pegawai"
          variant="standard"
          value={formik.values.nip}
          onChange={formik.handleChange}
          fullWidth
        />
        <TextField
          name="nama"
          label="Nama Pegawai"
          variant="standard"
          value={formik.values.nama}
          onChange={formik.handleChange}
          fullWidth
        />
        <Autocomplete
          getOptionLabel={(option) => option.nama_golongan}
          options={golongan}
          onChange={(event, value) => {
            formik.setFieldValue("golongan", value);
          }}
          value={formik.values.golongan}
          renderInput={(props) => (
            <TextField {...props} variant="standard" label="Pilih golongan" />
          )}
        />
        <Autocomplete
          getOptionLabel={(option) => option.nama_jabatan}
          options={jabatan}
          onChange={(event, value) => {
            formik.setFieldValue("jabatan", value);
          }}
          value={formik.values.jabatan}
          renderInput={(props) => (
            <TextField {...props} variant="standard" label="Pilih Jabatan" />
          )}
        />

        <Autocomplete
          getOptionLabel={(option) => option.nama_pangkat}
          options={pangkat}
          onChange={(event, value) => {
            formik.setFieldValue("pangkat", value);
          }}
          value={formik.values.pangkat}
          renderInput={(props) => (
            <TextField {...props} variant="standard" label="Pilih pangkat" />
          )}
        />
        <Autocomplete
          getOptionLabel={(option) => option.nama}
          options={pegawai}
          onChange={(event, value) => {
            formik.setFieldValue("atasan_langsung", value);
          }}
          value={formik.values.atasan_langsung}
          renderInput={(props) => (
            <TextField
              {...props}
              variant="standard"
              label="Pilih Atasan Langsung"
            />
          )}
        />
        <Stack sx={{ mt: 3, mb: 2 }} direction={"row"} spacing={1}>
          {props.editMode && (
            <Button
              startIcon={<Cancel />}
              //   sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {
                formik.resetForm();
                props.setEditMode(false);
              }}
              variant="contained"
              color="error"
            >
              Batal Edit
            </Button>
          )}
          <Button
            startIcon={<Save />}
            // sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Simpan Data Pegawai
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default FormInputPegawai;
