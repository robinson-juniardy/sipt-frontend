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
import KadisPelayananPage from "../pelayanan/KadisPelayananPage";
import EkitaBulanan from "../../EkitaBulanan";
// import KasubbagPelayananPage from "../pelayanan/KasubbagPelayananPage";
// import Kepegawaian from "../master/kepegawaian/Kepegawaian";
// import PengelolaAkun from "../akun/PengelolaAkun";

const KadisHomePage = () => {
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
                <Tab label="Pelayanan" value="2" />
                <Tab label="Ekita Bulanan" value="3" />
                {/* <Tab label="Item Three" value="3" /> */}
              </TabList>
            </Box>
            <TabPanel value="1">
              <img alt="logo_aplikasi" src="/static/images/logo_aplikasi.png" />
            </TabPanel>
            <TabPanel value="2">
              <KadisPelayananPage />
            </TabPanel>
            <TabPanel value="3">
              <EkitaBulanan />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
};

export default KadisHomePage;
