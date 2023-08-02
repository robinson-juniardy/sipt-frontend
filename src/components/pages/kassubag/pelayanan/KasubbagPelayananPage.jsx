import {
  Box,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import HttpServices from "../../../utils/HttpServices";
import dayjs from "dayjs";
import {
  Draw,
  HourglassTop,
  ThumbDown,
  ThumbUp,
  Unpublished,
  Verified,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

const KasubbagPelayananPage = () => {
  const [pengajuan, setPengajuan] = React.useState([]);

  const { enqueueSnackbar } = useSnackbar();

  function GetPengajuan() {
    HttpServices.get("/transaksi/pengajuan-cuti").then((response) =>
      setPengajuan(response.data)
    );
  }

  function ApproveAction(id_cuti) {
    HttpServices.post("/transaksi/pengajuan-cuti/update-status", {
      id_cuti: id_cuti,
      status_dokumen: 1,
    })
      .then((response) => {
        enqueueSnackbar(
          "Draft Pengajuan Cuti Berhasil Di Approve / Verifikasi",
          {
            variant: "success",
            persist: false,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          }
        );
        GetPengajuan();
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(
          "Pengajuan Draft Cuti Gagal Di Approve, Cobalah Beberapa Saat Lagi !!",
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
  }

  function RejectAction(id_cuti) {
    HttpServices.post("/transaksi/pengajuan-cuti/update-status", {
      id_cuti: id_cuti,
      status_dokumen: -1,
    })
      .then((response) => {
        enqueueSnackbar(
          "Draft Pengajuan Cuti Berhasil Di Reject / Verifikasi",
          {
            variant: "success",
            persist: false,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          }
        );
        GetPengajuan();
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(
          "Pengajuan Draft Cuti Gagal Di Reject, Cobalah Beberapa Saat Lagi !!",
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
  }

  React.useEffect(() => {
    GetPengajuan();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="overline">draft pengajuan cuti</Typography>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                whiteSpace: "normal",
                lineHeight: "normal",
              },
              "& .MuiDataGrid-columnHeader": {
                // Forced to use important since overriding inline styles
                height: "unset !important",
              },
              "& .MuiDataGrid-columnHeaders": {
                // Forced to use important since overriding inline styles
                maxHeight: "168px !important",
              },
            }}
            autoPageSize={25}
            rows={pengajuan}
            getRowId={(row) => row.id_cuti}
            columns={[
              {
                field: "action",
                headerName: "Action",
                width: 200,
                renderCell: (params) => (
                  <>
                    <Tooltip title="Approve">
                      <IconButton
                        disabled={params.row.status_dokumen > 0}
                        onClick={(e) => ApproveAction(params.row.id_cuti)}
                        color="primary"
                      >
                        <ThumbUp />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                      <IconButton
                        disabled={params.row.status_dokumen > 0}
                        onClick={(e) => RejectAction(params.row.id_cuti)}
                        color="error"
                      >
                        <ThumbDown />
                      </IconButton>
                    </Tooltip>
                  </>
                ),
              },
              {
                field: "createdAt",
                headerName: "Tanggal Draft Cuti",
                width: 200,
                valueGetter: (params) =>
                  dayjs(params.row.createdAt).format("DD/MM/YYYY"),
              },
              {
                field: "status_verifikasi",
                headerName: "Status",
                headerAlign: "left",
                align: "left",
                width: 200,
                renderCell: (params) => {
                  if (params.row.status_dokumen === 0) {
                    return (
                      <Tooltip title="Menunggu Verifikasi">
                        <IconButton color="primary">
                          <HourglassTop />
                        </IconButton>
                      </Tooltip>
                    );
                  } else if (params.row.status_dokumen === 1) {
                    return (
                      <Tooltip title="Diverifikasi">
                        <IconButton color="success">
                          <Verified />
                        </IconButton>
                      </Tooltip>
                    );
                  } else if (params.row.status_dokumen === -1) {
                    <Tooltip title="Ditolak">
                      <IconButton color="error">
                        <Unpublished />
                      </IconButton>
                    </Tooltip>;
                  } else if (params.row.status_dokumen === 2) {
                    return (
                      <Tooltip title="Di Tandatangani Oleh Sekretaris">
                        <IconButton color="info">
                          <Draw />
                        </IconButton>
                      </Tooltip>
                    );
                  } else if (params.row.status_dokumen === 3) {
                    return (
                      <Tooltip title="Di Tandatangani Oleh Kadis">
                        <IconButton color="info">
                          <Draw />
                        </IconButton>
                      </Tooltip>
                    );
                  }
                },
              },
              {
                field: "jenis_cuti",
                headerName: "Jenis Cuti",
                width: 200,
                valueGetter: (params) => {
                  if (params.row.jenis_cuti === "cuti_tahunan") {
                    return "Tahunan";
                  } else if (params.row.jenis_cuti === "cuti_alasan_penting") {
                    return "Alasan Penting";
                  } else {
                    return "Melahirkan";
                  }
                },
              },
              {
                field: "nama",
                headerName: "Atas Nama",
                width: 200,
                valueGetter: (params) => params.row.pegawai.nama,
              },
              {
                field: "tgl_mulai",
                headerName: "Tgl Mulai Cuti",
                width: 200,
              },
              {
                field: "tgl_selesai",
                headerName: "Tgl Selesai Cuti",
                width: 200,
              },
              {
                field: "durasi",
                headerName: "Durasi Cuti",
                width: 200,
                valueGetter: (params) => `${params.row.durasi} Hari`,
              },
              {
                field: "alasan_pengajuan_cuti",
                headerName: "Keperluan/Alasan",
                width: 300,
                //   valueGetter: (params) => `${params.row.durasi} Hari`,
              },
              {
                field: "alamat_selama_cuti",
                headerName: "Alamat Selama Cuti",
                width: 600,
                //   valueGetter: (params) => `${params.row.durasi} Hari`,
              },
            ]}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default KasubbagPelayananPage;
