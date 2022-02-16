import React from 'react';
import { useHistory } from 'react-router-dom'

import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Hidden,
} from "@material-ui/core";

const useStyles = makeStyles({
  topCap: {
    height: "15%",
  },
  topNav: {
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "right",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    position: "aboslute",
  },
  whiteButton: {
    backgroundColor: "#FFFFFF",
    color: "#3A8DFF",
    boxShadow: "0rem 0.125rem 0.75rem rgba(74, 106, 149, 0.2)",
    borderRadius: "0.3125rem",
    width: "10.625rem",
    height: "3.375rem",
    fontSize: "0.875rem",
  },
  whiteButtonSpacing: {
    position: "relative",
    marginLeft: "7.1rem",
    top: "1.875rem",
    right: "2.625rem",
  },
  whiteButtonSpacingSmall: {
    position: "absolute",
    top: "4.5rem",
  },
  softText: {
    color: "#B0B0B0",
    fontSize: "0.875rem",
    fontWeight: "400",
    whiteSpace: "nowrap",
  },
  softTextSpacing: {
    width: "100%",
    textAlign: "center",
    paddingTop: "0.9375rem",
    position: "relative",
    top: "1.875rem",
    left: "2.625rem",
  },
  softTextSpacingSmall: {
    position: "absolute",
    top: "2rem",
  },
});

function TopNav(props) {
  const classes = useStyles();
  const { whiteButtonText, softTextText, pushTo } = props;
  const history = useHistory();

  return <Grid>
      <Grid container item className={classes.topCap}>

        <Grid item xs={0} md={3} lg={5}></Grid>
        <Hidden mdUp>
          <Grid item xs={12} md={9} lg={7}>
            <Grid className={classes.topNav}>
              <Grid className={classes.softTextSpacingSmall}>
                <Typography className={classes.softText}>{softTextText}</Typography>
              </Grid>
              <Grid className={classes.whiteButtonSpacingSmall}>
                <Button className={classes.whiteButton} onClick={() => history.push(`${pushTo}`)} aria-label={`Go to ${pushTo}`}>{whiteButtonText}</Button>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item xs={12} md={9} lg={7}>
            <Grid className={classes.topNav}>
              <Grid className={classes.softTextSpacing}>
                <Typography className={classes.softText}>{softTextText}</Typography>
              </Grid>
              <Grid className={classes.whiteButtonSpacing}>
                <Button className={classes.whiteButton} onClick={() => history.push(`${pushTo}`)} aria-label={`Go to ${pushTo}`}>{whiteButtonText}</Button>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

      </Grid>
  </Grid>;
}

export default TopNav;
