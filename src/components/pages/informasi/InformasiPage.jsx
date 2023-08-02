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
import Ekita from "./ekita/Ekita";
// import Kepegawaian from "../master/kepegawaian/Kepegawaian";
// import PengelolaAkun from "../akun/PengelolaAkun";

const InformasiPage = () => {
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
                {/* <Tab label="Welcome" value={"1"} /> */}
                {/* <Tab label="Pelayanan" value="2" /> */}
                <Tab label="Ekita Bulanan" value="1" />
                {/* <Tab label="Item Three" value="3" /> */}
              </TabList>
            </Box>
            {/* <TabPanel value="1"></TabPanel> */}
            <TabPanel value="1">
              <Ekita />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
};

export default InformasiPage;
