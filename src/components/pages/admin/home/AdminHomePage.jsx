import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import Kepegawaian from "../master/kepegawaian/Kepegawaian";
import PengelolaAkun from "../akun/PengelolaAkun";
import DataPengajuanCuti from "../pengajuan_cuti/DataPengajuanCuti";

const AdminHomePage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Welcome" value={"1"} />
                <Tab label="Data Pegawai/PNS" value="2" />
                <Tab label="Pengelola Akun" value="3" />
                <Tab label="Data Pengajuan Cuti" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <img alt="logo_aplikasi" src="/static/images/logo_aplikasi.png" />
            </TabPanel>
            <TabPanel value="2">
              <Kepegawaian />
            </TabPanel>
            <TabPanel value="3">
              <PengelolaAkun />
            </TabPanel>
            <TabPanel value="4">
              <DataPengajuanCuti />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminHomePage;
