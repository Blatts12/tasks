import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";

interface Props {
  title: string;
  buttons?: React.ReactElement;
}

const Navbar: React.FC<Props> = ({ title, buttons }) => {
  return (
    <AppBar>
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>
          <Grid item>{buttons ? buttons : ""}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
