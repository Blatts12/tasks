import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: 5,
    },
  })
);

interface Props {
  title: string;
  buttons?: React.ReactElement;
}

const Navbar: React.FC<Props> = ({ title, buttons }) => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item>{buttons ? buttons : ""}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
