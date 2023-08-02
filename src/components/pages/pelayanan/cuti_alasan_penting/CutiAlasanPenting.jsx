import {
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import HttpServices from "../../../utils/HttpServices";

const CutiAlasanPenting = () => {
  const { enqueueSnackbar } = useSnackbar();

  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const [tglMulai, setTglMulai] = React.useState(tomorrow);
  const [tglSampai, setTglSampai] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      id_pegawai: localStorage.getItem("id_pegawai"),
      jenis_cuti: "cuti_alasan_penting",
      alasan: "",
      alamat: "",
      tgl_mulai: tomorrow,
      tgl_selesai: null,
    },
    onSubmit: (values) => {
      const mulai = dayjs(values.tgl_mulai);
      const selesai = dayjs(values.tgl_selesai);
      const durasi = selesai.diff(mulai, "day");

      HttpServices.post("/transaksi/pengajuan-cuti", {
        id_pegawai: values.id_pegawai,
        jenis_cuti: values.jenis_cuti,
        alasan: values.alasan,
        alamat: values.alamat,
        tgl_mulai: values.tgl_mulai,
        tgl_selesai: values.tgl_selesai,
        durasi: durasi,
      })
        .then((response) => {
          enqueueSnackbar(
            "Pengajuan Draft Cuti Berhasil, Harap Menunggu Progress !!",
            {
              variant: "success",
              persist: false,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            }
          );
          formik.resetForm();
        })
        .catch((error) => {
          enqueueSnackbar(
            "Pengajuan Draft Cuti Gagal, Harap Coba Beberapa Saat lagi !!",
            {
              variant: "error",
              persist: false,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
            }
          );
        });
    },
  });

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            // textAlign={"center"}
            component={"article"}
            variant="overline"
          >
            Form Pengajuan Cuti Alasan Penting
          </Typography>
          <Divider light />
          <Box component={"form"} noValidate onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DateTimePicker", "DateRangePicker"]}
              >
                <Stack direction={"row"} spacing={2}>
                  <DemoItem label="Cuti Mulai Tanggal">
                    <DatePicker
                      value={formik.values.tgl_mulai}
                      onChange={(v) => {
                        formik.setFieldValue("tgl_mulai", dayjs(v));
                      }}
                      defaultValue={dayjs(tomorrow).add(+2, "day")}
                      // minDate={dayjs(tomorrow).add(+2, "day")}
                      // maxDate={dayjs(formik.values.tgl_selesai).add(-1, "day")}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                  <DemoItem label="Cuti Sampai Tanggal">
                    <DatePicker
                      value={formik.values.tgl_selesai}
                      onChange={(v) => {
                        formik.setFieldValue("tgl_selesai", dayjs(v));
                      }}
                      defaultValue={dayjs(tomorrow).add(+2, "day")}
                      // minDate={dayjs(formik.values.tgl_mulai)}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </Stack>
                <TextareaAutosize
                  value={formik.values.alamat}
                  name="alamat"
                  onChange={formik.handleChange}
                  minRows={5}
                  placeholder="Alamat Selama Menjalankan Cuti"
                />
                <TextareaAutosize
                  value={formik.values.alasan}
                  name="alasan"
                  onChange={formik.handleChange}
                  placeholder="Alasan Cuti"
                  minRows={5}
                />
                <Button type="submit" variant="contained" color="primary">
                  Ajukan Cuti Tahunan
                </Button>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CutiAlasanPenting;
