import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ChildrenPage = () => {
  return <Outlet />;
};

const PelayananPage = () => {
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item xs={2}>
          <Stack direction="column" spacing={1}>
            <Card sx={{ maxWidth: 250 }} elevation={10}>
              <CardActionArea
                component={Link}
                to="/pns/pelayanan/cuti-alasan-penting"
              >
                <CardMedia
                  component="img"
                  height="220"
                  image="/static/images/cuti8.png"
                  alt="Cuti Alasan Penting"
                />
                <CardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    Cuti Alasan Penting
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 250 }} elevation={10}>
              <CardActionArea component={Link} to="/pns/pelayanan/cuti-tahunan">
                <CardMedia
                  component="img"
                  height="220"
                  image="/static/images/cuti1.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    Cuti Tahunan
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 250 }} elevation={10}>
              <CardActionArea
                component={Link}
                to="/pns/pelayanan/cuti-melahirkan"
              >
                <CardMedia
                  component="img"
                  height="220"
                  image="/static/images/cuti6.png"
                  alt="Cuti melahirkan"
                />
                <CardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    Cuti Melahirkan
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={8}>
          <Card elevation={10} sx={{ w: "100%", p: 5 }}>
            <ChildrenPage />
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Stack direction="column" spacing={1}>
            <Card sx={{ maxWidth: 250 }} elevation={10}>
              <CardActionArea
                component={Link}
                to="/pns/pelayanan/history-pengajuan-cuti"
              >
                <CardMedia
                  component="img"
                  height="240"
                  image="/static/images/history.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    Riwayat & Timeline Pengajuan Cuti
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card sx={{ maxWidth: 250 }} elevation={10}>
              <CardActionArea
                component={Link}
                to={`/${localStorage.getItem("role")}/home`}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image="/static/images/home.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    Kembali Ke Halaman Home
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default PelayananPage;
