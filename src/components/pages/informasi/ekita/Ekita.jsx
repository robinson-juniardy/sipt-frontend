import { DeleteTwoTone, UploadFile } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import HttpServices from "../../../utils/HttpServices";
import constants from "../../../utils/Constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const Ekita = () => {
  const [ekita, setEkita] = useState([]);
  const [fileSelected, setFileSelected] = useState(null);
  const [month, setMonth] = useState(dayjs());
  const [year, setYear] = useState(dayjs());

  const GetEkitaBulanan = () => {
    HttpServices.get(
      "/transaksi/ekita-bulanan/" + localStorage.getItem("id_pegawai")
    ).then((response) => setEkita(response.data));
  };

  const handleDelete = (ekita_id) => {
    HttpServices.post("/transaksi/ekita-bulanan/delete", { ekita_id: ekita_id })
      .then((response) => {
        enqueueSnackbar("File Berhasil Di Hapus", {
          variant: "success",
          persist: false,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        GetEkitaBulanan();
      })
      .catch((error) => {
        enqueueSnackbar("Data Gagal Di Hapus", {
          variant: "error",
          persist: false,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        GetEkitaBulanan();
      });
  };

  const handleUpload = () => {
    const files = fileSelected[0];
    const formData = new FormData();

    formData.append("file", files);
    formData.append("id_pegawai", localStorage.getItem("id_pegawai"));
    formData.append("bulan", dayjs(month).month() + 1);
    formData.append("tahun", dayjs(year).year());

    HttpServices.post("/transaksi/ekita-bulanan/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        enqueueSnackbar("File Berhasil Di Upload", {
          variant: "success",
          persist: false,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        // setFileSelected(null);
        GetEkitaBulanan();
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Data Gagal Di Upload", {
          variant: "error",
          persist: false,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        // setFileSelected(null);
        GetEkitaBulanan();
      });
  };

  useEffect(() => {
    GetEkitaBulanan();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker", "Stack"]}>
            <DatePicker
              value={year}
              onChange={(value) => setYear(value)}
              label="Tahun"
              views={["year"]}
            />
            <DatePicker
              value={month}
              onChange={(value) => setMonth(value)}
              label="Bulan"
              views={["month"]}
            />

            <Stack direction="row" spacing={1}>
              <TextField
                type="file"
                // value={fileSelected}
                onChange={(e) => setFileSelected(e.target.files)}
                variant="standard"
              />
              <Button
                onClick={handleUpload}
                // disabled={fileSelected === null && true}
                startIcon={<UploadFile />}
                variant="contained"
                color="success"
              >
                Upload Ekita
              </Button>
            </Stack>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={8}>
        <Box sx={{ width: "100%", height: 500 }}>
          <DataGrid
            rows={ekita}
            getRowId={(row) => row.ekita_id}
            columns={[
              {
                field: "action",
                width: 200,
                headerName: "Action",
                renderCell: (params) => (
                  <Tooltip title="Hapus">
                    <IconButton
                      onClick={(e) => handleDelete(params.row.ekita_id)}
                      color="error"
                    >
                      <DeleteTwoTone />
                    </IconButton>
                  </Tooltip>
                ),
              },
              {
                field: "tahun",
                width: 200,
                headerName: "Tahun",
              },
              {
                field: "bulan",
                width: 200,
                headerName: "Bulan",
                renderCell: (params) => {
                  const bulan_str = [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                  ];

                  return bulan_str[params.row.bulan - 1];
                },
              },
              {
                field: "filename",
                width: 200,
                headerName: "File",
                renderCell: (params) => (
                  <a
                    href={`${constants.BACKEND_URL}/${params.row.filename}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lihat File
                  </a>
                ),
              },
              {
                field: "createdAt",
                width: 200,
                headerName: "Di Upload Pada",
                renderCell: (params) =>
                  dayjs(params.row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
              },
            ]}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Ekita;
