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

const HomePage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}></Grid>
      <Grid item xs={6}>
        <Stack direction="column" spacing={1}>
          <Card sx={{ maxWidth: 600 }}>
            <CardActionArea component={Link} to="/pns/pelayanan">
              <CardMedia
                component="img"
                height="320"
                image="/static/images/customer-review.gif"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pelayanan
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 600 }} component={Link} to="/pns/informasi">
            <CardActionArea>
              <CardMedia
                component="img"
                height="320"
                image="/static/images/business-analysis.gif"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pusat Informasi
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HomePage;
