import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Cancel,
  Details,
  Draw,
  DriveFileRenameOutline,
  FactCheck,
  HourglassTop,
  Print,
  Refresh,
  RemoveRedEye,
  TextSnippet,
  ThumbUp,
  Unpublished,
  UploadFile,
  Verified,
  WorkspacePremium,
} from "@mui/icons-material";
import HttpServices from "../../../utils/HttpServices";
import { Box, Divider, Grid, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import constants from "../../../utils/Constants";

export default function HistoryPage() {
  const [cuti, setCuti] = React.useState([]);
  const [detailProgress, setDetailProgress] = React.useState(null);

  const GetCuti = () => {
    HttpServices.get(
      "/transaksi/pengajuan-cuti/" + localStorage.getItem("id_pegawai")
    ).then((response) => {
      setCuti(response.data);
    });
  };

  const GetDetail = (id_cuti) => {
    setDetailProgress(cuti.find((v) => v.id_cuti === id_cuti));
  };

  const RefreshAction = () => {
    GetCuti();
    setDetailProgress(null);
  };

  React.useEffect(() => {
    GetCuti();
  }, []);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Tooltip title="Refresh">
            <IconButton onClick={RefreshAction} color="primary">
              <Refresh />
            </IconButton>
          </Tooltip>

          <Typography variant="overline">
            List Riwayat Pengajuan Cuti
          </Typography>
          <Box sx={{ width: "100%", height: 400 }}>
            <DataGrid
              autoPageSize
              rows={cuti}
              getRowId={(row) => row.id_cuti}
              columns={[
                {
                  field: "action",
                  headerName: "",
                  width: 100,
                  renderCell: (params) => {
                    return (
                      <Tooltip title="Lihat Timeline">
                        <IconButton
                          onClick={(e) => GetDetail(params.row.id_cuti)}
                          color="info"
                        >
                          <RemoveRedEye />
                        </IconButton>
                      </Tooltip>
                    );
                  },
                },

                {
                  field: "createdAt",
                  headerName: "Tanggal Draft Cuti",
                  width: 200,
                  renderCell: (params) =>
                    dayjs(params.row.createdAt).format("DD/MM/YYYY"),
                },
                {
                  field: "jenis_cuti",
                  headerName: "Jenis Cuti",
                  width: 200,
                  valueGetter: (params) => {
                    if (params.row.jenis_cuti === "cuti_tahunan") {
                      return "Tahunan";
                    } else if (
                      params.row.jenis_cuti === "cuti_alasan_penting"
                    ) {
                      return "Alasan Penting";
                    } else {
                      return "Melahirkan";
                    }
                  },
                },
                {
                  field: "",
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
                          <IconButton color="info">
                            <Verified />
                          </IconButton>
                        </Tooltip>
                      );
                    } else if (params.row.status_dokumen === -1) {
                      return (
                        <Tooltip title="Ditolak">
                          <IconButton color="error">
                            <Unpublished />
                          </IconButton>
                        </Tooltip>
                      );
                    } else if (params.row.status_dokumen === 2) {
                      return (
                        <Tooltip title="Di Paraf Oleh Sekretaris">
                          <IconButton color="secondary">
                            <DriveFileRenameOutline />
                          </IconButton>
                        </Tooltip>
                      );
                    } else if (params.row.status_dokumen === 3) {
                      return (
                        <Tooltip title="Di Tanda Tangani Oleh Kadis">
                          <IconButton color="success">
                            <WorkspacePremium />
                          </IconButton>
                        </Tooltip>
                      );
                    }
                  },
                },
                {
                  field: "filename",
                  headerName: "File Cuti",
                  width: 200,
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
        <Grid item xs={12}>
          {detailProgress !== null && (
            <Box sx={{ overflow: "auto", textAlign: "center", mt: 2 }}>
              <Typography variant="overline">
                Progress Timeline Pengajuan Cuti
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Timeline minEvents={4} placeholder>
                {detailProgress.timeline.map((progress) => {
                  let title = "";
                  let color = "";
                  let icon;
                  if (progress.verif_level === 0) {
                    title = "Di Ajukan";
                    color = "#87a2c7";
                    icon = TextSnippet;
                  } else if (progress.verif_level === 1) {
                    title = "Diverifikasi";
                    color = "#394867";
                    icon = Verified;
                  } else if (progress.verif_level === 2) {
                    title = "Paraf Sekretaris";
                    color = "#19A7CE";
                    icon = DriveFileRenameOutline;
                  } else if (progress.verif_level === 3) {
                    title = "TTD Kepala Dinas";
                    color = "#1B9C85";
                    icon = WorkspacePremium;
                  } else if (progress.verif_level === -1) {
                    title = "Di Tolak";
                    color = "#7E1717";
                    icon = Cancel;
                  }
                  return (
                    <TimelineEvent
                      icon={icon}
                      title={title}
                      // titleProps={{ fontSize: 10 }}
                      color={color}
                      subtitle={dayjs(progress.waktu_verif).format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    />
                  );
                })}
              </Timeline>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
